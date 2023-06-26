import { parseNum } from '../utils/tokens.js';
import { GROHodlerV2Context } from '../types/eth/grohodlerv2.js';
import { GROHodlerV3Context } from '../types/eth/grohodlerv3.js';


// Intervals-based

export const blockHandlerV2 = async (_:any, ctx: GROHodlerV2Context) => {
    const totalBonus = parseNum(await ctx.contract.totalBonus());
    ctx.meter.Gauge("totalBonus2").record(totalBonus);
}

export const blockHandlerV3 = async (_:any, ctx: GROHodlerV3Context) => {
    const totalBonus = parseNum(await ctx.contract.totalBonus());
    ctx.meter.Gauge("totalBonus2").record(totalBonus);
}
