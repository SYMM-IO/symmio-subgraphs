import { LiquidatePartyB as LiquidatePartyBEntity } from "../../../generated/schema"
import { BigInt, ethereum } from "@graphprotocol/graph-ts"
import { Version } from "../../../common/BaseHandler"
import { getGlobalCounterAndInc } from "../../../common/utils"
import { LiquidatePartyB as LiquidatePartyB_8_2 } from "../../../generated/symmio_0_8_2/symmio_0_8_2"
import { LiquidatePartyB as LiquidatePartyB_8_3 } from "../../../generated/symmio_0_8_3/symmio_0_8_3"
import { LiquidatePartyB as LiquidatePartyB_8_4 } from "../../../generated/symmio_0_8_4/symmio_0_8_4"

export class LiquidatePartyBHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)

		let entity = new LiquidatePartyBEntity(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
		entity.counterId = getGlobalCounterAndInc()
		entity.liquidator = event.params.liquidator
		entity.partyB = event.params.partyB
		entity.partyA = event.params.partyA
		entity.transactionIndex = event.transaction.index
		entity.logIndex = event.logIndex
		entity.blockHash = event.block.hash

		switch (version) {
			case Version.v_0_8_4: {
				// @ts-ignore
				const e = changetype<LiquidatePartyB_8_4>(_event)
				entity.partyBAllocatedBalance = e.params.partyBAllocatedBalance
				entity.upnl = e.params.upnl
				break
			}
			case Version.v_0_8_3: {
				// @ts-ignore
				const e = changetype<LiquidatePartyB_8_3>(_event)
				entity.partyBAllocatedBalance = e.params.partyBAllocatedBalance
				entity.upnl = e.params.upnl
				break
			}
			case Version.v_0_8_2: {
				// @ts-ignore
				const e = changetype<LiquidatePartyB_8_2>(_event)
				entity.partyBAllocatedBalance = e.params.partyBAllocatedBalance
				entity.upnl = e.params.upnl
				break
			}
			default: {
				entity.partyBAllocatedBalance = BigInt.zero()
				entity.upnl = BigInt.zero()
				break
			}
		}

		entity.blockTimestamp = event.block.timestamp
		entity.blockNumber = event.block.number
		entity.transactionHash = event.transaction.hash
		entity.save()
	}
}
