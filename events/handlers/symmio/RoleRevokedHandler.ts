import { RoleRevoked as RoleRevokedEntity } from "../../../generated/schema"
import { ethereum } from "@graphprotocol/graph-ts"
import { Version } from "../../../common/BaseHandler"
import { getGlobalCounterAndInc } from "../../../common/utils"

export class RoleRevokedHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)

		let entity = new RoleRevokedEntity(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
		entity.counterId = getGlobalCounterAndInc()
		entity.role = event.params.role
		entity.user = event.params.user

		entity.blockTimestamp = event.block.timestamp
		entity.blockNumber = event.block.number
		entity.transactionHash = event.transaction.hash
		entity.transactionIndex = event.transaction.index
		entity.logIndex = event.logIndex
		entity.blockHash = event.block.hash
		entity.save()
	}
}
