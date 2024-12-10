import ccxt from 'ccxt';

export const exchange = new ccxt.binance({
    'enableRateLimit': true,
});

export async function fetchOHLCVData(symbol = 'STRKUSDT', timeframe = '1d', limit = 365) {
    try {
        const ohlcv = await exchange.fetchOHLCV(symbol, timeframe, undefined, limit);
        return ohlcv.map(candle => ({
            time: candle[0] / 1000,
            open: candle[1],
            high: candle[2],
            low: candle[3],
            close: candle[4],
            volume: candle[5]
        }));
    } catch (error) {
        console.error('Error fetching OHLCV data:', error);
        return [];
    }
}