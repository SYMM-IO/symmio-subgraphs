import { ethereum } from "@graphprotocol/graph-ts"
import { MultiAccountVersion } from "../../../common/BaseHandler"
import { AddAccount } from "../../../generated/schema";

export class AddAccountHandler<T> {
	handle(_event: ethereum.Event, version: MultiAccountVersion): void {
		// @ts-ignore
		const event = changetype<T>(_event)
		let entity = new AddAccount(event.params.account.toString())
		entity.user = event.params.user
		entity.account = event.params.account
		entity.accountSource = event.address
		entity.blockNumber = event.block.number
		entity.blockTimestamp = event.block.timestamp
		entity.transactionHash = event.transaction.hash
		entity.transactionIndex = event.transaction.index
		entity.logIndex = event.logIndex
		entity.blockHash = event.block.hash
		entity.save()
	}
}
