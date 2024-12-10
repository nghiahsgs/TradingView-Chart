export function calculateImportantLevels(data) {
    if (!data || data.length === 0) return [];

    // Convert data to prices array
    const prices = data.map(candle => ({
        high: candle.high,
        low: candle.low,
        time: candle.time
    }));

    // Find important price levels
    const levels = [];
    const windowSize = 5; // Number of candles to look before and after

    for (let i = windowSize; i < prices.length - windowSize; i++) {
        const currentLow = prices[i].low;
        const currentHigh = prices[i].high;
        
        // Check for important level
        let isImportantLevel = true;
        for (let j = i - windowSize; j <= i + windowSize; j++) {
            if (j !== i && 
                (prices[j].low < currentLow - (currentLow * 0.001) || 
                 prices[j].high > currentHigh + (currentHigh * 0.001))) {
                isImportantLevel = false;
                break;
            }
        }

        if (isImportantLevel) {
            levels.push({
                time: prices[i].time,
                value: (currentHigh + currentLow) / 2
            });
        }
    }

    // Remove duplicate levels that are very close to each other
    const uniqueLevels = levels.reduce((acc, level) => {
        const isDuplicate = acc.some(existingLevel => 
            Math.abs(existingLevel.value - level.value) / level.value < 0.001
        );
        if (!isDuplicate) {
            acc.push(level);
        }
        return acc;
    }, []);

    return uniqueLevels;
}