import { SetSymbolsPrices as SetSymbolsPricesEntity } from "../../../generated/schema"
import { Bytes, ethereum } from "@graphprotocol/graph-ts"
import { Version } from "../../../common/BaseHandler"
import { getGlobalCounterAndInc } from "../../../common/utils"
import { SetSymbolsPrices as SetSymbolsPrices_8_4 } from "../../../generated/symmio_0_8_4/symmio_0_8_4"
import { SetSymbolsPrices as SetSymbolsPrices_8_3 } from "../../../generated/symmio_0_8_3/symmio_0_8_3"

export class SetSymbolsPricesHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)

		let entity = new SetSymbolsPricesEntity(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
		entity.counterId = getGlobalCounterAndInc()
		entity.liquidator = event.params.liquidator
		entity.partyA = event.params.partyA
		entity.symbolIds = event.params.symbolIds
		entity.prices = event.params.prices
		entity.transactionIndex = event.transaction.index
		entity.logIndex = event.logIndex
		entity.blockHash = event.block.hash

		switch (version) {
			case Version.v_0_8_4: {
				// @ts-ignore
				const e = changetype<SetSymbolsPrices_8_4>(_event)
				entity.liquidationId = e.params.liquidationId
				break
			}
			case Version.v_0_8_3: {
				// @ts-ignore
				const e = changetype<SetSymbolsPrices_8_3>(_event)
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
