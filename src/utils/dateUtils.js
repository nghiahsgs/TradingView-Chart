export function filterDataByDate(data, endDate) {
    if (!endDate || !data.length) return data;
    
    const endTimestamp = endDate.getTime() / 1000;
    return data.filter(candle => candle.time <= endTimestamp);
}