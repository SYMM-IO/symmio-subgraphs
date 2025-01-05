import { SetSymbolValidationState as SetSymbolValidationStateEntity } from "../../../generated/schema"
import { BigInt, ethereum } from "@graphprotocol/graph-ts"
import { Version } from "../../../common/BaseHandler"
import { SetSymbolValidationState as SetSymbolValidationState_8_2 } from "../../../generated/symmio_0_8_2/symmio_0_8_2"
import { getGlobalCounterAndInc } from "../../../common/utils"

export class SetSymbolValidationStateHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)

		let entity = new SetSymbolValidationStateEntity(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
		entity.counterId = getGlobalCounterAndInc()
		if (version == Version.v_0_8_2) {
			// @ts-ignore
			const e = changetype<SetSymbolValidationState_8_2>(_event)
			entity.symbolId = e.params.id
		} else {
			entity.symbolId = BigInt.zero()
		}
		entity.oldState = event.params.oldState
		entity.isValid = event.params.isValid

		entity.blockTimestamp = event.block.timestamp
		entity.blockNumber = event.block.number
		entity.transactionHash = event.transaction.hash
		entity.transactionIndex = event.transaction.index
		entity.logIndex = event.logIndex
		entity.blockHash = event.block.hash
		entity.save()
	}
}
