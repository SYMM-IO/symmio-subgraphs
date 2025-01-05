import { SendQuote as SendQuoteEntity } from "../../../generated/schema"
import { BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts"
import { Version } from "../../../common/BaseHandler"
import { getGlobalCounterAndInc } from "../../../common/utils"
import { SendQuote as SendQuote_8_0 } from "../../../generated/symmio_0_8_0/symmio_0_8_0"
import { SendQuote as SendQuote_8_2 } from "../../../generated/symmio_0_8_2/symmio_0_8_2"
import { SendQuote as SendQuote_8_3 } from "../../../generated/symmio_0_8_3/symmio_0_8_3"
import { SendQuote as SendQuote_8_4 } from "../../../generated/symmio_0_8_4/symmio_0_8_4"
import { findAccountSourceForQuoteForAccount, findAccountSourceForQuote } from "../../utils/account_utils"

export class SendQuoteHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)

		let entity = new SendQuoteEntity(event.params.quoteId.toString())
		entity.counterId = getGlobalCounterAndInc()
		entity.partyA = event.params.partyA
		entity.quoteId = event.params.quoteId
		entity.accountSource = findAccountSourceForQuoteForAccount(event.params.partyA)
		entity.transactionIndex = event.transaction.index
		entity.logIndex = event.logIndex
		entity.blockHash = event.block.hash
		if (event.params.partyBsWhiteList) {
			let partyBsWhiteList: Bytes[] = []
			for (let i = 0, len = event.params.partyBsWhiteList.length; i < len; i++) {
				partyBsWhiteList.push(event.params.partyBsWhiteList[i])
			}
			entity.partyBsWhiteList = partyBsWhiteList
		}
		entity.symbolId = event.params.symbolId
		entity.positionType = event.params.positionType
		entity.orderType = event.params.orderType
		entity.price = event.params.price
		entity.marketPrice = event.params.marketPrice
		entity.quantity = event.params.quantity
		entity.cva = event.params.cva
		entity.lf = event.params.lf

		switch (version) {
			case Version.v_0_8_0: {
				// @ts-ignore
				const e = changetype<SendQuote_8_0>(_event)
				entity.partyAmm = e.params.mm
				entity.partyBmm = e.params.mm
				entity.tradingFee = BigInt.zero() // we can read from the contract if it ever matters
				break
			}
			case Version.v_0_8_2: {
				// @ts-ignore
				const e = changetype<SendQuote_8_2>(_event)
				entity.partyAmm = e.params.partyAmm
				entity.partyBmm = e.params.partyBmm
				entity.tradingFee = e.params.tradingFee
				break
			}
			case Version.v_0_8_3: {
				// @ts-ignore
				const e = changetype<SendQuote_8_3>(_event)
				entity.partyAmm = e.params.partyAmm
				entity.partyBmm = e.params.partyBmm
				entity.tradingFee = e.params.tradingFee
				break
			}
			case Version.v_0_8_4: {
				// @ts-ignore
				const e = changetype<SendQuote_8_4>(_event)
				entity.partyAmm = e.params.partyAmm
				entity.partyBmm = e.params.partyBmm
				entity.tradingFee = e.params.tradingFee
				break
			}
		}

		entity.deadline = event.params.deadline

		entity.blockTimestamp = event.block.timestamp
		entity.blockNumber = event.block.number
		entity.transactionHash = event.transaction.hash
		entity.save()
	}
}
