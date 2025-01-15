import { ethereum } from "@graphprotocol/graph-ts/chain/ethereum"
import { Account, DebugEntity, Quote, TradeHistory } from "../../../generated/schema"
import { BigInt, log } from "@graphprotocol/graph-ts"
import { updateHistories, UpdateHistoriesParams } from "../../utils/historyHelpers"
import { Version } from "../../../common/BaseHandler"
import { updateDailyOpenInterest } from "../../utils/openInterestHelpers"
import { unDecimal } from "../../utils/common"

export function handleClose<T>(_event: ethereum.Event, name: string, version: Version): void {
	// @ts-ignore
	const event = changetype<T>(_event) // FillClose, ForceClose, EmergencyClose all have the same event signature
	let quote = Quote.load(event.params.quoteId.toString())
	if (!quote) {
		log.debug("quote not exist. quoteId {}", [event.params.quoteId.toString()])
		let db = new DebugEntity("handleClose")
		db.message = `quote not exist. quoteId ${event.params.quoteId.toString()}`
		db.save()
		return
	}
	const additionalVolume = event.params.filledAmount.times(event.params.closedPrice).div(BigInt.fromString("10").pow(18))
	let history = TradeHistory.load(event.params.partyA.toHexString() + "-" + event.params.quoteId.toString())!
	history.volume = history.volume.plus(additionalVolume)
	history.updateTimestamp = event.block.timestamp
	history.quoteStatus = quote.quoteStatus
	history.quote = event.params.quoteId
	history.save()

	let account = Account.load(event.params.partyA.toHexString())!
	let solverAccount = Account.load(quote.partyB!.toHexString())!

	const pnl = unDecimal(
		(quote.positionType == 0 ? BigInt.fromString("1") : BigInt.fromString("1").neg())
			.times(event.params.closedPrice.minus(quote.openedPrice!))
			.times(event.params.filledAmount),
	)
	let profit = BigInt.zero()
	let loss = BigInt.zero()
	if (pnl.gt(BigInt.zero())) profit = pnl
	else loss = pnl

	updateHistories(
		new UpdateHistoriesParams(version, account, solverAccount, event)
			.closeTradeVolume(additionalVolume)
			.symbolId(quote.symbolId!)
			.loss(loss)
			.profit(profit),
	)
	if (_event.block.timestamp > BigInt.fromI32(1723852800)) {
		// From this timestamp we count partyB volumes in analytics as well
		updateHistories(
			new UpdateHistoriesParams(version, solverAccount, null, event, account.accountSource)
				.closeTradeVolume(additionalVolume)
				.symbolId(quote.symbolId!),
		)
	}
	updateDailyOpenInterest(
		event.block.timestamp,
		unDecimal(event.params.filledAmount.times(quote.initialOpenedPrice!)),
		false,
		solverAccount,
		account.accountSource,
	)
}
