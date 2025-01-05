import { TransferAllocation as TransferAllocationEntity } from "../../../generated/schema"
import { BigInt, ethereum } from "@graphprotocol/graph-ts"
import { Version } from "../../../common/BaseHandler"
import { getGlobalCounterAndInc } from "../../../common/utils"
import { TransferAllocation as TransferAllocation_8_4 } from "../../../generated/symmio_0_8_4/symmio_0_8_4"
import { TransferAllocation as TransferAllocation_8_3 } from "../../../generated/symmio_0_8_3/symmio_0_8_3"

export class TransferAllocationHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)

		let entity = new TransferAllocationEntity(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
		entity.counterId = getGlobalCounterAndInc()
		entity.amount = event.params.amount
		entity.origin = event.params.origin
		entity.recipient = event.params.recipient
		entity.transactionIndex = event.transaction.index
		entity.logIndex = event.logIndex
		entity.blockHash = event.block.hash

		switch (version) {
			case Version.v_0_8_4: {
				// @ts-ignore
				const e = changetype<TransferAllocation_8_4>(_event)
				entity.originNewAllocatedBalance = e.params.originNewAllocatedBalance
				entity.recipientNewAllocatedBalance = e.params.recipientNewAllocatedBalance
				break
			}
			case Version.v_0_8_3: {
				// @ts-ignore
				const e = changetype<TransferAllocation_8_3>(_event)
				entity.originNewAllocatedBalance = e.params.originNewAllocatedBalance
				entity.recipientNewAllocatedBalance = e.params.recipientNewAllocatedBalance
				break
			}
			default: {
				entity.originNewAllocatedBalance = BigInt.zero()
				entity.recipientNewAllocatedBalance = BigInt.zero()
				break
			}
		}

		entity.blockTimestamp = event.block.timestamp
		entity.blockNumber = event.block.number
		entity.transactionHash = event.transaction.hash
		entity.save()
	}
}
