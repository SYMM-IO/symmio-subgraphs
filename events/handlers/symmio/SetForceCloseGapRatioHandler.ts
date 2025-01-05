import { SetForceCloseGapRatio as SetForceCloseGapRatioEntity } from "../../../generated/schema"
import { BigInt, ethereum } from "@graphprotocol/graph-ts"
import { Version } from "../../../common/BaseHandler"
import { getGlobalCounterAndInc } from "../../../common/utils"
import { SetForceCloseGapRatio as SetForceCloseGapRatio_8_4 } from "../../../generated/symmio_0_8_4/symmio_0_8_4"
import { SetForceCloseGapRatio as SetForceCloseGapRatio_8_3 } from "../../../generated/symmio_0_8_3/symmio_0_8_3"

export class SetForceCloseGapRatioHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)

		let entity = new SetForceCloseGapRatioEntity(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
		entity.counterId = getGlobalCounterAndInc()
		entity.oldForceCloseGapRatio = event.params.oldForceCloseGapRatio
		entity.newForceCloseGapRatio = event.params.newForceCloseGapRatio
		entity.transactionIndex = event.transaction.index
		entity.logIndex = event.logIndex
		entity.blockHash = event.block.hash

		switch (version) {
			case Version.v_0_8_4: {
				// @ts-ignore
				const e = changetype<SetForceCloseGapRatio_8_4>(_event)
				entity.symbolId = e.params.symbolId
				break
			}
			case Version.v_0_8_3: {
				// @ts-ignore
				const e = changetype<SetForceCloseGapRatio_8_3>(_event)
				entity.symbolId = e.params.symbolId
				break
			}
			default: {
				entity.symbolId = BigInt.zero()
				break
			}
		}

		entity.blockTimestamp = event.block.timestamp
		entity.blockNumber = event.block.number
		entity.transactionHash = event.transaction.hash
		entity.save()
	}
}
