import {RequestToCancelQuote as RequestToCancelQuoteEntity} from "../../../generated/schema";
import {ethereum} from "@graphprotocol/graph-ts";
import {Version} from "../../../common/BaseHandler";

export class RequestToCancelQuoteHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)

		let entity = new RequestToCancelQuoteEntity(event.transaction.hash.toHex() + "-" + event.logIndex.toString());
		entity.partyA = event.params.partyA;
		entity.partyB = event.params.partyB;
		entity.quoteStatus = event.params.quoteStatus;
		entity.quoteId = event.params.quoteId;

		entity.blockTimestamp = event.block.timestamp;
		entity.transactionHash = event.transaction.hash;
		entity.save();
	}
}
