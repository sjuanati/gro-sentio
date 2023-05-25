// import { CONTRACT, DECIMALS } from '../constants.js'
// import { ERC20Processor  } from '@sentio/sdk/eth/builtin';
// import {  } from '../types/eth/internal/index.js';
// import { GVaultProcessor } from '../types/eth/gvault.js';
// import { GRouterProcessor } from '../types/eth/grouter.js';
// import { BigDecimal, EthChainId, Gauge, MetricOptions, LogLevel, Counter } from "@sentio/sdk";

// const gvtAcc = Counter.register('gvt_acc');
// const pwrdAcc = Counter.register('pwrd_acc');


// export const gRouterDepositlHandler = async (
//     event: LogDepositEvent,
//     ctx: GRouterContext
// ): Promise<void> => {

// }

// export const gRouterDepositlHandler = async (
//     event: LogDepositEvent,
//     ctx: GRouterContext
// ): Promise<void> => {

// }

// ERC20Processor.bind({ address: CONTRACT.GVT, network: EthChainId.ETHEREUM, startBlock: 12522446 /*16726265*/ })
//     .onEventTransfer((event, ctx) => {
//         if (event.args.from == '0x0000000000000000000000000000000000000000') {
//             gvtAcc.add(ctx, event.args.value.scaleDown(18).decimalPlaces(DECIMALS));
//         }
//         if (event.args.to == '0x0000000000000000000000000000000000000000') {
//             gvtAcc.sub(ctx, event.args.value.scaleDown(18).decimalPlaces(DECIMALS));
//         }
//     }
//     );

// ERC20Processor.bind({ address: CONTRACT.PWRD, network: EthChainId.ETHEREUM, startBlock: 12522247 /*16726265*/ })
//     .onEventTransfer((event, ctx) => {
//         if (event.args.from == '0x0000000000000000000000000000000000000000') {
//             pwrdAcc.add(ctx, event.args.value.scaleDown(18).decimalPlaces(DECIMALS));
//         }
//         if (event.args.to == '0x0000000000000000000000000000000000000000') {
//             pwrdAcc.sub(ctx, event.args.value.scaleDown(18).decimalPlaces(DECIMALS));
//         }
//     }
//     );
