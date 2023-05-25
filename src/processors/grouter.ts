import { DECIMALS } from '../constants.js';
import {
    Gauge,
    Counter,
    LogLevel,
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
import { Token } from '../types.js';

// const gvtAcc = Counter.register('gvt_acc');
// const pwrdAcc = Counter.register('pwrd_acc');

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

    // if (gToken === Token.GVT) {
    //     gvtAcc.add(ctx, trancheAmount);
    // }
    // if (gToken === Token.PWRD) {
    //     pwrdAcc.add(ctx, trancheAmount);
    // }
}

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

    // if (gToken === Token.GVT) {
    //     gvtAcc.sub(ctx, tokenAmount);
    // }
    // if (gToken === Token.PWRD) {
    //     pwrdAcc.sub(ctx, tokenAmount);
    // }
}




// WETH9Processor.bind({ address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', startBlock: 13217349 }).onBlockInterval(
//     async function (_, ctx: WETH9Context) {
//       const balance = await ctx.contract.balanceOf(TOKEN_BRIDGE_ADDRESS)
//       ctx.meter.Gauge('balance').record(balance)
//     }
//   )