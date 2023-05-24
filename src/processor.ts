import { CONTRACT, DECIMALS, ZERO_ADDR } from './constants.js'
import { ERC20Processor } from '@sentio/sdk/eth/builtin';
import { GVaultProcessor } from './types/eth/gvault.js';
import { GRouterProcessor } from './types/eth/grouter.js';
import {
	gRouterDepositlHandler,
	gRouterWithdrawalHandler,
} from './processors/grouter.js';
import { BigDecimal, EthChainId, Gauge, MetricOptions, LogLevel, Counter } from "@sentio/sdk";


const gvtAcc = Counter.register('gvt_acc');
const pwrdAcc = Counter.register('pwrd_acc');

GRouterProcessor.bind({ address: CONTRACT.GROUTER, network: EthChainId.ETHEREUM})
	.onEventLogDeposit(gRouterDepositlHandler)
	.onEventLogWithdrawal(gRouterWithdrawalHandler);

ERC20Processor.bind({ address: CONTRACT.GVT, network: EthChainId.ETHEREUM, startBlock: 12522446 /*16726265*/ })
    .onEventTransfer((event, ctx) => {
        if (event.args.from == ZERO_ADDR) {
            gvtAcc.add(ctx, event.args.value.scaleDown(18).decimalPlaces(DECIMALS));
        }
        if (event.args.to == ZERO_ADDR) {
            gvtAcc.sub(ctx, event.args.value.scaleDown(18).decimalPlaces(DECIMALS));
        }
    }
    );

ERC20Processor.bind({ address: CONTRACT.PWRD, network: EthChainId.ETHEREUM, startBlock: 12522247 /*16726265*/ })
    .onEventTransfer((event, ctx) => {
        if (event.args.from == ZERO_ADDR) {
            pwrdAcc.add(ctx, event.args.value.scaleDown(18).decimalPlaces(DECIMALS));
        }
        if (event.args.to == ZERO_ADDR) {
            pwrdAcc.sub(ctx, event.args.value.scaleDown(18).decimalPlaces(DECIMALS));
        }
    }
    );
