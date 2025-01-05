import { SetSymbolFundingState as SetSymbolFundingStateEntity } from "../../../generated/schema"
import { BigInt, ethereum } from "@graphprotocol/graph-ts"
import { Version } from "../../../common/BaseHandler"
import { SetSymbolFundingState as SetSymbolFundingState_8_2 } from "../../../generated/symmio_0_8_2/symmio_0_8_2"
import { getGlobalCounterAndInc } from "../../../common/utils"

export class SetSymbolFundingStateHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)

		let entity = new SetSymbolFundingStateEntity(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
		entity.counterId = getGlobalCounterAndInc()
		if (version == Version.v_0_8_2) {
			// @ts-ignore
			const e = changetype<SetSymbolFundingState_8_2>(_event)
			entity.symbolId = e.params.id
		} else {
			entity.symbolId = BigInt.zero()
		}
		entity.fundingRateEpochDuration = event.params.fundingRateEpochDuration
		entity.fundingRateWindowTime = event.params.fundingRateWindowTime

		entity.blockTimestamp = event.block.timestamp
		entity.blockNumber = event.block.number
		entity.transactionHash = event.transaction.hash
		entity.transactionIndex = event.transaction.index
		entity.logIndex = event.logIndex
		entity.blockHash = event.block.hash
		entity.save()
	}
}
