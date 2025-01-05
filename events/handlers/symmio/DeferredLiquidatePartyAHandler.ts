import { DeferredLiquidatePartyA as DeferredLiquidatePartyAEntity } from "../../../generated/schema"
import { ethereum } from "@graphprotocol/graph-ts"
import { Version } from "../../../common/BaseHandler"
import { getGlobalCounterAndInc } from "../../../common/utils"

export class DeferredLiquidatePartyAHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)

		let entity = new DeferredLiquidatePartyAEntity(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
		entity.counterId = getGlobalCounterAndInc()

		entity.allocatedBalance = event.params.allocatedBalance
		entity.liquidationAllocatedBalance = event.params.liquidationAllocatedBalance
		entity.liquidationBlockNumber = event.params.liquidationBlockNumber
		entity.liquidationId = event.params.liquidationId
		entity.liquidationTimestamp = event.params.liquidationTimestamp
		entity.liquidator = event.params.liquidator
		entity.partyA = event.params.partyA
		entity.totalUnrealizedLoss = event.params.totalUnrealizedLoss
		entity.upnl = event.params.upnl

		entity.blockTimestamp = event.block.timestamp
		entity.blockNumber = event.block.number
		entity.transactionHash = event.transaction.hash
		entity.transactionIndex = event.transaction.index
		entity.logIndex = event.logIndex
		entity.blockHash = event.block.hash
		entity.save()
	}
}
