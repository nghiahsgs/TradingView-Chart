import { Box, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const PlaybackControls = ({ onPlayForward, onStop, isPlaying, playbackSpeed, onSpeedChange }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 2 }}>
            <IconButton 
                onClick={isPlaying ? onStop : onPlayForward}
                sx={{
                    backgroundColor: isPlaying ? 'primary.main' : 'transparent',
                    '&:hover': {
                        backgroundColor: isPlaying ? 'primary.dark' : 'rgba(25, 118, 210, 0.04)',
                    }
                }}
            >
                {isPlaying ? (
                    <PauseIcon sx={{ color: 'white', fontSize: 30 }} />
                ) : (
                    <PlayArrowIcon sx={{ color: 'primary.main', fontSize: 30 }} />
                )}
            </IconButton>
            
            <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Speed</InputLabel>
                <Select
                    value={playbackSpeed}
                    label="Speed"
                    onChange={(e) => onSpeedChange(e.target.value)}
                >
                    <MenuItem value={1000}>1x</MenuItem>
                    <MenuItem value={500}>2x</MenuItem>
                    <MenuItem value={250}>4x</MenuItem>
                    <MenuItem value={100}>10x</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default PlaybackControls;