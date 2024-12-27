import { StrategyConfig, TradeRecord, AssetValue, Position } from '../types';
import { fetchOptionPrices } from '../data/okxData';
import { calculateProfitAndLoss, calculateTotalAssets, calculateTransactionFee } from '../utils/calculations';

class ButterflyStrategy {
    private config: StrategyConfig;
    private trades: TradeRecord[];
    private balance: number;
    private assetValues: AssetValue[];
    private positions: Position[];

    constructor(config: StrategyConfig) {
        this.config = config;
        this.trades = [];
        this.balance = config.initialInvestment;
        this.assetValues = [];
        this.positions = [];
    }

    public async execute() {
        let currentDate = new Date(this.config.startDate);
        while (currentDate <= this.config.endDate) {
            if (currentDate.getDay() === 5) { // Check if it's Friday
                await this.settlePositions(currentDate);
                await this.executeTrade(currentDate);
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return {
            tradeRecords: this.trades,
            assetValueChanges: this.assetValues
        };
    }

    private async settlePositions(date: Date) {
        const marketPrices = await fetchOptionPrices('BTC-USD');
        const exitPrices = marketPrices.map(price => parseFloat(price.last));

        this.positions = this.positions.filter(position => {
            if (this.isSettlementDay(position, date)) {
                const profitLoss = calculateProfitAndLoss(position.entryPrice, exitPrices[position.strikeIndex], position.quantity);
                let fee = 0;
                if (profitLoss !== 0) { // Only charge fee if there is a profit or loss
                    fee = calculateTransactionFee(exitPrices[position.strikeIndex] * position.quantity, this.config.fees.settlement);
                }
                const totalCost = exitPrices[position.strikeIndex] * position.quantity - fee;
                this.balance += totalCost;

                const trade: TradeRecord = {
                    date,
                    action: 'close',
                    price: exitPrices[position.strikeIndex],
                    quantity: position.quantity,
                    totalCost,
                    profitLoss
                };
                this.trades.push(trade);

                const assetValue: AssetValue = {
                    date,
                    totalValue: calculateTotalAssets(this.balance, 0, this.getPositionValue()),
                    profitLoss
                };
                this.assetValues.push(assetValue);

                return false; // Remove the position after settlement
            }
            return true; // Keep the position if not settled
        });
    }

    private async executeTrade(date: Date) {
        const marketPrices = await fetchOptionPrices('BTC-USD');
        const entryPrices = marketPrices.map(price => parseFloat(price.last));
        const atmIndex = Math.floor(marketPrices.length / 2);
        const quantity = this.balance / entryPrices[atmIndex];

        if (this.balance >= entryPrices[atmIndex] * quantity) {
            const fee = calculateTransactionFee(entryPrices[atmIndex] * quantity, this.config.fees.openingClosing);
            const totalCost = entryPrices[atmIndex] * quantity + fee;
            this.balance -= totalCost;

            // Butterfly strategy involves three legs
            const trade1: TradeRecord = {
                date,
                action: 'open',
                price: entryPrices[atmIndex - 1],
                quantity,
                totalCost,
                profitLoss: 0
            };
            const trade2: TradeRecord = {
                date,
                action: 'open',
                price: entryPrices[atmIndex],
                quantity: -2 * quantity,
                totalCost,
                profitLoss: 0
            };
            const trade3: TradeRecord = {
                date,
                action: 'open',
                price: entryPrices[atmIndex + 1],
                quantity,
                totalCost,
                profitLoss: 0
            };
            this.trades.push(trade1, trade2, trade3);

            this.positions.push({
                entryPrice: entryPrices[atmIndex],
                quantity,
                entryDate: date,
                strikeIndex: atmIndex
            });

            const assetValue: AssetValue = {
                date,
                totalValue: calculateTotalAssets(this.balance, 0, this.getPositionValue()),
                profitLoss: 0
            };
            this.assetValues.push(assetValue);
        }
    }

    private isSettlementDay(position: Position, date: Date): boolean {
        const settlementDate = new Date(position.entryDate);
        settlementDate.setDate(settlementDate.getDate() + 7);
        return date >= settlementDate;
    }

    private getPositionValue(): number {
        return this.positions.reduce((total, position) => total + (position.entryPrice * position.quantity), 0);
    }

    public getTradeRecords() {
        return this.trades;
    }

    public getBalance() {
        return this.balance;
    }
}

export default ButterflyStrategy;