import { SetFeeCollector as SetFeeCollectorEntity } from "../../../generated/schema"
import { Bytes, ethereum } from "@graphprotocol/graph-ts"
import { Version } from "../../../common/BaseHandler"
import { getGlobalCounterAndInc } from "../../../common/utils"
import { SetFeeCollector as SetFeeCollector_8_4 } from "../../../generated/symmio_0_8_4/symmio_0_8_4"
import { SetFeeCollector as SetFeeCollector_8_3 } from "../../../generated/symmio_0_8_3/symmio_0_8_3"

export class SetFeeCollectorHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)

		let entity = new SetFeeCollectorEntity(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
		entity.counterId = getGlobalCounterAndInc()
		entity.oldFeeCollector = event.params.oldFeeCollector
		entity.newFeeCollector = event.params.newFeeCollector
		entity.transactionIndex = event.transaction.index
		entity.logIndex = event.logIndex
		entity.blockHash = event.block.hash

		switch (version) {
			case Version.v_0_8_4: {
				// @ts-ignore
				const e = changetype<SetFeeCollector_8_4>(_event)
				entity.affiliate = e.params.affiliate
				break
			}
			case Version.v_0_8_3: {
				// @ts-ignore
				const e = changetype<SetFeeCollector_8_3>(_event)
				entity.affiliate = e.params.affiliate
				break
			}
			default: {
				entity.affiliate = Bytes.empty()
				break
			}
		}

		entity.blockTimestamp = event.block.timestamp
		entity.blockNumber = event.block.number
		entity.transactionHash = event.transaction.hash
		entity.save()
	}
}
