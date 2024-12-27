export function calculateProfitAndLoss(entryPrice: number, exitPrice: number, quantity: number): number {
    return (exitPrice - entryPrice) * quantity;
}

export function calculateTotalAssets(balance: number, frozenMargin: number, positionValue: number): number {
    return balance + frozenMargin + positionValue;
}

export function calculateTransactionFee(amount: number, feeRate: number): number {
    return amount * feeRate;
}