import { BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts"
import { Account as AccountModel, User as UserModel, Players } from "../../generated/schema"
import { getGlobalCounterAndInc } from "../utils"

export enum AccountType {
	NORMAL,
	SOLVER,
	LIQUIDATOR,
	BRIDGE,
	UNKNOWN,
}

// @ts-ignore
let accountTypes = new Map<number, string>()
accountTypes.set(AccountType.NORMAL, "NORMAL")
accountTypes.set(AccountType.SOLVER, "SOLVER")
accountTypes.set(AccountType.LIQUIDATOR, "LIQUIDATOR")
accountTypes.set(AccountType.BRIDGE, "BRIDGE")
accountTypes.set(AccountType.UNKNOWN, "UNKNOWN")

export function createNewAccountIfNotExists(
	address: Bytes,
	user: Bytes,
	accountSource: Bytes | null,
	type: AccountType,
	block: ethereum.Block,
	transaction: ethereum.Transaction,
	name: string | null = null,
	replaceOnExisting: boolean = false,
): AccountModel {
	let u = UserModel.load(user.toHexString())
	if (u == null) {
		u = new UserModel(user.toHexString())
		u.address = user
		u.timestamp = block.timestamp
		u.transaction = transaction.hash
		u.globalCounter = getGlobalCounterAndInc()
		u.save()
	}
	let account = AccountModel.load(address.toHexString())
	if (account != null && !replaceOnExisting) {
		return account
	}
	if (account == null) {
		account = new AccountModel(address.toHexString())
	}

	account.account = address
	account.type = accountTypes.get(type)!
	account.lastActivityTimestamp = block.timestamp
	account.timestamp = block.timestamp
	account.transaction = transaction.hash
	account.deposit = BigInt.zero()
	account.withdraw = BigInt.zero()
	account.allocated = BigInt.zero()
	account.deallocated = BigInt.zero()
	account.quotesCount = BigInt.zero()
	account.positionsCount = BigInt.zero()
	account.user = user
	account.updateTimestamp = block.timestamp
	account.accountSource = accountSource
	account.name = name
	account.globalCounter = getGlobalCounterAndInc()
	account.blockNumber = block.number
	account.save()
	return account
}

export function getPlayers(): Players {
	const id = "SymmioPlayers"
	let players = Players.load(id)
	if (!players) {
		players = new Players(id)
		let affiliates: Bytes[] = []
		affiliates.push(Bytes.fromHexString("0x0000000000000000000000000000000000000000"))
		players.affiliates = affiliates
		players.solvers = []
		players.liquidators = []
		players.save()
	}
	return players
}
