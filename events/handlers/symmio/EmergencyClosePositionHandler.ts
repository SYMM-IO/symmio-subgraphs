import { EmergencyClosePosition as EmergencyClosePositionEntity } from "../../../generated/schema"
import { BigInt, ethereum } from "@graphprotocol/graph-ts"
import { Version } from "../../../common/BaseHandler"
import { getGlobalCounterAndInc } from "../../../common/utils"
import { EmergencyClosePosition as EmergencyClosePosition_8_3 } from "../../../generated/symmio_0_8_3/symmio_0_8_3"
import { EmergencyClosePosition as EmergencyClosePosition_8_4 } from "../../../generated/symmio_0_8_4/symmio_0_8_4"
import { findAccountSourceForQuote } from "../../utils/account_utils";

export class EmergencyClosePositionHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)

		let entity = new EmergencyClosePositionEntity(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
		entity.counterId = getGlobalCounterAndInc()

		entity.quoteId = event.params.quoteId
		entity.accountSource = findAccountSourceForQuote(event.params.quoteId)
		entity.partyA = event.params.partyA
		entity.partyB = event.params.partyB
		entity.filledAmount = event.params.filledAmount
		entity.closedPrice = event.params.closedPrice
		entity.quoteStatus = event.params.quoteStatus
		entity.transactionIndex = event.transaction.index
		entity.logIndex = event.logIndex
		entity.blockHash = event.block.hash

		switch (version) {
			case Version.v_0_8_4: {
				// @ts-ignore
				const e = changetype<EmergencyClosePosition_8_4>(_event)
				entity.closeId = e.params.closeId
				break
			}
			case Version.v_0_8_3: {
				// @ts-ignore
				const e = changetype<EmergencyClosePosition_8_3>(_event)
				entity.closeId = e.params.closeId
				break
			}
			default: {
				entity.closeId = BigInt.zero()
				break
			}
		}

		entity.blockTimestamp = event.block.timestamp
		entity.blockNumber = event.block.number
		entity.transactionHash = event.transaction.hash
		entity.save()
	}
}
