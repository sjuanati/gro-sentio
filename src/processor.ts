import { CONTRACT } from './constants.js'
import { ERC20Processor } from '@sentio/sdk/eth/builtin';
import { GVaultProcessor } from './types/eth/gvault.js';
import { GRouterProcessor } from './types/eth/grouter.js';
import {
	gRouterDepositlHandler,
	gRouterWithdrawalHandler,
} from './processors/grouter.js';


GRouterProcessor.bind({ address: CONTRACT.GROUTER })
	.onEventLogDeposit(gRouterDepositlHandler)
	.onEventLogWithdrawal(gRouterWithdrawalHandler)
