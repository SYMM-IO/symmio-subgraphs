import {BaseHandler, Version} from "../../BaseHandler"
import {DebugEntity, Quote} from "../../../generated/schema"
import {BigInt, ethereum, log} from "@graphprotocol/graph-ts"
import {getQuote as getQuote_0_8_0} from "../../../common/contract_utils_0_8_0";
import {getQuote as getQuote_0_8_2} from "../../../common/contract_utils_0_8_2";
import {getQuote as getQuote_0_8_3} from "../../../common/contract_utils_0_8_3";
import {getQuote as getQuote_0_8_4} from "../../../common/contract_utils_0_8_4";
import {setEventTimestampAndTransactionHashAndAction} from "../../utils/quote";
import {AccountType, createNewAccountIfNotExists} from "../../utils/builders";

export class LiquidatePositionsPartyBHandler<T> extends BaseHandler {

	handleAccount(_event: ethereum.Event, version: Version): void {
		super.handleAccount(_event, version);
		// @ts-ignore
		const event = changetype<T>(_event)
		createNewAccountIfNotExists(event.params.liquidator, event.params.liquidator, null, AccountType.LIQUIDATOR, event.block, event.transaction)
	}

	handleQuote(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)
		for (let i = 0, lenQ = event.params.quoteIds.length; i < lenQ; i++) {
			let quoteId = event.params.quoteIds[i]
			let quote = Quote.load(quoteId.toString())!
			quote.globalCounter = super.handleGlobalCounter()
			quote.liquidatedSide = 1
			quote.quoteStatus = 8
			let getAveragePrice: BigInt
			switch (version) {
				case Version.v_0_8_4: {
					let q = getQuote_0_8_4(event.address, quoteId)!
					getAveragePrice = q.avgClosedPrice
					break
				}
				case Version.v_0_8_3: {
					let q = getQuote_0_8_3(event.address, quoteId)!
					getAveragePrice = q.avgClosedPrice
					break
				}
				case Version.v_0_8_2: {
					let q = getQuote_0_8_2(event.address, quoteId)!
					getAveragePrice = q.avgClosedPrice
					break
				}
				case Version.v_0_8_0: {
					let q = getQuote_0_8_0(event.address, quoteId)!
					getAveragePrice = q.avgClosedPrice
					break
				}
			}
			const getClosedAmount = quote.quantity!
			let liqAmount = getClosedAmount.minus(quote.closedAmount!)
			quote.liquidateAmount = liqAmount
			let debugEntity = new DebugEntity('liquidatePrice'.concat(event.transaction.hash.toHexString()).concat(event.transaction.index.toHexString()))
			debugEntity.message = 'getAveragePrice'
			debugEntity.trigger = getAveragePrice
			debugEntity.save()

			if (getAveragePrice.gt(BigInt.fromI32(0))) {
				quote.liquidatePrice = ((getAveragePrice.times(getClosedAmount)).minus(quote.averageClosedPrice!.times(quote.closedAmount!))).div(liqAmount)
			} else {
				log.debug(`get total fill amount: ${getClosedAmount} , past total fill amount: ${quote.closedAmount!.toString()}\nQuoteId: ${quote.quoteId}`, [])
			}
			quote.save()
			setEventTimestampAndTransactionHashAndAction(quote, 'LiquidatePositionsPartyB', _event)
		}
	}
}