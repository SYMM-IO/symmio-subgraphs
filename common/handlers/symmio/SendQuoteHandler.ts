import { BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts"
import { Quote } from "../../../generated/schema"
import { SendQuote as SendQuote_0_8_0 } from "../../../generated/symmio_0_8_0/symmio_0_8_0"
import { SendQuote as SendQuote_0_8_2 } from "../../../generated/symmio_0_8_2/symmio_0_8_2"
import { SendQuote as SendQuote_0_8_3 } from "../../../generated/symmio_0_8_3/symmio_0_8_3"
import { SendQuote as SendQuote_0_8_4 } from "../../../generated/symmio_0_8_4/symmio_0_8_4"
import { BaseHandler, Version } from "../../BaseHandler"

import { getQuote as getQuote_0_8_0, symbolIdToSymbolName as symbolIdToSymbolName_0_8_0 } from "../../../common/contract_utils_0_8_0"
import { getQuote as getQuote_0_8_2, symbolIdToSymbolName as symbolIdToSymbolName_0_8_2 } from "../../../common/contract_utils_0_8_2"
import { getQuote as getQuote_0_8_3, symbolIdToSymbolName as symbolIdToSymbolName_0_8_3 } from "../../../common/contract_utils_0_8_3"
import { getQuote as getQuote_0_8_4, symbolIdToSymbolName as symbolIdToSymbolName_0_8_4 } from "../../../common/contract_utils_0_8_4"

import { setEventTimestampAndTransactionHashAndAction } from "../../utils/quote"

export class SendQuoteHandler<T> extends BaseHandler {
	handleQuote(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)
		let quote = new Quote(event.params.quoteId.toString())
		quote.globalCounter = super.handleGlobalCounter()
		quote.quoteId = event.params.quoteId
		quote.orderTypeOpen = event.params.orderType
		quote.partyA = event.params.partyA
		quote.symbolId = event.params.symbolId
		quote.positionType = event.params.positionType
		quote.requestedOpenPrice = event.params.price
		quote.quantity = event.params.quantity
		quote.cva = event.params.cva
		quote.lf = event.params.lf
		quote.openDeadline = event.params.deadline
		quote.quoteStatus = 0
		quote.marketPrice = event.params.marketPrice
		quote.averageClosedPrice = BigInt.fromI32(0)
		quote.closedAmount = BigInt.fromI32(0)
		quote.userPaidFunding = BigInt.fromI32(0)
		quote.userReceivedFunding = BigInt.fromI32(0)
		quote.blockNumber = event.block.number

		quote.initialCva = event.params.cva
		quote.initialLf = event.params.lf

		let symbolName: string
		switch (version) {
			case Version.v_0_8_4: {
				// @ts-ignore
				const e = changetype<SendQuote_0_8_4>(_event)
				quote.partyAmm = e.params.partyAmm
				quote.partyBmm = e.params.partyBmm
				quote.initialPartyAmm = e.params.partyAmm
				quote.initialPartyBmm = e.params.partyBmm
				quote.tradingFee = e.params.tradingFee
				const q = getQuote_0_8_4(event.address, event.params.quoteId)!
				quote.maxFundingRate = q.maxFundingRate
				symbolName = symbolIdToSymbolName_0_8_4(event.params.symbolId, event.address)
				break
			}
			case Version.v_0_8_3: {
				// @ts-ignore
				const e = changetype<SendQuote_0_8_3>(_event)
				quote.partyAmm = e.params.partyAmm
				quote.partyBmm = e.params.partyBmm
				quote.initialPartyAmm = e.params.partyAmm
				quote.initialPartyBmm = e.params.partyBmm
				quote.tradingFee = e.params.tradingFee
				const q = getQuote_0_8_3(event.address, event.params.quoteId)!
				quote.maxFundingRate = q.maxFundingRate
				symbolName = symbolIdToSymbolName_0_8_3(event.params.symbolId, event.address)
				break
			}
			case Version.v_0_8_2: {
				// @ts-ignore
				const e = changetype<SendQuote_0_8_2>(_event)
				quote.partyAmm = e.params.partyAmm
				quote.partyBmm = e.params.partyBmm
				quote.initialPartyAmm = e.params.partyAmm
				quote.initialPartyBmm = e.params.partyBmm
				quote.tradingFee = e.params.tradingFee
				const q = getQuote_0_8_2(event.address, event.params.quoteId)!
				quote.maxFundingRate = q.maxFundingRate
				symbolName = symbolIdToSymbolName_0_8_2(event.params.symbolId, event.address)
				break
			}
			case Version.v_0_8_0: {
				// @ts-ignore
				const e = changetype<SendQuote_0_8_0>(_event)
				quote.partyAmm = e.params.mm
				quote.partyBmm = e.params.mm
				quote.initialPartyAmm = e.params.mm
				quote.initialPartyBmm = e.params.mm
				quote.tradingFee = BigInt.zero() // Not available in event
				const q = getQuote_0_8_0(event.address, event.params.quoteId)!
				quote.maxFundingRate = q.maxInterestRate
				symbolName = symbolIdToSymbolName_0_8_0(event.params.symbolId, event.address)
				break
			}
		}

		quote.symbol = symbolName!

		if (event.params.partyBsWhiteList) {
			let partyBsWhiteList: Bytes[] = []
			for (let i = 0, len = event.params.partyBsWhiteList.length; i < len; i++) {
				partyBsWhiteList.push(event.params.partyBsWhiteList[i])
			}
			quote.partyBsWhiteList = partyBsWhiteList
		}
		quote.timestamp = event.block.timestamp
		quote.save()
		setEventTimestampAndTransactionHashAndAction(quote, "SendQuote", event)
	}
}
