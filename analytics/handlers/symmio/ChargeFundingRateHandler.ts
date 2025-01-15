import { ChargeFundingRateHandler as CommonChargeFundingRateHandler } from "../../../common/handlers/symmio/ChargeFundingRateHandler"
import { Account, Quote } from "../../../generated/schema"
import { BigInt, ethereum } from "@graphprotocol/graph-ts"
import { getQuote as getQuote_0_8_0 } from "../../../common/contract_utils_0_8_0"
import { getQuote as getQuote_0_8_2 } from "../../../common/contract_utils_0_8_2"
import { getQuote as getQuote_0_8_3 } from "../../../common/contract_utils_0_8_3"
import { getQuote as getQuote_0_8_4 } from "../../../common/contract_utils_0_8_4"
import { Version } from "../../../common/BaseHandler"

import { updateHistories, UpdateHistoriesParams } from "../../utils/historyHelpers"
import { unDecimal } from "../../utils/common"

export class ChargeFundingRateHandler<T> extends CommonChargeFundingRateHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)
		super.handle(_event, version)
		super.handleSymbol(_event, version)
		super.handleAccount(_event, version)

		for (let i = 0, lenQ = event.params.quoteIds.length; i < lenQ; i++) {
			let quoteId = event.params.quoteIds[i]
			const rate = event.params.rates[i]
			let quote = Quote.load(quoteId.toString())!
			let account = Account.load(quote.partyA.toHexString())!
			let solverAccount = Account.load(quote.partyB!.toHexString())
			const openAmount = quote.quantity!.minus(quote.closedAmount!)
			let funding: BigInt
			switch (version) {
				case Version.v_0_8_4: {
					let chainQuote = getQuote_0_8_4(event.address, BigInt.fromString(quote.id))!
					funding = unDecimal(chainQuote.openedPrice.minus(quote.openedPrice!).abs().times(openAmount))
					break
				}
				case Version.v_0_8_3: {
					let chainQuote = getQuote_0_8_3(event.address, BigInt.fromString(quote.id))!
					funding = unDecimal(chainQuote.openedPrice.minus(quote.openedPrice!).abs().times(openAmount))
					break
				}
				case Version.v_0_8_2: {
					let chainQuote = getQuote_0_8_2(event.address, BigInt.fromString(quote.id))!
					funding = unDecimal(chainQuote.openedPrice.minus(quote.openedPrice!).abs().times(openAmount))
					break
				}
				case Version.v_0_8_0: {
					let chainQuote = getQuote_0_8_0(event.address, BigInt.fromString(quote.id))!
					funding = unDecimal(chainQuote.openedPrice.minus(quote.openedPrice!).abs().times(openAmount))
					break
				}
			}
			const paid = rate.gt(BigInt.zero())
			let fundingPaid = BigInt.zero()
			let fundingReceived = BigInt.zero()
			if (!paid) fundingPaid = funding
			else fundingReceived = funding

			updateHistories(
				new UpdateHistoriesParams(version, account, solverAccount, event)
					.symbolId(quote.symbolId!)
					.fundingPaid(fundingPaid)
					.fundingReceived(fundingReceived),
			)
		}
		super.handleQuote(_event, version)
	}
}
