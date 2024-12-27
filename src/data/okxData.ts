import axios from 'axios';

export async function fetchOptionPrices(symbol: string) {
    try {
        const response = await axios.get(`https://www.okx.com/api/v5/market/tickers?instType=OPTION&uly=${symbol}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching option prices:', error);
        throw error;
    }
}