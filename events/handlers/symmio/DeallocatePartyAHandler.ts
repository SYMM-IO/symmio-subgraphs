import { DeallocatePartyA as DeallocatePartyAEntity } from "../../../generated/schema"
import { BigInt, ethereum } from "@graphprotocol/graph-ts"
import { Version } from "../../../common/BaseHandler"
import { getGlobalCounterAndInc } from "../../../common/utils"
import { DeallocatePartyA as DeallocatePartyA_8_3 } from "../../../generated/symmio_0_8_3/symmio_0_8_3"
import { DeallocatePartyA as DeallocatePartyA_8_4 } from "../../../generated/symmio_0_8_4/symmio_0_8_4"

export class DeallocatePartyAHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)

		let entity = new DeallocatePartyAEntity(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
		entity.counterId = getGlobalCounterAndInc()
		entity.user = event.params.user
		entity.amount = event.params.amount
		entity.transactionIndex = event.transaction.index
		entity.logIndex = event.logIndex
		entity.blockHash = event.block.hash

		switch (version) {
			case Version.v_0_8_4: {
				// @ts-ignore
				const e = changetype<DeallocatePartyA_8_4>(_event)
				entity.newAllocatedBalance = e.params.newAllocatedBalance
				break
			}
			case Version.v_0_8_3: {
				// @ts-ignore
				const e = changetype<DeallocatePartyA_8_3>(_event)
				entity.newAllocatedBalance = e.params.newAllocatedBalance
				break
			}
			default: {
				entity.newAllocatedBalance = BigInt.zero()
				break
			}
		}

		entity.blockTimestamp = event.block.timestamp
		entity.blockNumber = event.block.number
		entity.transactionHash = event.transaction.hash
		entity.save()
	}
}
