import { DebugEntity, Quote } from "../../../generated/schema"
import { BaseHandler, Version } from "../../BaseHandler"
import { ethereum } from "@graphprotocol/graph-ts";
import { getQuote as getQuote_0_8_4 } from "../../../common/contract_utils_0_8_4";
import { getQuote as getQuote_0_8_3 } from "../../../common/contract_utils_0_8_3";
import { getQuote as getQuote_0_8_2 } from "../../../common/contract_utils_0_8_2";
import { getQuote as getQuote_0_8_0 } from "../../../common/contract_utils_0_8_0";
import {setEventTimestampAndTransactionHashAndAction} from "../../utils/quote";

export class FillCloseRequestHandler<T> extends BaseHandler {
	handleQuote(_event: ethereum.Event, version: Version): void {
		let db = new DebugEntity("FillCloseRequestHandler common")
		// @ts-ignore
		const event = changetype<T>(_event)
		let quote = Quote.load(event.params.quoteId.toString())
		if (!quote) { //  TODO: remove after debug
			db.message = `quoteId: ${event.params.quoteId.toString()} not exist`
			db.save()
			return
		}
		quote.globalCounter = super.handleGlobalCounter()

		switch (version) {
			case Version.v_0_8_4: {
				let q = getQuote_0_8_4(event.address, event.params.quoteId)
				if (!q) {
					db.message = `quoteId: ${event.params.quoteId.toString()} getQuote_0_8_4 problem`
					db.save()
					return
				}
				quote.cva = q.lockedValues.cva
				quote.partyAmm = q.lockedValues.partyAmm
				quote.partyBmm = q.lockedValues.partyBmm
				quote.lf = q.lockedValues.lf
				break
			}
			case Version.v_0_8_3: {
				let q = getQuote_0_8_3(event.address, event.params.quoteId)
				if (!q) {
					db.message = `quoteId: ${event.params.quoteId.toString()} getQuote_0_8_3 problem`
					db.save()
					return
				}
				quote.cva = q.lockedValues.cva
				quote.partyAmm = q.lockedValues.partyAmm
				quote.partyBmm = q.lockedValues.partyBmm
				quote.lf = q.lockedValues.lf
				break
			}
			case Version.v_0_8_2: {
				let q = getQuote_0_8_2(event.address, event.params.quoteId)
				if (!q) {
					db.message = `quoteId: ${event.params.quoteId.toString()} getQuote_0_8_2 problem`
					db.save()
					return
				}
				quote.cva = q.lockedValues.cva
				quote.partyAmm = q.lockedValues.partyAmm
				quote.partyBmm = q.lockedValues.partyBmm
				quote.lf = q.lockedValues.lf
				break
			}
			case Version.v_0_8_0: {
				let q = getQuote_0_8_0(event.address, event.params.quoteId)
				if (!q) {
					db.message = `quoteId: ${event.params.quoteId.toString()} getQuote_0_8_0 problem`
					db.save()
					return
				}
				quote.cva = q.lockedValues.cva
				quote.partyAmm = q.lockedValues.mm
				quote.partyBmm = q.lockedValues.mm
				quote.lf = q.lockedValues.lf
				break
			}
		}

		quote.quoteId = event.params.quoteId
		quote.fillAmount = event.params.filledAmount
		quote.closedPrice = event.params.closedPrice
		quote.quoteStatus = event.params.quoteStatus
		quote.averageClosedPrice = (quote.closedAmount!.times(quote.averageClosedPrice!).plus(event.params.filledAmount.times(event.params.closedPrice))).div(quote.closedAmount!.plus(event.params.filledAmount))
		quote.closedAmount = quote.closedAmount!.plus(event.params.filledAmount)
		quote.save()
		setEventTimestampAndTransactionHashAndAction(quote, 'FillCloseRequest', _event)
	}
}