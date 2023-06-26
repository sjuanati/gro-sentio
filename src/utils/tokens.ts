import { BigDecimal } from '@sentio/sdk';
import { Token } from '../types.js';
import { DECIMALS } from '../constants.js';


export const getGToken = (tranche: boolean): Token => {
    return tranche ? Token.PWRD : Token.GVT;
}

export const getTokenByIndex = (tokenIndex: BigDecimal): Token => {
    switch (tokenIndex.toNumber()) {
        case 0:
            return Token.DAI;
        case 1:
            return Token.USDC;
        case 2:
            return Token.USDT;
        case 3:
            return Token.THREE_CRV;
        default:
            return Token.UNKNOWN;
    }
}

export const getUsdValue = (calcAmount: bigint, tokenIndex: BigDecimal): BigDecimal => {
    const token = getTokenByIndex(tokenIndex);
    const base = (token === Token.USDC || token === Token.USDT) ? 6 : 18;
    return calcAmount
        .scaleDown(base)
        .decimalPlaces(DECIMALS);
}

export const parseNum = (value: BigInt) => value.scaleDown(18).decimalPlaces(2);