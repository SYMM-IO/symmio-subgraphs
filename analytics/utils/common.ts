import { BigInt } from "@graphprotocol/graph-ts"

export function unDecimal(value: BigInt): BigInt {
	return value.div(BigInt.fromString("10").pow(18))
}
