import { StrategyConfig } from '../types';

export const strategyConfig: StrategyConfig = {
    startDate: new Date('2025-01-03'), // 2025年一月第一个周五
    endDate: new Date('2025-12-05'), // 2025年12月第一个周五
    initialInvestment: 100000, // 100000 USDT
    positionSize: 0.05, // 每次仓位投入不超过总投入的5%
    fees: {
        openingClosing: 0.0005, // 开仓/平仓费用 0.05%
        settlement: 0.0005 // 交割费用 0.05%
    }
};