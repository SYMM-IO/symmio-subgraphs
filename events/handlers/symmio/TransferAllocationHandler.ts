import {TransferAllocation as TransferAllocationEntity} from "../../../generated/schema";
import {ethereum} from "@graphprotocol/graph-ts";
import {Version} from "../../../common/BaseHandler";

export class TransferAllocationHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)

		let entity = new TransferAllocationEntity(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
		entity.amount = event.params.amount;
		entity.origin = event.params.origin;
		entity.recipient = event.params.recipient;

		entity.blockTimestamp = event.block.timestamp;
		entity.transactionHash = event.transaction.hash;
		entity.save();
	}
}
