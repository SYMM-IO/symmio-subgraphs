import { AcceptCancelRequest as AcceptCancelRequestEntity } from "../../../generated/schema"
import { ethereum } from "@graphprotocol/graph-ts"
import { Version } from "../../../common/BaseHandler"
import { getGlobalCounterAndInc } from "../../../common/utils"
import { findAccountSourceForQuote } from "../../utils/account_utils";

export class AcceptCancelRequestHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)

		let entity = new AcceptCancelRequestEntity(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
		entity.counterId = getGlobalCounterAndInc()
		entity.quoteId = event.params.quoteId
		entity.accountSource = findAccountSourceForQuote(event.params.quoteId)
		entity.quoteStatus = event.params.quoteStatus

		entity.blockTimestamp = event.block.timestamp
		entity.blockNumber = event.block.number
		entity.transactionHash = event.transaction.hash
		entity.transactionLogIndex = event.transaction.index
		entity.logIndex = event.logIndex
		entity.blockHash = event.block.hash
		entity.save()
	}
}
