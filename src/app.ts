import ButterflyStrategy from './strategies/butterflyStrategy';
import RatioSpreadStrategy from './strategies/ratioSpreadStrategy';
import { strategyConfig } from './config/strategyConfig';

async function main() {
    // Load strategy configuration
    const config = strategyConfig;

    // Initialize the strategy
    const strategyType = process.argv[2] || 'butterfly';
    let strategy;
    if (strategyType === 'ratioSpread') {
        strategy = new RatioSpreadStrategy(config);
    } else {
        strategy = new ButterflyStrategy(config);
    }

    // Execute the backtesting process
    const results = await strategy.execute();

    // Output results
    console.log('Total Asset Value Changes:', results.assetValueChanges);
    console.log('Profit and Loss Changes:', results.assetValueChanges.map(av => av.profitLoss));
    console.log('Trade Records:', results.tradeRecords);
}

// Start the application
main().catch(error => {
    console.error('Error during backtesting:', error);
});