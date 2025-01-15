import { AllocatePartyAHandler as CommonAllocatePartyAHandler } from "../../../common/handlers/symmio/AllocatePartyAWithAccountHandler"
import { Account, BalanceChange } from "../../../generated/schema"
import { ethereum } from "@graphprotocol/graph-ts"
import { Version } from "../../../common/BaseHandler"
import { getConfiguration } from "../../utils/builders"

import { updateHistories, UpdateHistoriesParams } from "../../utils/historyHelpers"
import { BalanceChangeType, balanceChangeTypes } from "../../utils/constants"
import { updateActivityTimestamps } from "../../utils/activityHelpers"

export class AllocatePartyAHandler<T> extends CommonAllocatePartyAHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)
		super.handle(_event, version)
		super.handleQuote(_event, version)
		super.handleSymbol(_event, version)
		super.handleAccount(_event, version)
		let account = Account.load(event.params.user.toHexString())!
		updateActivityTimestamps(account, event.block.timestamp)
		if (version < Version.v_0_8_3) {
			let allocate = new BalanceChange(event.transaction.hash.toHex() + "-" + event.logIndex.toHexString())
			allocate.type = balanceChangeTypes.get(BalanceChangeType.ALLOCATE)
			allocate.timestamp = event.block.timestamp
			allocate.blockNumber = event.block.number
			allocate.transaction = event.transaction.hash
			allocate.amount = event.params.amount
			allocate.account = event.params.user
			allocate.collateral = getConfiguration(event).collateral
			allocate.save()
		}
		updateHistories(new UpdateHistoriesParams(version, account, null, event).allocate(event.params.amount))
	}
}
