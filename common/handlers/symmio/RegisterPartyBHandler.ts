import { BaseHandler, Version } from "../../BaseHandler"
import { Bytes, ethereum } from "@graphprotocol/graph-ts"
import { AccountType, createNewAccountIfNotExists, getPlayers } from "../../utils/builders"

export class RegisterPartyBHandler<T> extends BaseHandler {
	handleAccount(_event: ethereum.Event, version: Version): void {
		super.handleAccount(_event, version)
		// @ts-ignore
		const event = changetype<T>(_event)
		createNewAccountIfNotExists(event.params.partyB, event.params.partyB, null, AccountType.SOLVER, event.block, event.transaction)

		let players = getPlayers()
		let solvers: Bytes[] = []
		for (let i = 0, len = players.solvers.length; i < len; i++) {
			solvers.push(players.solvers[i])
		}
		solvers.push(event.params.partyB)
		players.solvers = solvers
		players.save()
	}
}
