import {
	FillCloseRequestHandler as CommonFillCloseRequestHandler
} from "../../../common/handlers/symmio/FillCloseRequestHandler"
import {ethereum} from "@graphprotocol/graph-ts";
import {Version} from "../../../common/BaseHandler";

import {FillCloseRequest as FillCloseRequest_0_8_4} from "../../../generated/symmio_0_8_4/symmio_0_8_4";
import {FillCloseRequest as FillCloseRequest_0_8_3} from "../../../generated/symmio_0_8_3/symmio_0_8_3";
import {FillCloseRequest as FillCloseRequest_0_8_2} from "../../../generated/symmio_0_8_2/symmio_0_8_2";
import {FillCloseRequest as FillCloseRequest_0_8_0} from "../../../generated/symmio_0_8_0/symmio_0_8_0";
import {handleClose} from "../commonHandlers/close";

export class FillCloseRequestHandler<T> extends CommonFillCloseRequestHandler<T> {
	handle(_event: ethereum.Event, version: Version): void {
		// @ts-ignore
		const event = changetype<T>(_event)
		super.handle(_event, version)
		super.handleQuote(_event, version)
		super.handleSymbol(_event, version)
		super.handleAccount(_event, version)

		switch (version) {
			case Version.v_0_8_4: {
				handleClose<FillCloseRequest_0_8_4>(event, "FillCloseRequest", version)
				break
			}
			case Version.v_0_8_3: {
				handleClose<FillCloseRequest_0_8_3>(event, "FillCloseRequest", version)
				break
			}
			case Version.v_0_8_2: {
				handleClose<FillCloseRequest_0_8_2>(event, "FillCloseRequest", version)
				break
			}
			case Version.v_0_8_0: {
				handleClose<FillCloseRequest_0_8_0>(event, "FillCloseRequest", version)
				break
			}
		}
	}
}
