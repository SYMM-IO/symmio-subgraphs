import { QuoteSettlementData, SettleUpnl as SettleUpnlEntity } from "../../../generated/schema"
import { ethereum } from "@graphprotocol/graph-ts"
import { Version } from "../../../common/BaseHandler"
import { getGlobalCounterAndInc } from "../../../common/utils"
import { findAccountSourceForQuote } from "../../utils/account_utils";

export class SettleUpnlHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)

		let entity = new SettleUpnlEntity(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
		entity.counterId = getGlobalCounterAndInc()
		entity.transactionLogIndex = event.transaction.index
		entity.logIndex = event.logIndex
		entity.blockHash = event.block.hash

		entity.newPartyAAllocatedBalance = event.params.newPartyAAllocatedBalance
		entity.newPartyBsAllocatedBalances = event.params.newPartyBsAllocatedBalances
		entity.partyA = event.params.partyA
		entity.updatedPrices = event.params.updatedPrices

		// Store each QuoteSettlementData entry
		let settlementDataArray: string[] = []
		for (let i = 0; i < event.params.settlementData.length; i++) {
			let data = event.params.settlementData[i]
			let dataId = event.transaction.hash.toHex() + "-" + event.logIndex.toString() + "-" + i.toString()

			let quoteData = new QuoteSettlementData(dataId)
			quoteData.quoteId = data.quoteId
			quoteData.currentPrice = data.currentPrice
			quoteData.partyBUpnlIndex = data.partyBUpnlIndex
			quoteData.accountSource = findAccountSourceForQuote(data.quoteId)
			
			// Save the individual quote data
			quoteData.save()

			// Add the ID to the array
			settlementDataArray.push(dataId)
		}

		// Assign the settlement data array to the event entity
		entity.settlementData = settlementDataArray

		entity.blockTimestamp = event.block.timestamp
		entity.blockNumber = event.block.number
		entity.transactionHash = event.transaction.hash
		entity.save()
	}
}
