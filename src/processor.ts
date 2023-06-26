import { config } from 'dotenv';
import { CONTRACT } from './constants.js';
import { EthChainId } from "@sentio/sdk";
import { GTrancheProcessor } from './types/eth/gtranche.js';
import { GROHodlerV2Processor } from './types/eth/grohodlerv2.js';
import { GROHodlerV3Processor } from './types/eth/grohodlerv3.js';
import { GROVestingV2Processor } from './types/eth/grovestingv2.js';
import { LogNewTrancheBalanceHandler } from './processors/gtranche.js';
import { blockHandler as groVestingBlockHandler } from './processors/grovesting.js';
import {
	blockHandlerV2 as groHodlerBlockHandlerV2,
	blockHandlerV3 as groHodlerBlockHandlerV3,
} from './processors/grohodler.js';

config();

GTrancheProcessor.bind({
	address: CONTRACT.GTRANCHE,
	network: EthChainId.ETHEREUM,
	startBlock: 16697441,
})
	.onEventLogNewTrancheBalance(LogNewTrancheBalanceHandler)

GROVestingV2Processor.bind({
	address: CONTRACT.GROVESTING_V2,
	network: EthChainId.ETHEREUM,
	startBlock: 14268701,
})
	.onTimeInterval(groVestingBlockHandler, 60, 60);

GROHodlerV2Processor.bind({
	address: CONTRACT.GROHODLER_V2,
	network: EthChainId.ETHEREUM,
	startBlock: 14268703,
	endBlock: 17469742,
})
	.onTimeInterval(groHodlerBlockHandlerV2, 60, 60);

GROHodlerV3Processor.bind({
	address: CONTRACT.GROHODLER_V3,
	network: EthChainId.ETHEREUM,
	startBlock: 17469743,
})
	.onTimeInterval(groHodlerBlockHandlerV3, 60, 60);
