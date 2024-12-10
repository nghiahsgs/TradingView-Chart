import { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import TradingViewChart from '../components/TradingViewChart';
import DateSelector from '../components/DateSelector';
import PlaybackControls from '../components/PlaybackControls';
import { filterDataByDate } from '../utils/dateUtils';

export default function Home() {
    const [fullChartData, setFullChartData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1000);
    const [playbackInterval, setPlaybackInterval] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/ohlcv');
                const data = await response.json();
                setFullChartData(data);
                setFilteredData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const filtered = filterDataByDate(fullChartData, date);
        setFilteredData(filtered);
    };

    const stopPlayback = useCallback(() => {
        if (playbackInterval) {
            clearInterval(playbackInterval);
            setPlaybackInterval(null);
        }
        setIsPlaying(false);
    }, [playbackInterval]);

    const startPlayback = useCallback(() => {
        stopPlayback();
        setIsPlaying(true);

        const interval = setInterval(() => {
            setSelectedDate(prevDate => {
                const newDate = new Date(prevDate);
                newDate.setDate(newDate.getDate() + 1);

                // Stop if we reach today's date
                if (newDate > new Date()) {
                    stopPlayback();
                    return prevDate;
                }

                const filtered = filterDataByDate(fullChartData, newDate);
                setFilteredData(filtered);
                return newDate;
            });
        }, playbackSpeed);

        setPlaybackInterval(interval);
    }, [fullChartData, playbackSpeed, stopPlayback]);

    useEffect(() => {
        return () => stopPlayback();
    }, [stopPlayback]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography>Loading...</Typography>
            </Box>
        );
    }

    return (
        <Container maxWidth="lg">
            <Box py={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    STRKUSDT Chart
                </Typography>
                <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <DateSelector 
                            selectedDate={selectedDate}
                            onChange={handleDateChange}
                        />
                    </Box>
                    <PlaybackControls 
                        isPlaying={isPlaying}
                        playbackSpeed={playbackSpeed}
                        onPlayForward={startPlayback}
                        onStop={stopPlayback}
                        onSpeedChange={setPlaybackSpeed}
                    />
                    <TradingViewChart data={filteredData} />
                </Paper>
            </Box>
        </Container>
    );
}