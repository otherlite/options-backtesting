# Options Backtesting Project

This project implements a backtesting framework for options trading strategies, specifically focusing on the butterfly strategy. The backtesting process utilizes data from the Deribit API to simulate trades and evaluate performance based on historical data.

## Project Structure

```
options-backtesting
├── src
│   ├── strategies
│   │   └── butterflyStrategy.ts
│   ├── data
│   │   └── deribitData.ts
│   ├── config
│   │   └── strategyConfig.ts
│   ├── utils
│   │   └── calculations.ts
│   ├── app.ts
│   └── types
│       └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Features

- **Butterfly Strategy**: Implements a butterfly options trading strategy.
- **Data Source**: Fetches options data from the Deribit API.
- **Configurable Parameters**: Allows manual adjustment of strategy parameters such as:
  - Start Date: First Friday of January 2025
  - End Date: First Friday of December 2025
  - Initial Investment: 100,000 USDT
  - Position Size: Up to 5% of total investment
  - Entry Day: Trades executed after settlement on Fridays
  - Entry Price: At-the-money (ATM)
  - Price Range: 5000
  - Expiration Date: One week after entry
- **Transaction Fees**: 
  - Opening/Closing: 0.05%
  - Delivery: 0.05% (no fee for expired options)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/options-backtesting.git
   ```
2. Navigate to the project directory:
   ```
   cd options-backtesting
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage

To run the backtesting application, execute the following command:
```
npm start
```

## Results

The application will output:
- Total asset change curve (position value + frozen margin + available balance)
- Profit and loss change curve
- Trade records

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.