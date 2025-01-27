import { AcceptCancelCloseRequestHandler } from "./handlers/symmio/AcceptCancelCloseRequestHandler"
import {
	AcceptCancelCloseRequest,
	AcceptCancelRequest,
	ActiveEmergencyMode,
	AddSymbol,
	AllocateForPartyB,
	AllocatePartyA,
	AllocatePartyB,
	DeactiveEmergencyMode,
	DeallocateForPartyB,
	DeallocatePartyA,
	Deposit,
	EmergencyClosePosition,
	ExpireQuote,
	FillCloseRequest,
	ForceCancelCloseRequest,
	ForceCancelQuote,
	ForceClosePosition,
	FullyLiquidatedPartyB,
	LiquidatePartyA,
	LiquidatePartyB,
	LiquidatePositionsPartyA,
	LiquidatePositionsPartyB,
	LockQuote,
	OpenPosition,
	PauseAccounting,
	PauseGlobal,
	PauseLiquidation,
	PausePartyAActions,
	PausePartyBActions,
	RegisterPartyB,
	RequestToCancelCloseRequest,
	RequestToCancelQuote,
	RequestToClosePosition,
	RoleGranted,
	RoleRevoked,
	SendQuote,
	SetBalanceLimitPerUser,
	SetCollateral,
	SetDeallocateCooldown,
	SetFeeCollector,
	SetForceCancelCloseCooldown,
	SetForceCancelCooldown,
	SetForceCloseCooldown,
	SetForceCloseGapRatio,
	SetLiquidationTimeout,
	SetLiquidatorShare,
	SetMuonConfig,
	SetMuonIds,
	SetPartyBEmergencyStatus,
	SetPendingQuotesValidLength,
	SetSuspendedAddress,
	SetSymbolAcceptableValues,
	SetSymbolMaxSlippage,
	SetSymbolTradingFee,
	SetSymbolValidationState,
	TransferAllocation,
	UnlockQuote,
	UnpauseAccounting,
	UnpauseGlobal,
	UnpauseLiquidation,
	UnpausePartyAActions,
	UnpausePartyBActions,
	Withdraw,
} from "../generated/symmio_0_8_0/symmio_0_8_0"
import { AcceptCancelRequestHandler } from "./handlers/symmio/AcceptCancelRequestHandler"
import { ActiveEmergencyModeHandler } from "./handlers/symmio/ActiveEmergencyModeHandler"
import { AddSymbolHandler } from "./handlers/symmio/AddSymbolHandler"
import { AllocateForPartyBHandler } from "./handlers/symmio/AllocateForPartyBHandler"
import { AllocatePartyAHandler } from "./handlers/symmio/AllocatePartyAHandler"
import { AllocatePartyBHandler } from "./handlers/symmio/AllocatePartyBHandler"
import { DeactiveEmergencyModeHandler } from "./handlers/symmio/DeactiveEmergencyModeHandler"
import { DeallocateForPartyBHandler } from "./handlers/symmio/DeallocateForPartyBHandler"
import { DeallocatePartyAHandler } from "./handlers/symmio/DeallocatePartyAHandler"
import { DepositHandler } from "./handlers/symmio/DepositHandler"
import { EmergencyClosePositionHandler } from "./handlers/symmio/EmergencyClosePositionHandler"
import { ExpireQuoteHandler } from "./handlers/symmio/ExpireQuoteHandler"
import { FillCloseRequestHandler } from "./handlers/symmio/FillCloseRequestHandler"
import { ForceCancelCloseRequestHandler } from "./handlers/symmio/ForceCancelCloseRequestHandler"
import { ForceCancelQuoteHandler } from "./handlers/symmio/ForceCancelQuoteHandler"
import { ForceClosePositionHandler } from "./handlers/symmio/ForceClosePositionHandler"
import { FullyLiquidatedPartyBHandler } from "./handlers/symmio/FullyLiquidatedPartyBHandler"
import { LiquidatePartyAHandler } from "./handlers/symmio/LiquidatePartyAHandler"
import { LiquidatePartyBHandler } from "./handlers/symmio/LiquidatePartyBHandler"
import { LiquidatePositionsPartyAHandler } from "./handlers/symmio/LiquidatePositionsPartyAHandler"
import { LiquidatePositionsPartyBHandler } from "./handlers/symmio/LiquidatePositionsPartyBHandler"
import { LockQuoteHandler } from "./handlers/symmio/LockQuoteHandler"
import { OpenPositionHandler } from "./handlers/symmio/OpenPositionHandler"
import { PauseAccountingHandler } from "./handlers/symmio/PauseAccountingHandler"
import { PauseGlobalHandler } from "./handlers/symmio/PauseGlobalHandler"
import { PauseLiquidationHandler } from "./handlers/symmio/PauseLiquidationHandler"
import { PausePartyAActionsHandler } from "./handlers/symmio/PausePartyAActionsHandler"
import { PausePartyBActionsHandler } from "./handlers/symmio/PausePartyBActionsHandler"
import { RegisterPartyBHandler } from "./handlers/symmio/RegisterPartyBHandler"
import { RequestToCancelCloseRequestHandler } from "./handlers/symmio/RequestToCancelCloseRequestHandler"
import { RequestToCancelQuoteHandler } from "./handlers/symmio/RequestToCancelQuoteHandler"
import { RequestToClosePositionHandler } from "./handlers/symmio/RequestToClosePositionHandler"
import { RoleGrantedHandler } from "./handlers/symmio/RoleGrantedHandler"
import { RoleRevokedHandler } from "./handlers/symmio/RoleRevokedHandler"
import { SendQuoteHandler } from "./handlers/symmio/SendQuoteHandler"
import { SetBalanceLimitPerUserHandler } from "./handlers/symmio/SetBalanceLimitPerUserHandler"
import { SetCollateralHandler } from "./handlers/symmio/SetCollateralHandler"
import { SetDeallocateCooldownHandler } from "./handlers/symmio/SetDeallocateCooldownHandler"
import { SetFeeCollectorHandler } from "./handlers/symmio/SetFeeCollectorHandler"
import { SetForceCancelCloseCooldownHandler } from "./handlers/symmio/SetForceCancelCloseCooldownHandler"
import { SetForceCancelCooldownHandler } from "./handlers/symmio/SetForceCancelCooldownHandler"
import { SetForceCloseCooldownHandler } from "./handlers/symmio/SetForceCloseCooldownHandler"
import { SetForceCloseGapRatioHandler } from "./handlers/symmio/SetForceCloseGapRatioHandler"
import { SetLiquidationTimeoutHandler } from "./handlers/symmio/SetLiquidationTimeoutHandler"
import { SetLiquidatorShareHandler } from "./handlers/symmio/SetLiquidatorShareHandler"
import { SetMuonConfigHandler } from "./handlers/symmio/SetMuonConfigHandler"
import { SetMuonIdsHandler } from "./handlers/symmio/SetMuonIdsHandler"
import { SetPartyBEmergencyStatusHandler } from "./handlers/symmio/SetPartyBEmergencyStatusHandler"
import { SetPendingQuotesValidLengthHandler } from "./handlers/symmio/SetPendingQuotesValidLengthHandler"
import { SetSuspendedAddressHandler } from "./handlers/symmio/SetSuspendedAddressHandler"
import { SetSymbolAcceptableValuesHandler } from "./handlers/symmio/SetSymbolAcceptableValuesHandler"
import { SetSymbolMaxSlippageHandler } from "./handlers/symmio/SetSymbolMaxSlippageHandler"
import { SetSymbolTradingFeeHandler } from "./handlers/symmio/SetSymbolTradingFeeHandler"
import { SetSymbolValidationStateHandler } from "./handlers/symmio/SetSymbolValidationStateHandler"
import { TransferAllocationHandler } from "./handlers/symmio/TransferAllocationHandler"
import { UnlockQuoteHandler } from "./handlers/symmio/UnlockQuoteHandler"
import { UnpauseAccountingHandler } from "./handlers/symmio/UnpauseAccountingHandler"
import { UnpauseGlobalHandler } from "./handlers/symmio/UnpauseGlobalHandler"
import { UnpauseLiquidationHandler } from "./handlers/symmio/UnpauseLiquidationHandler"
import { UnpausePartyAActionsHandler } from "./handlers/symmio/UnpausePartyAActionsHandler"
import { UnpausePartyBActionsHandler } from "./handlers/symmio/UnpausePartyBActionsHandler"
import { Version } from "../common/BaseHandler"
import { WithdrawHandler } from "./handlers/symmio/WithdrawHandler"

export function handleAcceptCancelCloseRequest(event: AcceptCancelCloseRequest): void {
	let handler = new AcceptCancelCloseRequestHandler<AcceptCancelCloseRequest>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleAcceptCancelRequest(event: AcceptCancelRequest): void {
	let handler = new AcceptCancelRequestHandler<AcceptCancelRequest>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleActiveEmergencyMode(event: ActiveEmergencyMode): void {
	let handler = new ActiveEmergencyModeHandler<ActiveEmergencyMode>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleAddSymbol(event: AddSymbol): void {
	let handler = new AddSymbolHandler<AddSymbol>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleAllocateForPartyB(event: AllocateForPartyB): void {
	let handler = new AllocateForPartyBHandler<AllocateForPartyB>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleAllocatePartyA(event: AllocatePartyA): void {
	let handler = new AllocatePartyAHandler<AllocatePartyA>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleAllocatePartyB(event: AllocatePartyB): void {
	let handler = new AllocatePartyBHandler<AllocatePartyB>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleDeactiveEmergencyMode(event: DeactiveEmergencyMode): void {
	let handler = new DeactiveEmergencyModeHandler<DeactiveEmergencyMode>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleDeallocateForPartyB(event: DeallocateForPartyB): void {
	let handler = new DeallocateForPartyBHandler<DeallocateForPartyB>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleDeallocatePartyA(event: DeallocatePartyA): void {
	let handler = new DeallocatePartyAHandler<DeallocatePartyA>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleDeposit(event: Deposit): void {
	let handler = new DepositHandler<Deposit>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleEmergencyClosePosition(event: EmergencyClosePosition): void {
	let handler = new EmergencyClosePositionHandler<EmergencyClosePosition>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleExpireQuote(event: ExpireQuote): void {
	let handler = new ExpireQuoteHandler<ExpireQuote>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleFillCloseRequest(event: FillCloseRequest): void {
	let handler = new FillCloseRequestHandler<FillCloseRequest>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleForceCancelCloseRequest(event: ForceCancelCloseRequest): void {
	let handler = new ForceCancelCloseRequestHandler<ForceCancelCloseRequest>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleForceCancelQuote(event: ForceCancelQuote): void {
	let handler = new ForceCancelQuoteHandler<ForceCancelQuote>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleForceClosePosition(event: ForceClosePosition): void {
	let handler = new ForceClosePositionHandler<ForceClosePosition>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleLiquidatePartyA(event: LiquidatePartyA): void {
	let handler = new LiquidatePartyAHandler<LiquidatePartyA>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleLiquidatePartyB(event: LiquidatePartyB): void {
	let handler = new LiquidatePartyBHandler<LiquidatePartyB>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleLiquidatePositionsPartyA(event: LiquidatePositionsPartyA): void {
	let handler = new LiquidatePositionsPartyAHandler<LiquidatePositionsPartyA>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleLiquidatePositionsPartyB(event: LiquidatePositionsPartyB): void {
	let handler = new LiquidatePositionsPartyBHandler<LiquidatePositionsPartyB>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleLockQuote(event: LockQuote): void {
	let handler = new LockQuoteHandler<LockQuote>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleOpenPosition(event: OpenPosition): void {
	let handler = new OpenPositionHandler<OpenPosition>()
	handler.handle(event, Version.v_0_8_0)
}

export function handlePauseAccounting(event: PauseAccounting): void {
	let handler = new PauseAccountingHandler<PauseAccounting>()
	handler.handle(event, Version.v_0_8_0)
}

export function handlePauseGlobal(event: PauseGlobal): void {
	let handler = new PauseGlobalHandler<PauseGlobal>()
	handler.handle(event, Version.v_0_8_0)
}

export function handlePauseLiquidation(event: PauseLiquidation): void {
	let handler = new PauseLiquidationHandler<PauseLiquidation>()
	handler.handle(event, Version.v_0_8_0)
}

export function handlePausePartyAActions(event: PausePartyAActions): void {
	let handler = new PausePartyAActionsHandler<PausePartyAActions>()
	handler.handle(event, Version.v_0_8_0)
}

export function handlePausePartyBActions(event: PausePartyBActions): void {
	let handler = new PausePartyBActionsHandler<PausePartyBActions>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleRegisterPartyB(event: RegisterPartyB): void {
	let handler = new RegisterPartyBHandler<RegisterPartyB>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleRequestToCancelCloseRequest(event: RequestToCancelCloseRequest): void {
	let handler = new RequestToCancelCloseRequestHandler<RequestToCancelCloseRequest>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleRequestToCancelQuote(event: RequestToCancelQuote): void {
	let handler = new RequestToCancelQuoteHandler<RequestToCancelQuote>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleRequestToClosePosition(event: RequestToClosePosition): void {
	let handler = new RequestToClosePositionHandler<RequestToClosePosition>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleRoleGranted(event: RoleGranted): void {
	let handler = new RoleGrantedHandler<RoleGranted>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleRoleRevoked(event: RoleRevoked): void {
	let handler = new RoleRevokedHandler<RoleRevoked>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleSendQuote(event: SendQuote): void {
	let handler = new SendQuoteHandler<SendQuote>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleSetBalanceLimitPerUser(event: SetBalanceLimitPerUser): void {
	let handler = new SetBalanceLimitPerUserHandler<SetBalanceLimitPerUser>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleSetCollateral(event: SetCollateral): void {
	let handler = new SetCollateralHandler<SetCollateral>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleSetDeallocateCooldown(event: SetDeallocateCooldown): void {
	let handler = new SetDeallocateCooldownHandler<SetDeallocateCooldown>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleSetFeeCollector(event: SetFeeCollector): void {
	let handler = new SetFeeCollectorHandler<SetFeeCollector>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleSetForceCancelCloseCooldown(event: SetForceCancelCloseCooldown): void {
	let handler = new SetForceCancelCloseCooldownHandler<SetForceCancelCloseCooldown>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleSetForceCancelCooldown(event: SetForceCancelCooldown): void {
	let handler = new SetForceCancelCooldownHandler<SetForceCancelCooldown>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleSetForceCloseCooldown(event: SetForceCloseCooldown): void {
	let handler = new SetForceCloseCooldownHandler<SetForceCloseCooldown>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleSetForceCloseGapRatio(event: SetForceCloseGapRatio): void {
	let handler = new SetForceCloseGapRatioHandler<SetForceCloseGapRatio>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleSetLiquidationTimeout(event: SetLiquidationTimeout): void {
	let handler = new SetLiquidationTimeoutHandler<SetLiquidationTimeout>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleSetLiquidatorShare(event: SetLiquidatorShare): void {
	let handler = new SetLiquidatorShareHandler<SetLiquidatorShare>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleSetMuonConfig(event: SetMuonConfig): void {
	let handler = new SetMuonConfigHandler<SetMuonConfig>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleSetMuonIds(event: SetMuonIds): void {
	let handler = new SetMuonIdsHandler<SetMuonIds>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleSetPartyBEmergencyStatus(event: SetPartyBEmergencyStatus): void {
	let handler = new SetPartyBEmergencyStatusHandler<SetPartyBEmergencyStatus>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleSetPendingQuotesValidLength(event: SetPendingQuotesValidLength): void {
	let handler = new SetPendingQuotesValidLengthHandler<SetPendingQuotesValidLength>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleSetSuspendedAddress(event: SetSuspendedAddress): void {
	let handler = new SetSuspendedAddressHandler<SetSuspendedAddress>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleSetSymbolAcceptableValues(event: SetSymbolAcceptableValues): void {
	let handler = new SetSymbolAcceptableValuesHandler<SetSymbolAcceptableValues>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleSetSymbolMaxSlippage(event: SetSymbolMaxSlippage): void {
	let handler = new SetSymbolMaxSlippageHandler<SetSymbolMaxSlippage>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleSetSymbolTradingFee(event: SetSymbolTradingFee): void {
	let handler = new SetSymbolTradingFeeHandler<SetSymbolTradingFee>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleSetSymbolValidationState(event: SetSymbolValidationState): void {
	let handler = new SetSymbolValidationStateHandler<SetSymbolValidationState>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleTransferAllocation(event: TransferAllocation): void {
	let handler = new TransferAllocationHandler<TransferAllocation>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleUnlockQuote(event: UnlockQuote): void {
	let handler = new UnlockQuoteHandler<UnlockQuote>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleUnpauseAccounting(event: UnpauseAccounting): void {
	let handler = new UnpauseAccountingHandler<UnpauseAccounting>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleUnpauseGlobal(event: UnpauseGlobal): void {
	let handler = new UnpauseGlobalHandler<UnpauseGlobal>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleUnpauseLiquidation(event: UnpauseLiquidation): void {
	let handler = new UnpauseLiquidationHandler<UnpauseLiquidation>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleUnpausePartyAActions(event: UnpausePartyAActions): void {
	let handler = new UnpausePartyAActionsHandler<UnpausePartyAActions>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleUnpausePartyBActions(event: UnpausePartyBActions): void {
	let handler = new UnpausePartyBActionsHandler<UnpausePartyBActions>()
	handler.handle(event, Version.v_0_8_0)
}

export function handleWithdraw(event: Withdraw): void {
	let handler = new WithdrawHandler<Withdraw>()
	handler.handle(event, Version.v_0_8_0)
}
