import { SetForceCloseCooldowns as SetForceCloseCooldownsEntity } from "../../../generated/schema"
import { ethereum } from "@graphprotocol/graph-ts"
import { Version } from "../../../common/BaseHandler"
import { getGlobalCounterAndInc } from "../../../common/utils"

export class SetForceCloseCooldownsHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)

		let entity = new SetForceCloseCooldownsEntity(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
		entity.counterId = getGlobalCounterAndInc()
		entity.transactionIndex = event.transaction.index
		entity.logIndex = event.logIndex
		entity.blockHash = event.block.hash

		entity.oldForceCloseFirstCooldown = event.params.oldForceCloseFirstCooldown
		entity.newForceCloseFirstCooldown = event.params.newForceCloseFirstCooldown

		entity.oldForceCloseSecondCooldown = event.params.oldForceCloseSecondCooldown
		entity.newForceCloseSecondCooldown = event.params.newForceCloseSecondCooldown

		entity.blockTimestamp = event.block.timestamp
		entity.blockNumber = event.block.number
		entity.transactionHash = event.transaction.hash
		entity.save()
	}
}
