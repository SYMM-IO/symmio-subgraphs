import { Bytes, ethereum } from "@graphprotocol/graph-ts"
import { BaseMultiAccountHandler, MultiAccountVersion } from "../../BaseHandler"
import { AccountType, createNewAccountIfNotExists, getPlayers } from "../../utils/builders"
import { Affiliate } from "../../../generated/schema"

export class AddAccountHandler<T> extends BaseMultiAccountHandler {
	handleAccount(_event: ethereum.Event, version: MultiAccountVersion): void {
		// @ts-ignore
		const event = changetype<T>(_event)
		createNewAccountIfNotExists(
			event.params.account,
			event.params.user,
			event.address,
			AccountType.NORMAL,
			event.block,
			event.transaction,
			event.params.name,
			true,
		)

		const affId = event.address.toHexString()
		let affiliate = Affiliate.load(affId)
		if (!affiliate) {
			affiliate = new Affiliate(affId)
			affiliate.save()
			let players = getPlayers()
			let affiliates: Bytes[] = []
			for (let i = 0, len = players.affiliates.length; i < len; i++) {
				affiliates.push(players.affiliates[i])
			}
			affiliates.push(event.address)
			players.affiliates = affiliates
			players.save()
		}
	}
}
