import { AcceptCancelCloseRequestHandler } from "./handlers/symmio/AcceptCancelCloseRequestHandler"
import {
	AcceptCancelCloseRequest,
	AcceptCancelRequest,
	AddSymbol,
	AllocateForPartyB,
	AllocatePartyA,
	DeallocateForPartyB,
	DeallocatePartyA,
	Deposit,
	DepositForPartyB,
	EmergencyClosePosition,
	ExpireQuote,
	FillCloseRequest,
	ForceCancelCloseRequest,
	ForceCancelQuote,
	ForceClosePosition,
	LiquidatePositionsPartyA,
	LiquidatePositionsPartyB,
	LockQuote,
	OpenPosition,
	RequestToCancelCloseRequest,
	RequestToCancelQuote,
	RequestToClosePosition,
	RoleGranted,
	RoleRevoked,
	SendQuote,
	SetCollateral,
	SetSymbolTradingFee,
	UnlockQuote,
	Withdraw,
} from "../generated/symmio_0_8_0/symmio_0_8_0"
import { AcceptCancelRequestHandler } from "./handlers/symmio/AcceptCancelRequestHandler"
import { AddSymbolHandler } from "./handlers/symmio/AddSymbolHandler"
import { AllocateForPartyBHandler } from "./handlers/symmio/AllocateForPartyBHandler"
import { AllocatePartyAHandler } from "./handlers/symmio/AllocatePartyAHandler"
import { DeallocateForPartyBHandler } from "./handlers/symmio/DeallocateForPartyBHandler"
import { DeallocatePartyAHandler } from "./handlers/symmio/DeallocatePartyAHandler"
import { DepositForPartyBHandler } from "./handlers/symmio/DepositForPartyBHandler"
import { DepositHandler } from "./handlers/symmio/DepositHandler"
import { EmergencyClosePositionHandler } from "./handlers/symmio/EmergencyClosePositionHandler"
import { ExpireQuoteHandler } from "./handlers/symmio/ExpireQuoteHandler"
import { FillCloseRequestHandler } from "./handlers/symmio/FillCloseRequestHandler"
import { ForceCancelCloseRequestHandler } from "./handlers/symmio/ForceCancelCloseRequestHandler"
import { ForceCancelQuoteHandler } from "./handlers/symmio/ForceCancelQuoteHandler"
import { ForceClosePositionHandler } from "./handlers/symmio/ForceClosePositionHandler"
import { LiquidatePositionsPartyAHandler } from "./handlers/symmio/LiquidatePositionsPartyAHandler"
import { LiquidatePositionsPartyBHandler } from "./handlers/symmio/LiquidatePositionsPartyBHandler"
import { LockQuoteHandler } from "./handlers/symmio/LockQuoteHandler"
import { OpenPositionHandler } from "./handlers/symmio/OpenPositionHandler"
import { RequestToCancelCloseRequestHandler } from "./handlers/symmio/RequestToCancelCloseRequestHandler"
import { RequestToCancelQuoteHandler } from "./handlers/symmio/RequestToCancelQuoteHandler"
import { RequestToClosePositionHandler } from "./handlers/symmio/RequestToClosePositionHandler"
import { RoleGrantedHandler } from "./handlers/symmio/RoleGrantedHandler"
import { RoleRevokedHandler } from "./handlers/symmio/RoleRevokedHandler"
import { SendQuoteHandler } from "./handlers/symmio/SendQuoteHandler"
import { SetCollateralHandler } from "./handlers/symmio/SetCollateralHandler"
import { UnlockQuoteHandler } from "./handlers/symmio/UnlockQuoteHandler"
import { Version } from "../common/BaseHandler"
import { WithdrawHandler } from "./handlers/symmio/WithdrawHandler"
import { SetSymbolTradingFeeHandler } from "./handlers/symmio/SetSymbolTradingFeeHandler"

export function handleForceCancelCloseRequest(event: ForceCancelCloseRequest): void {
	let handler = new ForceCancelCloseRequestHandler<ForceCancelCloseRequest>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleForceCancelQuote(event: ForceCancelQuote): void {
	let handler = new ForceCancelQuoteHandler<ForceCancelQuote>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleEmergencyClosePosition(event: EmergencyClosePosition): void {
	let handler = new EmergencyClosePositionHandler<EmergencyClosePosition>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleRequestToCancelQuote(event: RequestToCancelQuote): void {
	let handler = new RequestToCancelQuoteHandler<RequestToCancelQuote>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleAcceptCancelCloseRequest(event: AcceptCancelCloseRequest): void {
	let handler = new AcceptCancelCloseRequestHandler<AcceptCancelCloseRequest>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleRoleRevoked(event: RoleRevoked): void {
	let handler = new RoleRevokedHandler<RoleRevoked>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleWithdraw(event: Withdraw): void {
	let handler = new WithdrawHandler<Withdraw>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleRoleGranted(event: RoleGranted): void {
	let handler = new RoleGrantedHandler<RoleGranted>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleExpireQuote(event: ExpireQuote): void {
	let handler = new ExpireQuoteHandler<ExpireQuote>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleDepositForPartyB(event: DepositForPartyB): void {
	event.params.partyB
	let handler = new DepositForPartyBHandler<DepositForPartyB>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleAllocateForPartyB(event: AllocateForPartyB): void {
	let handler = new AllocateForPartyBHandler<AllocateForPartyB>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleSetSymbolTradingFee(event: SetSymbolTradingFee): void {
	let handler = new SetSymbolTradingFeeHandler<SetSymbolTradingFee>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleAddSymbol(event: AddSymbol): void {
	let handler = new AddSymbolHandler<AddSymbol>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleAcceptCancelRequest(event: AcceptCancelRequest): void {
	let handler = new AcceptCancelRequestHandler<AcceptCancelRequest>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleRequestToClosePosition(event: RequestToClosePosition): void {
	let handler = new RequestToClosePositionHandler<RequestToClosePosition>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleLockQuote(event: LockQuote): void {
	let handler = new LockQuoteHandler<LockQuote>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleDeposit(event: Deposit): void {
	let handler = new DepositHandler<Deposit>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleSetCollateral(event: SetCollateral): void {
	let handler = new SetCollateralHandler<SetCollateral>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleDeallocatePartyA(event: DeallocatePartyA): void {
	let handler = new DeallocatePartyAHandler<DeallocatePartyA>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleOpenPosition(event: OpenPosition): void {
	let handler = new OpenPositionHandler<OpenPosition>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleDeallocateForPartyB(event: DeallocateForPartyB): void {
	let handler = new DeallocateForPartyBHandler<DeallocateForPartyB>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleFillCloseRequest(event: FillCloseRequest): void {
	let handler = new FillCloseRequestHandler<FillCloseRequest>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleRequestToCancelCloseRequest(event: RequestToCancelCloseRequest): void {
	let handler = new RequestToCancelCloseRequestHandler<RequestToCancelCloseRequest>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleUnlockQuote(event: UnlockQuote): void {
	let handler = new UnlockQuoteHandler<UnlockQuote>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleForceClosePosition(event: ForceClosePosition): void {
	let handler = new ForceClosePositionHandler<ForceClosePosition>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleLiquidatePositionsPartyA(event: LiquidatePositionsPartyA): void {
	let handler = new LiquidatePositionsPartyAHandler<LiquidatePositionsPartyA>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleSendQuote(event: SendQuote): void {
	let handler = new SendQuoteHandler<SendQuote>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleAllocatePartyA(event: AllocatePartyA): void {
	let handler = new AllocatePartyAHandler<AllocatePartyA>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleLiquidatePositionsPartyB(event: LiquidatePositionsPartyB): void {
	let handler = new LiquidatePositionsPartyBHandler<LiquidatePositionsPartyB>()
	handler.handle(event, Version.v_0_8_0)
}
