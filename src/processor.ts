import { Counter, Gauge } from '@sentio/sdk';
import { ERC20Processor } from '@sentio/sdk/eth/builtin';
import {
  GRouterContext,
  GRouterProcessor,
  LogDepositEvent,
  LogWithdrawalEvent,
} from './types/eth/grouter.js';



const gRouterWithdrawalHandler = async function(event: LogWithdrawalEvent, ctx: GRouterContext) {
  ctx.eventLogger.emit("LogWithdrawalEvent", {
      distinctId: event.args.sender,
      from: event.args.sender,
      tokenAmount: event.args.tokenAmount,
      tokenIndex: event.args.tokenIndex,
      tranche: event.args.tranche,
      calcAmount: event.args.calcAmount,
      message: " withdrawal from " + event.args.sender + " of " + event.args.tokenAmount,
  })
}


GRouterProcessor.bind({ address: '0xd4139E090e43Ff77172d9dD8BA449d2A9683790d' })
  .onEventLogWithdrawal(gRouterWithdrawalHandler)
