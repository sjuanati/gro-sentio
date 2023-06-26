import { DECIMALS } from '../constants.js';
import { LogLevel } from '@sentio/sdk';
import {
    getGToken,
    getUsdValue,
    getTokenByIndex,
} from '../utils/tokens.js';
import {
    GRouterContext,
    LogDepositEvent,
    LogWithdrawalEvent,
} from '../types/eth/grouter.js';


// @dev: currently not used
export const LogDepositEventHandler = async (
    event: LogDepositEvent,
    ctx: GRouterContext
): Promise<void> => {
    const gToken = getGToken(event.args.tranche);
    const stableToken = getTokenByIndex(event.args.tokenIndex.asBigDecimal());
    const calcAmount = event.args.calcAmount.scaleDown(18).decimalPlaces(DECIMALS);
    const tokenAmount = getUsdValue(event.args.tokenAmount, event.args.tokenIndex.asBigDecimal());
    const trancheAmount = event.args.trancheAmount.scaleDown(18).decimalPlaces(DECIMALS);

    ctx.eventLogger.emit("LogDepositEvent", {
        distinctId: event.args.sender,
        severity: LogLevel.INFO,
        from: event.args.sender,
        tokenAmount: tokenAmount,
        tokenIndex: event.args.tokenIndex,
        tranche: gToken,
        trancheAmount: trancheAmount,
        calcAmount: calcAmount,
        message: `deposited ${tokenAmount} ${stableToken} from ${event.args.sender} | minted ${trancheAmount} ${gToken}`,
    });
}

// @dev: currently not used
export const LogWithdrawalEventHandler = async (
    event: LogWithdrawalEvent,
    ctx: GRouterContext
): Promise<void> => {
    const gToken = getGToken(event.args.tranche);
    const stableToken = getTokenByIndex(event.args.tokenIndex.asBigDecimal());
    const tokenAmount = event.args.tokenAmount.scaleDown(18).decimalPlaces(DECIMALS);
    const calcAmount = getUsdValue(event.args.calcAmount, event.args.tokenIndex.asBigDecimal());

    ctx.eventLogger.emit("LogWithdrawalEvent", {
        distinctId: event.args.sender,
        severity: LogLevel.INFO,
        from: event.args.sender,
        tokenAmount: tokenAmount,
        tokenIndex: event.args.tokenIndex,
        tranche: gToken,
        calcAmount: calcAmount,
        message: `withdrew ${calcAmount} ${stableToken} from ${event.args.sender} | burnt ${tokenAmount} ${gToken}`,
    });
}
