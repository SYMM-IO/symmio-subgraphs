import { DisputeForLiquidation as DisputeForLiquidationEntity } from "../../../generated/schema"
import { Bytes, ethereum } from "@graphprotocol/graph-ts"
import { Version } from "../../../common/BaseHandler"
import { getGlobalCounterAndInc } from "../../../common/utils"
import { DisputeForLiquidation as DisputeForLiquidation_8_3 } from "../../../generated/symmio_0_8_3/symmio_0_8_3"
import { DisputeForLiquidation as DisputeForLiquidation_8_4 } from "../../../generated/symmio_0_8_4/symmio_0_8_4"

export class DisputeForLiquidationHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)

		let entity = new DisputeForLiquidationEntity(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
		entity.counterId = getGlobalCounterAndInc()
		entity.liquidator = event.params.liquidator
		entity.partyA = event.params.partyA

		switch (version) {
			case Version.v_0_8_4: {
				// @ts-ignore
				const e = changetype<DisputeForLiquidation_8_4>(_event)
				entity.liquidationId = e.params.liquidationId
				break
			}
			case Version.v_0_8_3: {
				// @ts-ignore
				const e = changetype<DisputeForLiquidation_8_3>(_event)
				entity.liquidationId = e.params.liquidationId
				break
			}
			default: {
				entity.liquidationId = Bytes.empty()
				break
			}
		}

		entity.blockTimestamp = event.block.timestamp
		entity.blockNumber = event.block.number
		entity.transactionHash = event.transaction.hash
		entity.save()
	}
}
