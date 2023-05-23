import {
    Gauge,
    Counter,
} from '@sentio/sdk';
import {
    getGToken,
    getUsdValue,
    getTokenByIndex,
} from '../utils/tokens.js';
import {
    GRouterContext,
    GRouterProcessor,
    LogDepositEvent,
    LogWithdrawalEvent,
} from '../types/eth/grouter.js';


export const gRouterDepositlHandler = async (
    event: LogDepositEvent,
    ctx: GRouterContext
): Promise<void> => {
    const tokenAmount = event.args.tokenAmount.scaleDown(18);
    const stablecoin = getTokenByIndex(event.args.tokenIndex.asBigDecimal());
    const calcAmount = getUsdValue(event.args.calcAmount, event.args.tokenIndex.asBigDecimal());
    ctx.eventLogger.emit("LogDepositEvent", {
        distinctId: event.args.sender,
        from: event.args.sender,
        tokenAmount: tokenAmount,
        tokenIndex: event.args.tokenIndex,
        tranche: getGToken(event.args.tranche),
        trancheAmount: event.args.trancheAmount.scaleDown(18),
        calcAmount: calcAmount,
        message: `withdrew ${tokenAmount} ${stablecoin} from ${event.args.sender}`,
    })
}

export const gRouterWithdrawalHandler = async (
    event: LogWithdrawalEvent,
    ctx: GRouterContext
): Promise<void> => {
    const tokenAmount = event.args.tokenAmount.scaleDown(18);
    const stablecoin = getTokenByIndex(event.args.tokenIndex.asBigDecimal());
    const calcAmount = getUsdValue(event.args.calcAmount, event.args.tokenIndex.asBigDecimal());
    ctx.eventLogger.emit("LogWithdrawalEvent", {
        distinctId: event.args.sender,
        from: event.args.sender,
        tokenAmount: tokenAmount,
        tokenIndex: event.args.tokenIndex,
        tranche: getGToken(event.args.tranche),
        calcAmount: calcAmount,
        message: `withdrew ${tokenAmount} ${stablecoin} from ${event.args.sender}`,
    })
}
