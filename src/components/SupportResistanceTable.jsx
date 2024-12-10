import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper,
    IconButton,
    Button,
    TextField,
    Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';

const SupportResistanceTable = ({ levels, onDeleteLevel, onApplyLevels, onAddLevel }) => {
    const [newValue, setNewValue] = useState('');

    const handleAddLevel = () => {
        if (newValue && !isNaN(parseFloat(newValue))) {
            onAddLevel({
                type: 'Important Line',
                value: parseFloat(newValue)
            });
            setNewValue('');
        }
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', mb: 2 }}>
            <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
                <TextField
                    label="New Level Value"
                    type="number"
                    size="small"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleAddLevel();
                        }
                    }}
                />
                <Button 
                    variant="contained" 
                    onClick={handleAddLevel}
                    disabled={!newValue || isNaN(parseFloat(newValue))}
                >
                    Add Level
                </Button>
            </Box>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Type</TableCell>
                            <TableCell align="right">Value</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {levels.map((level, index) => (
                            <TableRow key={index}>
                                <TableCell>{level.type}</TableCell>
                                <TableCell align="right">{level.value.toFixed(4)}</TableCell>
                                <TableCell align="right">
                                    <IconButton 
                                        size="small" 
                                        onClick={() => onDeleteLevel(index)}
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button 
                variant="contained" 
                onClick={onApplyLevels}
                sx={{ m: 2 }}
            >
                Apply Levels
            </Button>
        </Paper>
    );
};

export default SupportResistanceTable;