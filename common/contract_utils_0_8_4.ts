import {Address, BigInt, Bytes, log} from "@graphprotocol/graph-ts"
import {
	symmio_0_8_4,
	symmio_0_8_4__balanceInfoOfPartyAResult,
	symmio_0_8_4__balanceInfoOfPartyBResult,
	symmio_0_8_4__getLiquidatedStateOfPartyAResultValue0Struct,
	symmio_0_8_4__getQuoteResultValue0Struct,
} from "../generated/symmio_0_8_4/symmio_0_8_4"

export function getQuote(address: Address, id: BigInt): symmio_0_8_4__getQuoteResultValue0Struct | null {
	const contract = symmio_0_8_4.bind(address)
	let result = contract.try_getQuote(id)
	return result.reverted ? null : result.value
}

export function getCollateral(address: Address,): Bytes | null {
	const contract = symmio_0_8_4.bind(address)
	let result = contract.try_getCollateral()
	return result.reverted ? null : result.value
}

export function getLiquidatedStateOfPartyA(address: Address, partyA: Address): symmio_0_8_4__getLiquidatedStateOfPartyAResultValue0Struct | null {
	const contract = symmio_0_8_4.bind(address)
	let result = contract.try_getLiquidatedStateOfPartyA(partyA)
	return result.reverted ? null : result.value
}

export function getBalanceInfoOfPartyA(address: Address, partyA: Address): symmio_0_8_4__balanceInfoOfPartyAResult | null {
	const contract = symmio_0_8_4.bind(address)
	let result = contract.try_balanceInfoOfPartyA(partyA)
	return result.reverted ? null : result.value
}

export function getBalanceInfoOfPartyB(address: Address, partyA: Address, partyB: Address): symmio_0_8_4__balanceInfoOfPartyBResult | null {
	const contract = symmio_0_8_4.bind(address)
	let result = contract.try_balanceInfoOfPartyB(partyB, partyA)
	return result.reverted ? null : result.value
}

export function symbolIdToSymbolName(symbolId: BigInt, contractAddress: Address): string {
	let symmioContract = symmio_0_8_4.bind(contractAddress)
	let callResult = symmioContract.try_symbolNameById([symbolId])
	if (callResult.reverted) {
		log.error("error in symbol bind", [])
		return ""
	} else {
		return callResult.value[0]
	}
}