import { WithdrawHandler as CommonWithdrawHandler } from "../../../common/handlers/symmio/WithdrawHandler"
import { BalanceChange } from "../../../generated/schema"
import { ethereum } from "@graphprotocol/graph-ts"
import { Version } from "../../../common/BaseHandler"
import { getConfiguration } from "../../utils/builders"

import { updateHistories, UpdateHistoriesParams } from "../../utils/historyHelpers"
import { AccountType, createNewAccountIfNotExists } from "../../../common/utils/builders"
import { updateActivityTimestamps } from "../../utils/activityHelpers"

export class WithdrawHandler<T> extends CommonWithdrawHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)
		super.handle(_event, version)
		const globalCounter = super.handleGlobalCounter()
		super.handleQuote(_event, version)
		super.handleSymbol(_event, version)

		let account = createNewAccountIfNotExists(event.params.sender, event.params.sender, null, AccountType.UNKNOWN, event.block, event.transaction)
		account.globalCounter = globalCounter
		account.withdraw = account.withdraw.plus(event.params.amount)
		account.updateTimestamp = event.block.timestamp
		account.save()
		updateActivityTimestamps(account, event.block.timestamp)
		let withdraw = new BalanceChange(event.transaction.hash.toHex() + "-" + event.logIndex.toHexString())
		withdraw.type = "WITHDRAW"
		withdraw.timestamp = event.block.timestamp
		withdraw.blockNumber = event.block.number
		withdraw.transaction = event.transaction.hash
		withdraw.amount = event.params.amount
		withdraw.account = event.params.sender
		withdraw.collateral = getConfiguration(event).collateral
		withdraw.save()
		updateHistories(new UpdateHistoriesParams(version, account, null, event).withdraw(event.params.amount))
	}
}
