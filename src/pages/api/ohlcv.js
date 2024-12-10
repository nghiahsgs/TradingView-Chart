import { fetchOHLCVData } from '../../utils/ccxtClient';

export default async function handler(req, res) {
    try {
        const data = await fetchOHLCVData();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch OHLCV data' });
    }
}