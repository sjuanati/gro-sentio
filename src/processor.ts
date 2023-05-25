import { config } from 'dotenv';
import { CONTRACT, ZERO_ADDR } from './constants.js'
import { ERC20Processor } from '@sentio/sdk/eth/builtin';
import { GRouterProcessor } from './types/eth/grouter.js';
import { GTrancheProcessor } from './types/eth/gtranche.js';
// import {
// 	gRouterDepositlHandler,
// 	gRouterWithdrawalHandler,
// } from './processors/grouter.js';
import {
	// blockHandler,
	LogNewDepositEventlHandler,
	LogNewWithdrawalEventHandler,
	LogNewTrancheBalanceHandler,
} from './processors/gtranche.js';
import { BigDecimal, EthChainId, Gauge, MetricOptions, LogLevel, Counter } from "@sentio/sdk";
config();

// const gvtAcc = Counter.register('gvt_acc');
// const pwrdAcc = Counter.register('pwrd_acc');

// GRouterProcessor.bind({ address: CONTRACT.GROUTER, network: EthChainId.ETHEREUM})
// 	.onEventLogDeposit(gRouterDepositlHandler)
// 	.onEventLogWithdrawal(gRouterWithdrawalHandler);

GTrancheProcessor.bind({ address: CONTRACT.GTRANCHE, network: EthChainId.ETHEREUM })
	// .onEventLogNewDeposit(LogNewDepositEventlHandler)
	// .onEventLogNewWithdrawal(LogNewWithdrawalEventHandler)
	.onEventLogNewTrancheBalance(LogNewTrancheBalanceHandler)
	// .onBlockInterval(blockHandler);




// ERC20Processor.bind({ address: CONTRACT.GVT, network: EthChainId.ETHEREUM, startBlock: /*12522446*/ 16726265 })
//     .onEventTransfer((event, ctx) => {
//         if (event.args.from == ZERO_ADDR) {
//             gvtAcc.add(ctx, event.args.value.scaleDown(18).decimalPlaces(DECIMALS));
//         }
//         if (event.args.to == ZERO_ADDR) {
//             gvtAcc.sub(ctx, event.args.value.scaleDown(18).decimalPlaces(DECIMALS));
//         }
//     }
//     );

// ERC20Processor.bind({ address: CONTRACT.PWRD, network: EthChainId.ETHEREUM, startBlock: /*12522247*/ 16726265 })
//     .onEventTransfer((event, ctx) => {
//         if (event.args.from == ZERO_ADDR) {
//             pwrdAcc.add(ctx, event.args.value.scaleDown(18).decimalPlaces(DECIMALS));
//         }
//         if (event.args.to == ZERO_ADDR) {
//             pwrdAcc.sub(ctx, event.args.value.scaleDown(18).decimalPlaces(DECIMALS));
//         }
//     }
//     );
