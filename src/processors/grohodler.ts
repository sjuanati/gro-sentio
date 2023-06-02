import {
    Counter,
    LogLevel,
    BigDecimal,
    Gauge,
} from '@sentio/sdk';
import {
    GROHodlerV2Context,
    LogBonusAddedEvent,
    LogBonusClaimedEvent
} from '../types/eth/grohodlerv2.js';

const gTotalBonus2 = Gauge.register('totalBonus2');
const gTotalBonus = Counter.register('totalBonus');
let preTotalBonus = BigDecimal(0);

const parseNum = (value: BigInt) => value.scaleDown(18).decimalPlaces(2);

const getContractData = async (ctx: GROHodlerV2Context) => {
    const totalBonus = await ctx.contract.totalBonus();
    return parseNum(totalBonus);
}

export const LogBonusAddedEventHandler = async (
    event: LogBonusAddedEvent,
    ctx: GROHodlerV2Context
): Promise<void> => {
    const totalBonus = await getContractData(ctx);

    ctx.eventLogger.emit("LogBonusAddedEvent", {
        distinctId: '',
        severity: LogLevel.INFO,
        amount: parseNum(event.args.amount),
        totalBonus: totalBonus,
        message: `preTotalBonus ${preTotalBonus} totalBonus ${totalBonus}`,
    });
    gTotalBonus.sub(ctx, preTotalBonus);
    gTotalBonus.add(ctx, totalBonus);
    preTotalBonus = totalBonus;
}

export const LogBonusClaimedEventHandler = async (
    event: LogBonusClaimedEvent,
    ctx: GROHodlerV2Context
): Promise<void> => {
    const totalBonus = await getContractData(ctx);

    ctx.eventLogger.emit("LogBonusClaimedEvent", {
        distinctId: '',
        severity: LogLevel.INFO,
        amount: parseNum(event.args.amount),
        totalBonus: totalBonus,
        message: `preTotalBonus ${preTotalBonus} totalBonus ${totalBonus}`,
    });

    gTotalBonus.sub(ctx, preTotalBonus);
    gTotalBonus.add(ctx, totalBonus);
    preTotalBonus = totalBonus;
}

export const blockHandler = async (_:any, ctx: GROHodlerV2Context) => {
    const totalBonus = parseNum(await ctx.contract.totalBonus());
    ctx.meter.Gauge("totalBonus2").record(totalBonus);
}