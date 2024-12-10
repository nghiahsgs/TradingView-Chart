import { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { Box, Button } from '@mui/material';
import { calculateImportantLevels } from '../utils/technicalAnalysis';
import SupportResistanceTable from './SupportResistanceTable';

const TradingViewChart = ({ data }) => {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const [showLevels, setShowLevels] = useState(false);
    const [levels, setLevels] = useState([]);
    const lineSeriesRef = useRef([]);

    const clearImportantLines = () => {
        if (chartRef.current && lineSeriesRef.current.length > 0) {
            lineSeriesRef.current.forEach(series => {
                chartRef.current.removeSeries(series);
            });
            lineSeriesRef.current = [];
        }
    };

    const drawImportantLines = (levelsToDraw) => {
        if (!chartRef.current || !data.length) return;

        clearImportantLines();

        levelsToDraw.forEach(level => {
            const series = chartRef.current.addLineSeries({
                color: '#2962FF',
                lineWidth: 2,
                lineStyle: 2,
            });
            series.setData([
                { time: data[0].time, value: level.value },
                { time: data[data.length - 1].time, value: level.value }
            ]);
            lineSeriesRef.current.push(series);
        });
    };

    const handleDeleteLevel = (index) => {
        const newLevels = levels.filter((_, i) => i !== index);
        setLevels(newLevels);
    };

    const handleAddLevel = (newLevel) => {
        setLevels([...levels, newLevel]);
    };

    const handleApplyLevels = () => {
        drawImportantLines(levels);
    };

    const handleToggleLevels = () => {
        if (!showLevels) {
            const importantLevels = calculateImportantLevels(data);
            setLevels(importantLevels.map(level => ({
                type: 'Important Line',
                value: level.value
            })));
        } else {
            clearImportantLines();
            setLevels([]);
        }
        setShowLevels(!showLevels);
    };

    useEffect(() => {
        if (!chartContainerRef.current || !data.length) return;

        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 400,
            layout: {
                background: { color: '#ffffff' },
                textColor: '#333',
            },
            grid: {
                vertLines: { color: '#f0f0f0' },
                horzLines: { color: '#f0f0f0' },
            },
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
            },
        });

        const candlestickSeries = chart.addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: false,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
        });

        candlestickSeries.setData(data);
        chartRef.current = chart;

        const handleResize = () => {
            chart.applyOptions({
                width: chartContainerRef.current.clientWidth
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearImportantLines();
            chart.remove();
        };
    }, [data]);

    return (
        <Box>
            <Button 
                variant={showLevels ? "contained" : "outlined"}
                onClick={handleToggleLevels}
                sx={{ mb: 2 }}
            >
                {showLevels ? 'Hide Important Lines' : 'Show Important Lines'}
            </Button>
            {showLevels && (
                <SupportResistanceTable 
                    levels={levels}
                    onDeleteLevel={handleDeleteLevel}
                    onAddLevel={handleAddLevel}
                    onApplyLevels={handleApplyLevels}
                />
            )}
            <div ref={chartContainerRef} style={{ width: '100%' }} />
        </Box>
    );
};

export default TradingViewChart;