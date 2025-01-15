import { DeallocatePartyAHandler as CommonDeallocatePartyAHandler } from "../../../common/handlers/symmio/DeallocatePartyAWithAccountHandler"
import { Account, BalanceChange } from "../../../generated/schema"
import { ethereum } from "@graphprotocol/graph-ts"
import { Version } from "../../../common/BaseHandler"
import { getConfiguration } from "../../utils/builders"

import { updateHistories, UpdateHistoriesParams } from "../../utils/historyHelpers"
import { BalanceChangeType, balanceChangeTypes } from "../../utils/constants"
import { updateActivityTimestamps } from "../../utils/activityHelpers"

export class DeallocatePartyAHandler<T> extends CommonDeallocatePartyAHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)
		super.handle(_event, version)
		super.handleQuote(_event, version)
		super.handleSymbol(_event, version)
		super.handleAccount(_event, version)

		let account = Account.load(event.params.user.toHexString())
		if (account == null) return
		updateActivityTimestamps(account, event.block.timestamp)
		if (version < Version.v_0_8_3) {
			let deallocate = new BalanceChange(event.transaction.hash.toHex() + "-" + event.logIndex.toHexString())
			deallocate.type = balanceChangeTypes.get(BalanceChangeType.DEALLOCATE)
			deallocate.timestamp = event.block.timestamp
			deallocate.blockNumber = event.block.number
			deallocate.transaction = event.transaction.hash
			deallocate.amount = event.params.amount
			deallocate.account = event.params.user
			deallocate.collateral = getConfiguration(event).collateral
			deallocate.save()
		}

		updateHistories(new UpdateHistoriesParams(version, account, null, event).deallocate(event.params.amount))
	}
}
