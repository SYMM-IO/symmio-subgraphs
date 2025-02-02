import { AllocateForPartyB as AllocateForPartyBEntity } from "../../../generated/schema"
import { BigInt, ethereum } from "@graphprotocol/graph-ts"
import { Version } from "../../../common/BaseHandler"
import { getGlobalCounterAndInc } from "../../../common/utils"
import { AllocateForPartyB as AllocateForPartyB_8_3 } from "../../../generated/symmio_0_8_3/symmio_0_8_3"
import { AllocateForPartyB as AllocateForPartyB_8_4 } from "../../../generated/symmio_0_8_4/symmio_0_8_4"

export class AllocateForPartyBHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)

		let entity = new AllocateForPartyBEntity(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
		entity.counterId = getGlobalCounterAndInc()
		entity.partyB = event.params.partyB
		entity.partyA = event.params.partyA
		entity.amount = event.params.amount

		switch (version) {
			case Version.v_0_8_4: {
				// @ts-ignore
				const e = changetype<AllocateForPartyB_8_4>(_event)
				entity.newAllocatedBalance = e.params.newAllocatedBalance
				break
			}
			case Version.v_0_8_3: {
				// @ts-ignore
				const e = changetype<AllocateForPartyB_8_3>(_event)
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
