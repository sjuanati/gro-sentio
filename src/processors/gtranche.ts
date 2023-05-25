import { DECIMALS } from '../constants.js';
import { Token } from '../types.js';
import {
    Gauge,
    Counter,
    LogLevel,
    BigDecimal,
} from '@sentio/sdk';
import {
    getGToken,
    getUsdValue,
    getTokenByIndex,
} from '../utils/tokens.js';
import {
    GTrancheContext,
    LogNewDepositEvent,
    LogNewWithdrawalEvent,
    LogNewTrancheBalanceEvent,
} from '../types/eth/gtranche.js';

const gvtAcc = Counter.register('gvt_tvl_acc');
const pwrdAcc = Counter.register('pwrd_tvl_acc');
const totalAcc = Counter.register('total_tvl_acc');
const utilRatio = Counter.register('util_ratio');

let preGvtAcc = BigDecimal(0);
let prePwrdAcc = BigDecimal(0);
let preTotalAcc = BigDecimal(0);
let preUtilRatio = BigDecimal(0);

export const LogNewTrancheBalanceHandler = async (
    event: LogNewTrancheBalanceEvent,
    ctx: GTrancheContext
): Promise<void> => {
    // todo: what if balances is empty array
    const gvt = event.args.balances[0].scaleDown(18).decimalPlaces(DECIMALS);
    const pwrd = event.args.balances[1].scaleDown(18).decimalPlaces(DECIMALS);
    const util = event.args._utilisation.scaleDown(2);

    ctx.eventLogger.emit('LogNewTrancheBalanceEvent', {
        gvtTvl: gvt,
        pwrdTvl: pwrd,
        utilRatio: util,
    });

    gvtAcc.sub(ctx, preGvtAcc);
    gvtAcc.add(ctx, gvt);
    preGvtAcc = gvt;

    pwrdAcc.sub(ctx, prePwrdAcc);
    pwrdAcc.add(ctx, pwrd);
    prePwrdAcc = pwrd;

    totalAcc.sub(ctx, preTotalAcc);
    preTotalAcc = gvt.plus(pwrd);
    totalAcc.add(ctx, preTotalAcc);

    utilRatio.sub(ctx, preUtilRatio);
    utilRatio.add(ctx, util);
    preUtilRatio = util;

}

// export const blockHandler = async (_:any, ctx: GTrancheContext) => {
//     const pnlDistribution = (await ctx.contract.pnlDistribution());
//     const gvt = pnlDistribution[0][0].scaleDown(18).decimalPlaces(DECIMALS);
//     const pwrd = pnlDistribution[0][1].scaleDown(18).decimalPlaces(DECIMALS);
//     ctx.meter.Gauge("gvt_tvl").record(gvt);
//     ctx.meter.Gauge("pwrd_tvl").record(pwrd);
//   }


// const gvtAcc = Counter.register('gvtAcc');
// const pwrdAcc = Counter.register('pwrdAcc');

export const LogNewDepositEventlHandler = async (
    event: LogNewDepositEvent,
    ctx: GTrancheContext
): Promise<void> => {
    const gToken = getGToken(event.args.tranche);
    const amount = event.args.amount.scaleDown(18).decimalPlaces(DECIMALS);

    ctx.eventLogger.emit("LogDepositEvent", {
        distinctId: event.args.sender,
        severity: LogLevel.INFO,
        from: event.args.sender,
        tranche: gToken,
        amount: amount,
        message: ` minted ${amount} ${gToken} to ${event.args.sender} |`,
    });

    // if (gToken === Token.GVT) {
    //     gvtAcc.add(ctx, amount);
    // }
    // if (gToken === Token.PWRD) {
    //     pwrdAcc.add(ctx, amount);
    // }
}

export const LogNewWithdrawalEventHandler = async (
    event: LogNewWithdrawalEvent,
    ctx: GTrancheContext
): Promise<void> => {
    const gToken = getGToken(event.args.tranche);
    const amount = event.args.amount.scaleDown(18).decimalPlaces(DECIMALS);

    ctx.eventLogger.emit("LogNewTrancheBalance", {
        distinctId: event.args.sender,
        severity: LogLevel.INFO,
        from: event.args.sender,
        tranche: gToken,
        amount: amount,
        message: `burnt ${amount} ${gToken} from ${event.args.sender} | `,
    });

    // if (gToken === Token.GVT) {
    //     gvtAcc.sub(ctx, amount);
    // }
    // if (gToken === Token.PWRD) {
    //     pwrdAcc.sub(ctx, amount);
    // }
}
