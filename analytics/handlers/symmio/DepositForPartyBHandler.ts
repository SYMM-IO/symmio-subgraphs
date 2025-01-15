import { DepositForPartyBWithAccountHandler as CommonDepositForPartyBHandler } from "../../../common/handlers/symmio/DepositForPartyBWithAccountHandler"
import { Account, BalanceChange } from "../../../generated/schema"
import { ethereum } from "@graphprotocol/graph-ts"
import { Version } from "../../../common/BaseHandler"
import { getConfiguration } from "../../utils/builders"

import { updateHistories, UpdateHistoriesParams } from "../../utils/historyHelpers"
import { BalanceChangeType, balanceChangeTypes } from "../../utils/constants"
import { updateActivityTimestamps } from "../../utils/activityHelpers"

export class DepositForPartyBHandler<T> extends CommonDepositForPartyBHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)
		super.handle(_event, version)
		super.handleQuote(_event, version)
		super.handleSymbol(_event, version)
		super.handleAccount(_event, version)

		let account = Account.load(event.params.partyB.toHexString())!
		updateActivityTimestamps(account, event.block.timestamp)
		let deposit = new BalanceChange(event.transaction.hash.toHex() + "-" + event.logIndex.toHexString())
		deposit.type = balanceChangeTypes.get(BalanceChangeType.DEPOSIT)
		deposit.timestamp = event.block.timestamp
		deposit.blockNumber = event.block.number
		deposit.transaction = event.transaction.hash
		deposit.amount = event.params.amount
		deposit.account = event.params.partyB
		deposit.collateral = getConfiguration(event).collateral
		deposit.save()
		updateHistories(new UpdateHistoriesParams(version, account, null, event).deposit(event.params.amount))
	}
}
