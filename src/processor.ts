import { config } from 'dotenv';
import { CONTRACT, ZERO_ADDR } from './constants.js'
import { ERC20Processor } from '@sentio/sdk/eth/builtin';
import { GRouterProcessor } from './types/eth/grouter.js';
import { GTrancheProcessor } from './types/eth/gtranche.js';
import { GROHodlerV2, GROHodlerV2Processor } from './types/eth/grohodlerv2.js';
import { GROVestingV2Processor } from './types/eth/grovestingv2.js';
import {
	LogVestEventlHandler,
	LogExitEventlHandler,
	LogExtendEventlHandler,
	blockHandler as groVestingBlockHandler,
} from './processors/grovesting.js';
import {
	LogBonusAddedEventHandler,
	LogBonusClaimedEventHandler,
	blockHandler as groHodlerBlockHandler,
} from './processors/grohodler.js'
import {
	// blockHandler,
	LogNewDepositEventlHandler,
	LogNewWithdrawalEventHandler,
	LogNewTrancheBalanceHandler,
} from './processors/gtranche.js';
import { BigDecimal, EthChainId, Gauge, MetricOptions, LogLevel, Counter } from "@sentio/sdk";
// import {
// 	gRouterDepositlHandler,
// 	gRouterWithdrawalHandler,
// } from './processors/grouter.js';
config();

// const gvtAcc = Counter.register('gvt_acc');
// const pwrdAcc = Counter.register('pwrd_acc');

// GRouterProcessor.bind({ address: CONTRACT.GROUTER, network: EthChainId.ETHEREUM})
// 	.onEventLogDeposit(gRouterDepositlHandler)
// 	.onEventLogWithdrawal(gRouterWithdrawalHandler);

/*
GTrancheProcessor.bind({ address: CONTRACT.GTRANCHE, network: EthChainId.ETHEREUM })
	.onEventLogNewTrancheBalance(LogNewTrancheBalanceHandler)
*/

GROVestingV2Processor.bind({
	address: CONTRACT.GROVESTING_V2,
	network: EthChainId.ETHEREUM,
	//startBlock: 17161912,
})
	// .onEventLogVest(LogVestEventlHandler)
	// .onEventLogExit(LogExitEventlHandler)
	// .onEventLogExtend(LogExtendEventlHandler)
	.onTimeInterval(groVestingBlockHandler, 60);

GROHodlerV2Processor.bind({
	address: CONTRACT.GROHODLER_V2,
	network: EthChainId.ETHEREUM,
	//startBlock: 17161912,
})
	// .onEventLogBonusAdded(LogBonusAddedEventHandler)
	// .onEventLogBonusClaimed(LogBonusClaimedEventHandler)
	// .onBlockInterval(groHodlerBlockHandler, 360)
	.onTimeInterval(groHodlerBlockHandler, 60)