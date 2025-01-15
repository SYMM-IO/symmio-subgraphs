import {BaseHandler, Version} from "../../BaseHandler"
import {Quote} from "../../../generated/schema"
import {BigInt, ethereum} from "@graphprotocol/graph-ts"
import {getQuote as getQuote_0_8_0} from "../../../common/contract_utils_0_8_0";
import {getQuote as getQuote_0_8_2} from "../../../common/contract_utils_0_8_2";
import {getQuote as getQuote_0_8_3} from "../../../common/contract_utils_0_8_3";
import {getQuote as getQuote_0_8_4} from "../../../common/contract_utils_0_8_4";
import {setEventTimestampAndTransactionHashAndAction} from "../../utils/quote";

export class OpenPositionHandler<T> extends BaseHandler {
	handleQuote(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)
		let quote = Quote.load(event.params.quoteId.toString())!
		quote.globalCounter = super.handleGlobalCounter()
		quote.quoteId = event.params.quoteId
		quote.fillAmount = event.params.filledAmount
		quote.openedPrice = event.params.openedPrice
		quote.quoteStatus = 4
		quote.quantity = event.params.filledAmount
		quote.initialOpenedPrice = event.params.openedPrice

		let newCva: BigInt
		let newPartyAmm: BigInt
		let newPartyBmm: BigInt
		let newLF: BigInt

		switch (version) {
			case Version.v_0_8_4: {
				let q = getQuote_0_8_4(event.address, event.params.quoteId)!
				newCva = q.lockedValues.cva
				newPartyAmm = q.lockedValues.partyAmm
				newPartyBmm = q.lockedValues.partyBmm
				newLF = q.lockedValues.lf
				break
			}
			case Version.v_0_8_3: {
				let q = getQuote_0_8_3(event.address, event.params.quoteId)!
				newCva = q.lockedValues.cva
				newPartyAmm = q.lockedValues.partyAmm
				newPartyBmm = q.lockedValues.partyBmm
				newLF = q.lockedValues.lf
				break
			}
			case Version.v_0_8_2: {
				let q = getQuote_0_8_2(event.address, event.params.quoteId)!
				newCva = q.lockedValues.cva
				newPartyAmm = q.lockedValues.partyAmm
				newPartyBmm = q.lockedValues.partyBmm
				newLF = q.lockedValues.lf
				break
			}
			case Version.v_0_8_0: {
				let q = getQuote_0_8_0(event.address, event.params.quoteId)!
				newCva = q.lockedValues.cva
				newPartyAmm = q.lockedValues.mm
				newPartyBmm = q.lockedValues.mm
				newLF = q.lockedValues.lf
				break
			}
		}

		quote.cva = newCva
		quote.partyAmm = newPartyAmm
		quote.partyBmm = newPartyBmm
		quote.lf = newLF
		quote.initialCva = newCva
		quote.initialPartyAmm = newPartyAmm
		quote.initialPartyBmm = newPartyBmm
		quote.initialLf = newLF
		quote.save()
		setEventTimestampAndTransactionHashAndAction(quote, 'OpenPosition', _event)
	}
}