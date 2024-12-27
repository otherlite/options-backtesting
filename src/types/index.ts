export interface StrategyConfig {
    startDate: Date;
    endDate: Date;
    initialInvestment: number;
    positionSize: number;
    fees: {
        openingClosing: number;
        settlement: number;
    };
}

export interface TradeRecord {
    date: Date;
    action: 'open' | 'close';
    price: number;
    quantity: number;
    totalCost: number;
    profitLoss: number;
}

export interface AssetValue {
    date: Date;
    totalValue: number;
    profitLoss: number;
}

export interface Position {
    entryPrice: number;
    quantity: number;
    entryDate: Date;
    strikeIndex: number;
}