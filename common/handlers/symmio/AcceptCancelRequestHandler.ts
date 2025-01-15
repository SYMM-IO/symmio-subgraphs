import { Quote } from "../../../generated/schema"
import { BaseHandler, Version } from "../../BaseHandler"
import { setEventTimestampAndTransactionHashAndAction } from "../../utils/quote"
import { BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts"

import { getQuote as getQuote_0_8_0, symbolIdToSymbolName as symbolIdToSymbolName_0_8_0 } from "../../../common/contract_utils_0_8_0"
import { getQuote as getQuote_0_8_2, symbolIdToSymbolName as symbolIdToSymbolName_0_8_2 } from "../../../common/contract_utils_0_8_2"
import { getQuote as getQuote_0_8_3, symbolIdToSymbolName as symbolIdToSymbolName_0_8_3 } from "../../../common/contract_utils_0_8_3"
import { getQuote as getQuote_0_8_4, symbolIdToSymbolName as symbolIdToSymbolName_0_8_4 } from "../../../common/contract_utils_0_8_4"

export class AcceptCancelRequestHandler<T> extends BaseHandler {
	handleQuote(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)
		let quote = Quote.load(event.params.quoteId.toString())
		if (!quote) {
			quote = new Quote(event.params.quoteId.toString())
			quote.globalCounter = super.handleGlobalCounter()
			quote.quoteId = event.params.quoteId
			quote.timestamp = event.block.timestamp

			let symbolName: string
			switch (version) {
				case Version.v_0_8_4: {
					const q = getQuote_0_8_4(event.address, event.params.quoteId)!
					quote.maxFundingRate = q.maxFundingRate
					quote.orderTypeOpen = q.orderType
					quote.partyA = q.partyA
					quote.symbolId = q.symbolId
					quote.tradingFee = q.tradingFee
					quote.positionType = q.positionType
					quote.requestedOpenPrice = q.marketPrice
					quote.quantity = q.quantity
					quote.cva = q.lockedValues.cva
					quote.lf = q.lockedValues.lf
					quote.initialCva = q.lockedValues.cva
					quote.initialLf = q.lockedValues.lf
					quote.initialPartyAmm = q.lockedValues.partyAmm
					quote.initialPartyBmm = q.lockedValues.partyBmm
					quote.openDeadline = q.deadline
					quote.quoteStatus = q.quoteStatus
					quote.marketPrice = q.marketPrice
					if (q.partyBsWhiteList) {
						let partyBsWhiteList: Bytes[] = []
						for (let i = 0, len = q.partyBsWhiteList.length; i < len; i++) {
							partyBsWhiteList.push(q.partyBsWhiteList[i])
						}
						quote.partyBsWhiteList = partyBsWhiteList
					}
					symbolName = symbolIdToSymbolName_0_8_4(q.symbolId, event.address)
					break
				}
				case Version.v_0_8_3: {
					const q = getQuote_0_8_3(event.address, event.params.quoteId)!
					quote.maxFundingRate = q.maxFundingRate
					quote.orderTypeOpen = q.orderType
					quote.partyA = q.partyA
					quote.symbolId = q.symbolId
					quote.tradingFee = q.tradingFee
					quote.positionType = q.positionType
					quote.requestedOpenPrice = q.marketPrice
					quote.quantity = q.quantity
					quote.cva = q.lockedValues.cva
					quote.lf = q.lockedValues.lf
					quote.initialCva = q.lockedValues.cva
					quote.initialLf = q.lockedValues.lf
					quote.initialPartyAmm = q.lockedValues.partyAmm
					quote.initialPartyBmm = q.lockedValues.partyBmm
					quote.openDeadline = q.deadline
					quote.quoteStatus = q.quoteStatus
					quote.marketPrice = q.marketPrice
					if (q.partyBsWhiteList) {
						let partyBsWhiteList: Bytes[] = []
						for (let i = 0, len = q.partyBsWhiteList.length; i < len; i++) {
							partyBsWhiteList.push(q.partyBsWhiteList[i])
						}
						quote.partyBsWhiteList = partyBsWhiteList
					}
					symbolName = symbolIdToSymbolName_0_8_3(q.symbolId, event.address)
					break
				}
				case Version.v_0_8_2: {
					const q = getQuote_0_8_2(event.address, event.params.quoteId)!
					quote.maxFundingRate = q.maxFundingRate
					quote.orderTypeOpen = q.orderType
					quote.partyA = q.partyA
					quote.symbolId = q.symbolId
					quote.tradingFee = q.tradingFee
					quote.positionType = q.positionType
					quote.requestedOpenPrice = q.marketPrice
					quote.quantity = q.quantity
					quote.cva = q.lockedValues.cva
					quote.lf = q.lockedValues.lf
					quote.initialCva = q.lockedValues.cva
					quote.initialLf = q.lockedValues.lf
					quote.initialPartyAmm = q.lockedValues.partyAmm
					quote.initialPartyBmm = q.lockedValues.partyBmm
					quote.openDeadline = q.deadline
					quote.quoteStatus = q.quoteStatus
					quote.marketPrice = q.marketPrice
					if (q.partyBsWhiteList) {
						let partyBsWhiteList: Bytes[] = []
						for (let i = 0, len = q.partyBsWhiteList.length; i < len; i++) {
							partyBsWhiteList.push(q.partyBsWhiteList[i])
						}
						quote.partyBsWhiteList = partyBsWhiteList
					}
					symbolName = symbolIdToSymbolName_0_8_2(q.symbolId, event.address)
					break
				}
				case Version.v_0_8_0: {
					const q = getQuote_0_8_0(event.address, event.params.quoteId)!
					quote.orderTypeOpen = q.orderType
					quote.partyA = q.partyA
					quote.symbolId = q.symbolId
					quote.tradingFee = BigInt.zero()
					quote.positionType = q.positionType
					quote.requestedOpenPrice = q.marketPrice
					quote.quantity = q.quantity
					quote.cva = q.lockedValues.cva
					quote.lf = q.lockedValues.lf
					quote.initialCva = q.lockedValues.cva
					quote.initialLf = q.lockedValues.lf
					quote.initialPartyAmm = q.lockedValues.mm
					quote.initialPartyBmm = q.lockedValues.mm
					quote.openDeadline = q.deadline
					quote.quoteStatus = q.quoteStatus
					quote.marketPrice = q.marketPrice
					if (q.partyBsWhiteList) {
						let partyBsWhiteList: Bytes[] = []
						for (let i = 0, len = q.partyBsWhiteList.length; i < len; i++) {
							partyBsWhiteList.push(q.partyBsWhiteList[i])
						}
						quote.partyBsWhiteList = partyBsWhiteList
					}
					symbolName = symbolIdToSymbolName_0_8_0(q.symbolId, event.address)
					break
				}
			}

			quote.symbol = symbolName!
		}
		quote.globalCounter = super.handleGlobalCounter()
		quote.blockNumber = event.block.number
		quote.quoteStatus = event.params.quoteStatus
		quote.save()
		setEventTimestampAndTransactionHashAndAction(quote, "AcceptCancelRequest", _event)
	}
}
