import { AcceptCancelCloseRequestHandler } from "./handlers/symmio/AcceptCancelCloseRequestHandler"
import {
	AcceptCancelCloseRequest,
	AcceptCancelRequest,
	AddBridge,
	AddSymbol,
	AllocateForPartyB,
	AllocatePartyA,
	BalanceChangePartyA,
	BalanceChangePartyB,
	ChargeFundingRate,
	DeallocateForPartyB,
	DeallocatePartyA,
	Deposit,
	EmergencyClosePosition,
	ExpireQuoteOpen,
	ExpireQuoteClose,
	FillCloseRequest,
	ForceCancelCloseRequest,
	ForceCancelQuote,
	ForceClosePosition,
	LiquidatePartyA,
	LiquidatePartyB,
	LiquidatePendingPositionsPartyA,
	LiquidatePositionsPartyA,
	LiquidatePositionsPartyB,
	LockQuote,
	OpenPosition,
	RegisterPartyB,
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
} from "../generated/symmio_0_8_4/symmio_0_8_4"
import { AcceptCancelRequestHandler } from "./handlers/symmio/AcceptCancelRequestHandler"
import { AddBridgeHandler } from "./handlers/symmio/AddBridgeHandler"
import { AddSymbolHandler } from "./handlers/symmio/AddSymbolHandler"
import { AllocateForPartyBHandler } from "./handlers/symmio/AllocateForPartyBHandler"
import { AllocatePartyAHandler } from "./handlers/symmio/AllocatePartyAHandler"
import { BalanceChangePartyAHandler } from "./handlers/symmio/BalanceChangePartyAHandler"
import { BalanceChangePartyBHandler } from "./handlers/symmio/BalanceChangePartyBHandler"
import { ChargeFundingRateHandler } from "./handlers/symmio/ChargeFundingRateHandler"
import { DeallocateForPartyBHandler } from "./handlers/symmio/DeallocateForPartyBHandler"
import { DeallocatePartyAHandler } from "./handlers/symmio/DeallocatePartyAHandler"
import { DepositHandler } from "./handlers/symmio/DepositHandler"
import { EmergencyClosePositionHandler } from "./handlers/symmio/EmergencyClosePositionHandler"
import { ExpireQuoteHandler } from "./handlers/symmio/ExpireQuoteHandler"
import { FillCloseRequestHandler } from "./handlers/symmio/FillCloseRequestHandler"
import { ForceCancelCloseRequestHandler } from "./handlers/symmio/ForceCancelCloseRequestHandler"
import { ForceCancelQuoteHandler } from "./handlers/symmio/ForceCancelQuoteHandler"
import { ForceClosePositionHandler } from "./handlers/symmio/ForceClosePositionHandler"
import { LiquidatePartyAHandler } from "./handlers/symmio/LiquidatePartyAHandler"
import { LiquidatePartyBHandler } from "./handlers/symmio/LiquidatePartyBHandler"
import { LiquidatePendingPositionsPartyAHandler } from "./handlers/symmio/LiquidatePendingPositionsPartyAHandler"
import { LiquidatePositionsPartyAHandler } from "./handlers/symmio/LiquidatePositionsPartyAHandler"
import { LiquidatePositionsPartyBHandler } from "./handlers/symmio/LiquidatePositionsPartyBHandler"
import { LockQuoteHandler } from "./handlers/symmio/LockQuoteHandler"
import { OpenPositionHandler } from "./handlers/symmio/OpenPositionHandler"
import { RegisterPartyBHandler } from "./handlers/symmio/RegisterPartyBHandler"
import { RequestToCancelCloseRequestHandler } from "./handlers/symmio/RequestToCancelCloseRequestHandler"
import { RequestToCancelQuoteHandler } from "./handlers/symmio/RequestToCancelQuoteHandler"
import { RequestToClosePositionHandler } from "./handlers/symmio/RequestToClosePositionHandler"
import { RoleGrantedHandler } from "./handlers/symmio/RoleGrantedHandler"
import { RoleRevokedHandler } from "./handlers/symmio/RoleRevokedHandler"
import { SendQuoteHandler } from "./handlers/symmio/SendQuoteHandler"
import { SetCollateralHandler } from "./handlers/symmio/SetCollateralHandler"
import { SetSymbolTradingFeeHandler } from "./handlers/symmio/SetSymbolTradingFeeHandler"
import { UnlockQuoteHandler } from "./handlers/symmio/UnlockQuoteHandler"
import { Version } from "../common/BaseHandler"
import { WithdrawHandler } from "./handlers/symmio/WithdrawHandler"

export function handleAcceptCancelCloseRequest(event: AcceptCancelCloseRequest): void {
	let handler = new AcceptCancelCloseRequestHandler<AcceptCancelCloseRequest>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleAcceptCancelRequest(event: AcceptCancelRequest): void {
	let handler = new AcceptCancelRequestHandler<AcceptCancelRequest>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleAddBridge(event: AddBridge): void {
	let handler = new AddBridgeHandler<AddBridge>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleAddSymbol(event: AddSymbol): void {
	let handler = new AddSymbolHandler<AddSymbol>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleAllocateForPartyB(event: AllocateForPartyB): void {
	let handler = new AllocateForPartyBHandler<AllocateForPartyB>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleAllocatePartyA(event: AllocatePartyA): void {
	let handler = new AllocatePartyAHandler<AllocatePartyA>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleBalanceChangePartyA(event: BalanceChangePartyA): void {
	let handler = new BalanceChangePartyAHandler<BalanceChangePartyA>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleBalanceChangePartyB(event: BalanceChangePartyB): void {
	let handler = new BalanceChangePartyBHandler<BalanceChangePartyB>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleChargeFundingRate(event: ChargeFundingRate): void {
	let handler = new ChargeFundingRateHandler<ChargeFundingRate>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleDeallocateForPartyB(event: DeallocateForPartyB): void {
	let handler = new DeallocateForPartyBHandler<DeallocateForPartyB>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleDeallocatePartyA(event: DeallocatePartyA): void {
	let handler = new DeallocatePartyAHandler<DeallocatePartyA>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleDeposit(event: Deposit): void {
	let handler = new DepositHandler<Deposit>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleEmergencyClosePosition(event: EmergencyClosePosition): void {
	let handler = new EmergencyClosePositionHandler<EmergencyClosePosition>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleExpireQuoteOpen(event: ExpireQuoteOpen): void {
	let handler = new ExpireQuoteHandler<ExpireQuoteOpen>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleExpireQuoteClose(event: ExpireQuoteClose): void {
	let handler = new ExpireQuoteHandler<ExpireQuoteClose>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleFillCloseRequest(event: FillCloseRequest): void {
	let handler = new FillCloseRequestHandler<FillCloseRequest>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleForceCancelCloseRequest(event: ForceCancelCloseRequest): void {
	let handler = new ForceCancelCloseRequestHandler<ForceCancelCloseRequest>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleForceCancelQuote(event: ForceCancelQuote): void {
	let handler = new ForceCancelQuoteHandler<ForceCancelQuote>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleForceClosePosition(event: ForceClosePosition): void {
	let handler = new ForceClosePositionHandler<ForceClosePosition>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleLiquidatePartyA(event: LiquidatePartyA): void {
	let handler = new LiquidatePartyAHandler<LiquidatePartyA>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleLiquidatePartyB(event: LiquidatePartyB): void {
	let handler = new LiquidatePartyBHandler<LiquidatePartyB>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleLiquidatePendingPositionsPartyA(event: LiquidatePendingPositionsPartyA): void {
	let handler = new LiquidatePendingPositionsPartyAHandler<LiquidatePendingPositionsPartyA>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleLiquidatePositionsPartyA(event: LiquidatePositionsPartyA): void {
	let handler = new LiquidatePositionsPartyAHandler<LiquidatePositionsPartyA>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleLiquidatePositionsPartyB(event: LiquidatePositionsPartyB): void {
	let handler = new LiquidatePositionsPartyBHandler<LiquidatePositionsPartyB>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleLockQuote(event: LockQuote): void {
	let handler = new LockQuoteHandler<LockQuote>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleOpenPosition(event: OpenPosition): void {
	let handler = new OpenPositionHandler<OpenPosition>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleRegisterPartyB(event: RegisterPartyB): void {
	let handler = new RegisterPartyBHandler<RegisterPartyB>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleRequestToCancelCloseRequest(event: RequestToCancelCloseRequest): void {
	let handler = new RequestToCancelCloseRequestHandler<RequestToCancelCloseRequest>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleRequestToCancelQuote(event: RequestToCancelQuote): void {
	let handler = new RequestToCancelQuoteHandler<RequestToCancelQuote>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleRequestToClosePosition(event: RequestToClosePosition): void {
	let handler = new RequestToClosePositionHandler<RequestToClosePosition>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleRoleGranted(event: RoleGranted): void {
	let handler = new RoleGrantedHandler<RoleGranted>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleRoleRevoked(event: RoleRevoked): void {
	let handler = new RoleRevokedHandler<RoleRevoked>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleSendQuote(event: SendQuote): void {
	let handler = new SendQuoteHandler<SendQuote>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleSetCollateral(event: SetCollateral): void {
	let handler = new SetCollateralHandler<SetCollateral>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleSetSymbolTradingFee(event: SetSymbolTradingFee): void {
	let handler = new SetSymbolTradingFeeHandler<SetSymbolTradingFee>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleUnlockQuote(event: UnlockQuote): void {
	let handler = new UnlockQuoteHandler<UnlockQuote>()
	handler.handle(event, Version.v_0_8_4)
}

export function handleWithdraw(event: Withdraw): void {
	let handler = new WithdrawHandler<Withdraw>()
	handler.handle(event, Version.v_0_8_4)
}
