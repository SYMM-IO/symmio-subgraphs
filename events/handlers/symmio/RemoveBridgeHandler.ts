import { RemoveBridge as RemoveBridgeEntity } from "../../../generated/schema"
import { ethereum } from "@graphprotocol/graph-ts"
import { Version } from "../../../common/BaseHandler"
import { getGlobalCounterAndInc } from "../../../common/utils"

export class RemoveBridgeHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)

		let entity = new RemoveBridgeEntity(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
		entity.counterId = getGlobalCounterAndInc()
		entity.bridge = event.params.bridge
		entity.blockTimestamp = event.block.timestamp
		entity.blockNumber = event.block.number
		entity.transactionHash = event.transaction.hash
		entity.save()
	}
}
