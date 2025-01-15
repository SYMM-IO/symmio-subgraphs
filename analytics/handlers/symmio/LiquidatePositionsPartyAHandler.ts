import {
	LiquidatePositionsPartyAHandler as CommonLiquidatePositionsPartyAHandler
} from "../../../common/handlers/symmio/LiquidatePositionsPartyAHandler"
import {ethereum} from "@graphprotocol/graph-ts";
import {Version} from "../../../common/BaseHandler";
import {LiquidatePositionsPartyA as LiquidatePositionsPartyA_0_8_0} from "../../../generated/symmio_0_8_0/symmio_0_8_0";
import {LiquidatePositionsPartyA as LiquidatePositionsPartyA_0_8_2} from "../../../generated/symmio_0_8_2/symmio_0_8_2";
import {LiquidatePositionsPartyA as LiquidatePositionsPartyA_0_8_3} from "../../../generated/symmio_0_8_3/symmio_0_8_3";
import {LiquidatePositionsPartyA as LiquidatePositionsPartyA_0_8_4} from "../../../generated/symmio_0_8_4/symmio_0_8_4";
import {handleLiquidatePosition} from "../commonHandlers/liquidatePositions";

export class LiquidatePositionsPartyAHandler<T> extends CommonLiquidatePositionsPartyAHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)
		super.handle(_event, version)
		super.handleSymbol(_event, version)
		super.handleAccount(_event, version)

		for (let i = 0; i < event.params.quoteIds.length; i++) {
			const qId = event.params.quoteIds[i]
			switch (version) {
				case Version.v_0_8_4: {
					handleLiquidatePosition<LiquidatePositionsPartyA_0_8_4>(event, version, qId)
					break
				}
				case Version.v_0_8_3: {
					handleLiquidatePosition<LiquidatePositionsPartyA_0_8_3>(event, version, qId)
					break
				}
				case Version.v_0_8_2: {
					handleLiquidatePosition<LiquidatePositionsPartyA_0_8_2>(event, version, qId)
					break
				}
				case Version.v_0_8_0: {
					handleLiquidatePosition<LiquidatePositionsPartyA_0_8_0>(event, version, qId)
					break
				}
			}
		}
		super.handleQuote(_event, version) // AverageClosePrice should be updated after that calculation in handleLiquidatePosition method
	}
}
