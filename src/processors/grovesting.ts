import {
    Counter,
    LogLevel,
    BigDecimal,
    Gauge,
} from '@sentio/sdk';
import {
    GROVestingV2Context,
    LogVestEvent,
    LogExitEvent,
    LogExtendEvent,
} from '../types/eth/grovestingv2.js';


const gGlobalStartDate = Counter.register('globalStartDate');
const gTotalLockedAmount = Counter.register('totalLockedAmount');
const gTotalGroove = Counter.register('totalGroove');
let preGlobalStartDate = BigDecimal(0);
let preTotalLockedAmount = BigDecimal(0);
let preTotalGroove = BigDecimal(0);

const parseNum = (value: BigInt) => value.scaleDown(18).decimalPlaces(2);

const getContractData = async (ctx: GROVestingV2Context) => {
    const [globalStartDate, totalGroove] = await Promise.all([
        ctx.contract.globalStartTime(),
        ctx.contract.totalGroove(),
    ]);
    return [
        globalStartDate.asBigDecimal(),
        parseNum(totalGroove),
    ];
}

export const blockHandler = async (_:any, ctx: GROVestingV2Context) => {
    const [totalLockedAmount, totalGroove, globalStartDate] = await Promise.all([
        ctx.contract.totalLockedAmount(),
        ctx.contract.totalGroove(),
        ctx.contract.globalStartTime(),
    ]);
    ctx.meter.Gauge("totalLockedAmount2").record(parseNum(totalLockedAmount));
    ctx.meter.Gauge("totalGroove2").record(parseNum(totalGroove));
    ctx.meter.Gauge("globalStartDate2").record(globalStartDate);
}

export const LogVestEventlHandler = async (
    event: LogVestEvent,
    ctx: GROVestingV2Context
): Promise<void> => {
    const [globalStartDate, totalGroove] = await getContractData(ctx);
    const totalLockedAmount = parseNum(event.args.totalLockedAmount);

    ctx.eventLogger.emit("LogVestEvent", {
        distinctId: event.args.user,
        severity: LogLevel.INFO,
        amount: parseNum(event.args.amount),
        startTime: event.args.vesting[1],
        globalStartDate: globalStartDate,
        totalLockedAmount: totalLockedAmount,
        totalGroove: totalGroove,
    });

    gGlobalStartDate.sub(ctx, preGlobalStartDate);
    gGlobalStartDate.add(ctx, globalStartDate);
    preGlobalStartDate = globalStartDate;

    gTotalLockedAmount.sub(ctx, preTotalLockedAmount);
    gTotalLockedAmount.add(ctx, totalLockedAmount);
    preTotalLockedAmount = totalLockedAmount;

    gTotalGroove.sub(ctx, preTotalGroove);
    gTotalGroove.add(ctx, totalGroove);
    preTotalGroove = totalGroove;
}

export const LogExitEventlHandler = async (
    event: LogExitEvent,
    ctx: GROVestingV2Context
): Promise<void> => {
    const [globalStartDate, totalGroove] = await getContractData(ctx);
    const totalLockedAmount = parseNum(event.args.totalLockedAmount);

    ctx.eventLogger.emit("LogExitEvent", {
        distinctId: event.args.user,
        severity: LogLevel.INFO,
        amount: parseNum(event.args.amount),
        startTime: 0,
        globalStartDate: globalStartDate,
        totalLockedAmount: totalLockedAmount,
        totalGroove: totalGroove,
    });

    gGlobalStartDate.sub(ctx, preGlobalStartDate);
    gGlobalStartDate.add(ctx, globalStartDate);
    preGlobalStartDate = globalStartDate;

    gTotalLockedAmount.sub(ctx, preTotalLockedAmount);
    gTotalLockedAmount.add(ctx, totalLockedAmount);
    preTotalLockedAmount = totalLockedAmount;

    gTotalGroove.sub(ctx, preTotalGroove);
    gTotalGroove.add(ctx, totalLockedAmount);
    preTotalGroove = totalLockedAmount;

}

export const LogExtendEventlHandler = async (
    event: LogExtendEvent,
    ctx: GROVestingV2Context
): Promise<void> => {
    const [globalStartDate, totalGroove] = await getContractData(ctx);
    const totalLockedAmount = parseNum((await ctx.contract.totalLockedAmount()));
    ctx.eventLogger.emit("LogExtendEvent", {
        distinctId: event.args.user,
        severity: LogLevel.INFO,
        amount: 0,
        startTime: 0,
        globalStartDate: globalStartDate,
        totalLockedAmount: totalLockedAmount,
        totalGroove: totalGroove,
    });

    gGlobalStartDate.sub(ctx, preGlobalStartDate);
    gGlobalStartDate.add(ctx, globalStartDate);
    preGlobalStartDate = globalStartDate;

    gTotalLockedAmount.sub(ctx, preTotalLockedAmount);
    gTotalLockedAmount.add(ctx, totalLockedAmount);
    preTotalLockedAmount = totalLockedAmount;

    gTotalGroove.sub(ctx, preTotalGroove);
    gTotalGroove.add(ctx, totalLockedAmount);
    preTotalGroove = totalLockedAmount;
}


