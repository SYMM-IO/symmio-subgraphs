import { LiquidatePartyA as LiquidatePartyAEntity } from "../../../generated/schema"
import { BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts"
import { Version } from "../../../common/BaseHandler"
import { getGlobalCounterAndInc } from "../../../common/utils"
import { LiquidatePartyA as LiquidatePartyA_8_2 } from "../../../generated/symmio_0_8_2/symmio_0_8_2"
import { LiquidatePartyA as LiquidatePartyA_8_3 } from "../../../generated/symmio_0_8_3/symmio_0_8_3"
import { LiquidatePartyA as LiquidatePartyA_8_4 } from "../../../generated/symmio_0_8_4/symmio_0_8_4"

export class LiquidatePartyAHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)

		let entity = new LiquidatePartyAEntity(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
		entity.counterId = getGlobalCounterAndInc()
		entity.liquidator = event.params.liquidator
		entity.partyA = event.params.partyA
		entity.transactionIndex = event.transaction.index
		entity.logIndex = event.logIndex
		entity.blockHash = event.block.hash

		switch (version) {
			case Version.v_0_8_4: {
				// @ts-ignore
				const e = changetype<LiquidatePartyA_8_4>(_event)
				entity.allocatedBalance = e.params.allocatedBalance
				entity.upnl = e.params.upnl
				entity.totalUnrealizedLoss = e.params.totalUnrealizedLoss
				entity.liquidationId = e.params.liquidationId
				break
			}
			case Version.v_0_8_3: {
				// @ts-ignore
				const e = changetype<LiquidatePartyA_8_3>(_event)
				entity.allocatedBalance = e.params.allocatedBalance
				entity.upnl = e.params.upnl
				entity.totalUnrealizedLoss = e.params.totalUnrealizedLoss
				entity.liquidationId = e.params.liquidationId
				break
			}
			case Version.v_0_8_2: {
				// @ts-ignore
				const e = changetype<LiquidatePartyA_8_2>(_event)
				entity.allocatedBalance = e.params.allocatedBalance
				entity.upnl = e.params.upnl
				entity.totalUnrealizedLoss = e.params.totalUnrealizedLoss
				entity.liquidationId = Bytes.empty()
				break
			}
			default: {
				entity.allocatedBalance = BigInt.zero()
				entity.upnl = BigInt.zero()
				entity.totalUnrealizedLoss = BigInt.zero()
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
