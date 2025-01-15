import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import { Account, OpenInterest, OpenInterestSettleDay } from "../../generated/schema"
import { getDailyHistoryForTimestamp, getOpenInterest, getSolverDailyHistoryForTimestamp, getSolverOpenInterest } from "./builders"
import { diffInSeconds, endOfDayTimestamp, getDayNumber, SECONDS_IN_DAY, startOfDayTimestamp } from "./time"
import { getPlayers } from "../../common/utils/builders"

export function updateDailyOpenInterest(
	blockTimestamp: BigInt,
	value: BigInt,
	increase: boolean,
	solver: Account,
	accountSource: Bytes | null,
): void {
	let affiliateOI: OpenInterest = getOpenInterest(blockTimestamp, accountSource)
	let solverOI: OpenInterest = getSolverOpenInterest(blockTimestamp, accountSource, solver.account)

	// Process affiliate open interest
	processOpenInterest(
		affiliateOI,
		blockTimestamp,
		value,
		increase,
		accountSource,
		false, // isSolver is false
		// solverAccount defaults to null
	)

	// Process solver open interest
	processOpenInterest(
		solverOI,
		blockTimestamp,
		value,
		increase,
		accountSource,
		true, // isSolver is true
		solver.account, // Pass solverAccount
	)
}

function processOpenInterest(
	openInterest: OpenInterest,
	blockTimestamp: BigInt,
	value: BigInt,
	increase: boolean,
	accountSource: Bytes | null,
	isSolver: boolean,
	solverAccount: Bytes | null = null,
): void {
	let lastUpdateTimestamp = openInterest.timestamp
	let currentTimestamp = blockTimestamp

	let currentAmount = openInterest.amount

	let processingTimestamp = lastUpdateTimestamp

	let done = false

	if (lastUpdateTimestamp.gt(currentTimestamp)) return

	while (!done) {
		let processingDayNumber = getDayNumber(processingTimestamp)

		let lastDay = getDayNumber(currentTimestamp).equals(processingDayNumber)
		let firstDay = getDayNumber(lastUpdateTimestamp).equals(processingDayNumber)

		done = lastDay
		let dailyOpenInterest = BigInt.zero()

		if (firstDay && !lastDay) {
			let firstIntervalStart = startOfDayTimestamp(processingTimestamp)
			let firstIntervalEnd = processingTimestamp

			let secondIntervalStart = processingTimestamp
			let secondIntervalEnd = endOfDayTimestamp(processingTimestamp)

			let firstInterval = diffInSeconds(firstIntervalEnd, firstIntervalStart)
			let secondInterval = diffInSeconds(secondIntervalEnd, secondIntervalStart)
			let totalInterval = diffInSeconds(secondIntervalEnd, firstIntervalStart)

			// Calculate the day's accumulated amount
			let accumulatedFirstPart = openInterest.weightedAmount
			let accumulatedSecondPart = secondInterval.times(currentAmount)

			dailyOpenInterest = accumulatedFirstPart.plus(accumulatedSecondPart).div(totalInterval)
			openInterest.weightedAmount = BigInt.zero()
		} else if (!firstDay && !lastDay) {
			dailyOpenInterest = currentAmount
			openInterest.weightedAmount = BigInt.zero()
		} else if (!firstDay && lastDay) {
			processingTimestamp = currentTimestamp
			let firstIntervalStart = startOfDayTimestamp(processingTimestamp)
			let firstIntervalEnd = processingTimestamp

			let secondIntervalStart = processingTimestamp
			let secondIntervalEnd = endOfDayTimestamp(processingTimestamp)

			let firstInterval = diffInSeconds(firstIntervalEnd, firstIntervalStart)
			let secondInterval = diffInSeconds(secondIntervalEnd, secondIntervalStart)
			let totalInterval = diffInSeconds(secondIntervalEnd, firstIntervalStart)

			// Calculate the day's accumulated amount
			let accumulatedFirstPart = firstInterval.times(currentAmount)
			let accumulatedSecondPart = secondInterval.times(increase ? currentAmount.plus(value) : currentAmount.minus(value))

			dailyOpenInterest = accumulatedFirstPart.plus(accumulatedSecondPart).div(totalInterval)
			openInterest.weightedAmount = accumulatedFirstPart
		} else if (firstDay && lastDay) {
			processingTimestamp = lastUpdateTimestamp
			let firstIntervalStart = startOfDayTimestamp(processingTimestamp)
			let firstIntervalEnd = processingTimestamp

			let secondIntervalStart = processingTimestamp
			let secondIntervalEnd = currentTimestamp

			let thirdIntervalStart = currentTimestamp
			let thirdIntervalEnd = endOfDayTimestamp(processingTimestamp)

			let firstInterval = diffInSeconds(firstIntervalEnd, firstIntervalStart)
			let secondInterval = diffInSeconds(secondIntervalEnd, secondIntervalStart)
			let thirdInterval = diffInSeconds(thirdIntervalEnd, thirdIntervalStart)
			let totalInterval = diffInSeconds(thirdIntervalEnd, firstIntervalStart)

			// Calculate the day's accumulated amount
			let accumulatedFirstPart = openInterest.weightedAmount
			let accumulatedSecondPart = secondInterval.times(currentAmount)
			let accumulatedThirdPart = thirdInterval.times(increase ? currentAmount.plus(value) : currentAmount.minus(value))

			dailyOpenInterest = accumulatedFirstPart.plus(accumulatedSecondPart).plus(accumulatedThirdPart).div(totalInterval)
			openInterest.weightedAmount = accumulatedFirstPart.plus(accumulatedSecondPart)
		}

		if (isSolver) {
			let dailyHistory = getSolverDailyHistoryForTimestamp(processingTimestamp, solverAccount!, accountSource)
			dailyHistory.openInterest = dailyOpenInterest
			dailyHistory.updateTimestamp = processingTimestamp
			dailyHistory.save()
		} else {
			let dailyHistory = getDailyHistoryForTimestamp(processingTimestamp, accountSource)
			dailyHistory.openInterest = dailyOpenInterest
			dailyHistory.updateTimestamp = processingTimestamp
			dailyHistory.save()
		}

		// Move to the next day
		processingTimestamp = processingTimestamp.plus(SECONDS_IN_DAY)
	}

	openInterest.timestamp = currentTimestamp
	openInterest.amount = increase ? currentAmount.plus(value) : currentAmount.minus(value)
	openInterest.save()
}

export function catchUpHistories(blockTimestamp: BigInt): void {
	let yesterday = getDayNumber(blockTimestamp).minus(BigInt.fromI32(1))

	let id = "LastSettleDay"
	let settleDay = OpenInterestSettleDay.load(id)
	if (!settleDay) {
		settleDay = new OpenInterestSettleDay(id)
		settleDay.dayNumber = yesterday
		settleDay.timestamp = blockTimestamp
		settleDay.save()
		return
	}

	if (settleDay.dayNumber.ge(yesterday)) return

	let players = getPlayers()
	if (!players || !players.affiliates || !players.solvers) return

	let lenAffiliates = players.affiliates.length
	let lenSolvers = players.solvers.length

	let timestamp = yesterday.times(SECONDS_IN_DAY).minus(BigInt.fromI32(1))

	for (let i = 0; i < lenAffiliates; i++) {
		let affiliate = players.affiliates[i]

		for (let j = 0; j < lenSolvers; j++) {
			let solver = Account.load(players.solvers[j].toHexString())
			if (!solver) continue

			updateDailyOpenInterest(timestamp, BigInt.zero(), true, solver, BigInt.fromByteArray(affiliate) == BigInt.zero() ? null : affiliate)
		}
	}

	settleDay.dayNumber = yesterday
	settleDay.timestamp = blockTimestamp
	settleDay.save()
}
