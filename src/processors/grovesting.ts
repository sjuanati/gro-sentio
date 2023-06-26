import { parseNum } from '../utils/tokens.js';
import { GROVestingV2Context } from '../types/eth/grovestingv2.js';


// Intervals-based

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
