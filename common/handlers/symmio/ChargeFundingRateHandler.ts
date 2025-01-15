import {BaseHandler, Version} from "../../BaseHandler"
import {BigInt, ethereum} from "@graphprotocol/graph-ts";
import {GlobalFee, Quote} from "../../../generated/schema";
import {getQuote as getQuote_0_8_4} from "../../contract_utils_0_8_4";
import {getQuote as getQuote_0_8_3} from "../../contract_utils_0_8_3";
import {getQuote as getQuote_0_8_2} from "../../contract_utils_0_8_2";
import {getQuote as getQuote_0_8_0} from "../../contract_utils_0_8_0";
import {unDecimal} from "../../utils";

export class ChargeFundingRateHandler<T> extends BaseHandler {
	handleQuote(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)
		for (let i = 0, lenQ = event.params.quoteIds.length; i < lenQ; i++) {
			let quoteId = event.params.quoteIds[i]
			const rate = event.params.rates[i]
			let quote = Quote.load(quoteId.toString())!
			const openAmount = quote.quantity!.minus(quote.closedAmount!)
			let funding: BigInt
			switch (version) {
				case Version.v_0_8_4: {
					let chainQuote = getQuote_0_8_4(event.address, BigInt.fromString(quote.id))!
					funding = unDecimal((chainQuote.openedPrice.minus(quote.openedPrice!).abs()).times(openAmount))
					quote.openedPrice = chainQuote.openedPrice;
					break
				}
				case Version.v_0_8_3: {
					let chainQuote = getQuote_0_8_3(event.address, BigInt.fromString(quote.id))!
					funding = unDecimal((chainQuote.openedPrice.minus(quote.openedPrice!).abs()).times(openAmount))
					quote.openedPrice = chainQuote.openedPrice;
					break
				}
				case Version.v_0_8_2: {
					let chainQuote = getQuote_0_8_2(event.address, BigInt.fromString(quote.id))!
					funding = unDecimal((chainQuote.openedPrice.minus(quote.openedPrice!).abs()).times(openAmount))
					quote.openedPrice = chainQuote.openedPrice;
					break
				}
				case Version.v_0_8_0: {
					let chainQuote = getQuote_0_8_0(event.address, BigInt.fromString(quote.id))!
					funding = unDecimal((chainQuote.openedPrice.minus(quote.openedPrice!).abs()).times(openAmount))
					quote.openedPrice = chainQuote.openedPrice;
					break
				}
			}
			const paid = rate.gt(BigInt.zero())
			let fundingPaid = BigInt.zero()
			let fundingReceived = BigInt.zero()
			if (!paid)
				fundingPaid = funding
			else
				fundingReceived = funding

			quote.userPaidFunding = quote.userPaidFunding!.plus(fundingPaid)
			quote.userReceivedFunding = quote.userReceivedFunding!.plus(fundingReceived)
			quote.save()

			let globalEntity = GlobalFee.load("GlobalEntity")
			if (!globalEntity) {
				globalEntity = new GlobalFee("GlobalEntity")
				globalEntity.globalFee = BigInt.fromI32(0)
			}
			globalEntity.latestTimestamp = event.block.timestamp
			if (!paid)
				globalEntity.globalFee = globalEntity.globalFee.plus(funding)
			else
				globalEntity.globalFee = globalEntity.globalFee.minus(funding)
			globalEntity.save()
		}
	}
}