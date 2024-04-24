
import {OpenPositionHandler} from "./handlers/OpenPositionHandler"
import {OpenPosition} from "../generated/symmio/symmio"
		
import {EmergencyClosePositionHandler} from "./handlers/EmergencyClosePositionHandler"
import {EmergencyClosePosition} from "../generated/symmio/symmio"
		
import {UnlockQuoteHandler} from "./handlers/UnlockQuoteHandler"
import {UnlockQuote} from "../generated/symmio/symmio"
		
import {RequestToCancelQuoteHandler} from "./handlers/RequestToCancelQuoteHandler"
import {RequestToCancelQuote} from "../generated/symmio/symmio"
		
import {RequestToCancelCloseRequestHandler} from "./handlers/RequestToCancelCloseRequestHandler"
import {RequestToCancelCloseRequest} from "../generated/symmio/symmio"
		
import {ChargeFundingRateHandler} from "./handlers/ChargeFundingRateHandler"
import {ChargeFundingRate} from "../generated/symmio/symmio"
		
import {FillCloseRequestHandler} from "./handlers/FillCloseRequestHandler"
import {FillCloseRequest} from "../generated/symmio/symmio"
		
import {LiquidatePartyBHandler} from "./handlers/LiquidatePartyBHandler"
import {LiquidatePartyB} from "../generated/symmio/symmio"
		
import {ForceCancelQuoteHandler} from "./handlers/ForceCancelQuoteHandler"
import {ForceCancelQuote} from "../generated/symmio/symmio"
		
import {RequestToClosePositionHandler} from "./handlers/RequestToClosePositionHandler"
import {RequestToClosePosition} from "../generated/symmio/symmio"
		
import {ExpireQuoteHandler} from "./handlers/ExpireQuoteHandler"
import {ExpireQuote} from "../generated/symmio/symmio"
		
import {LockQuoteHandler} from "./handlers/LockQuoteHandler"
import {LockQuote} from "../generated/symmio/symmio"
		
import {LiquidatePendingPositionsPartyAHandler} from "./handlers/LiquidatePendingPositionsPartyAHandler"
import {LiquidatePendingPositionsPartyA} from "../generated/symmio/symmio"
		
import {SendQuoteHandler} from "./handlers/SendQuoteHandler"
import {SendQuote} from "../generated/symmio/symmio"
		
import {LiquidatePositionsPartyAHandler} from "./handlers/LiquidatePositionsPartyAHandler"
import {LiquidatePositionsPartyA} from "../generated/symmio/symmio"
		
import {ForceClosePositionHandler} from "./handlers/ForceClosePositionHandler"
import {ForceClosePosition} from "../generated/symmio/symmio"
		
import {LiquidatePartyAHandler} from "./handlers/LiquidatePartyAHandler"
import {LiquidatePartyA} from "../generated/symmio/symmio"
		
import {LiquidatePositionsPartyBHandler} from "./handlers/LiquidatePositionsPartyBHandler"
import {LiquidatePositionsPartyB} from "../generated/symmio/symmio"
		
import {AcceptCancelRequestHandler} from "./handlers/AcceptCancelRequestHandler"
import {AcceptCancelRequest} from "../generated/symmio/symmio"
		
export function handleOpenPosition(event: OpenPosition): void {
	let handler = new OpenPositionHandler(event)
	handler.handle()
}
		
export function handleEmergencyClosePosition(event: EmergencyClosePosition): void {
	let handler = new EmergencyClosePositionHandler(event)
	handler.handle()
}
		
export function handleUnlockQuote(event: UnlockQuote): void {
	let handler = new UnlockQuoteHandler(event)
	handler.handle()
}
		
export function handleRequestToCancelQuote(event: RequestToCancelQuote): void {
	let handler = new RequestToCancelQuoteHandler(event)
	handler.handle()
}
		
export function handleRequestToCancelCloseRequest(event: RequestToCancelCloseRequest): void {
	let handler = new RequestToCancelCloseRequestHandler(event)
	handler.handle()
}
		
export function handleChargeFundingRate(event: ChargeFundingRate): void {
	let handler = new ChargeFundingRateHandler(event)
	handler.handle()
}
		
export function handleFillCloseRequest(event: FillCloseRequest): void {
	let handler = new FillCloseRequestHandler(event)
	handler.handle()
}
		
export function handleLiquidatePartyB(event: LiquidatePartyB): void {
	let handler = new LiquidatePartyBHandler(event)
	handler.handle()
}
		
export function handleForceCancelQuote(event: ForceCancelQuote): void {
	let handler = new ForceCancelQuoteHandler(event)
	handler.handle()
}
		
export function handleRequestToClosePosition(event: RequestToClosePosition): void {
	let handler = new RequestToClosePositionHandler(event)
	handler.handle()
}
		
export function handleExpireQuote(event: ExpireQuote): void {
	let handler = new ExpireQuoteHandler(event)
	handler.handle()
}
		
export function handleLockQuote(event: LockQuote): void {
	let handler = new LockQuoteHandler(event)
	handler.handle()
}
		
export function handleLiquidatePendingPositionsPartyA(event: LiquidatePendingPositionsPartyA): void {
	let handler = new LiquidatePendingPositionsPartyAHandler(event)
	handler.handle()
}
		
export function handleSendQuote(event: SendQuote): void {
	let handler = new SendQuoteHandler(event)
	handler.handle()
}
		
export function handleLiquidatePositionsPartyA(event: LiquidatePositionsPartyA): void {
	let handler = new LiquidatePositionsPartyAHandler(event)
	handler.handle()
}
		
export function handleForceClosePosition(event: ForceClosePosition): void {
	let handler = new ForceClosePositionHandler(event)
	handler.handle()
}
		
export function handleLiquidatePartyA(event: LiquidatePartyA): void {
	let handler = new LiquidatePartyAHandler(event)
	handler.handle()
}
		
export function handleLiquidatePositionsPartyB(event: LiquidatePositionsPartyB): void {
	let handler = new LiquidatePositionsPartyBHandler(event)
	handler.handle()
}
		
export function handleAcceptCancelRequest(event: AcceptCancelRequest): void {
	let handler = new AcceptCancelRequestHandler(event)
	handler.handle()
}
		