import { AddSymbol as AddSymbolEntity } from "../../../generated/schema"
import { BigInt, ethereum } from "@graphprotocol/graph-ts"
import { Version } from "../../../common/BaseHandler"
import { AddSymbol as AddSymbol_8_2 } from "../../../generated/symmio_0_8_2/symmio_0_8_2"
import { AddSymbol as AddSymbol_8_3 } from "../../../generated/symmio_0_8_3/symmio_0_8_3"
import { AddSymbol as AddSymbol_8_4 } from "../../../generated/symmio_0_8_4/symmio_0_8_4"
import { getGlobalCounterAndInc } from "../../../common/utils"

export class AddSymbolHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)

		let entity = new AddSymbolEntity(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
		entity.counterId = getGlobalCounterAndInc()
		entity.transactionIndex = event.transaction.index
		entity.logIndex = event.logIndex
		entity.blockHash = event.block.hash

		switch (version) {
			case Version.v_0_8_4: {
				// @ts-ignore
				const e = changetype<AddSymbol_8_4>(_event)
				entity.symbolId = BigInt.zero()
				entity.maxLeverage = e.params.maxLeverage
				entity.fundingRateEpochDuration = e.params.fundingRateEpochDuration
				entity.fundingRateWindowTime = e.params.fundingRateWindowTime
				entity.symbolId = e.params.symbolId
				break
			}
			case Version.v_0_8_3: {
				// @ts-ignore
				const e = changetype<AddSymbol_8_3>(_event)
				entity.symbolId = BigInt.zero()
				entity.maxLeverage = e.params.maxLeverage
				entity.fundingRateEpochDuration = e.params.fundingRateEpochDuration
				entity.fundingRateWindowTime = e.params.fundingRateWindowTime
				entity.symbolId = e.params.symbolId
				break
			}
			case Version.v_0_8_2: {
				// @ts-ignore
				const e = changetype<AddSymbol_8_2>(_event)
				entity.symbolId = BigInt.zero()
				entity.maxLeverage = e.params.maxLeverage
				entity.fundingRateEpochDuration = e.params.fundingRateEpochDuration
				entity.fundingRateWindowTime = e.params.fundingRateWindowTime
				entity.symbolId = e.params.id
				break
			}
			default: {
				entity.maxLeverage = BigInt.zero()
				entity.fundingRateEpochDuration = BigInt.zero()
				entity.fundingRateWindowTime = BigInt.zero()
				entity.symbolId = BigInt.zero()
				break
			}
		}

		entity.name = event.params.name
		entity.minAcceptableQuoteValue = event.params.minAcceptableQuoteValue
		entity.minAcceptablePortionLF = event.params.minAcceptablePortionLF
		entity.tradingFee = event.params.tradingFee

		entity.blockTimestamp = event.block.timestamp
		entity.blockNumber = event.block.number
		entity.transactionHash = event.transaction.hash
		entity.save()
	}
}
