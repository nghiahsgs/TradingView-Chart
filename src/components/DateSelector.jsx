import { DatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';

const DateSelector = ({ selectedDate, onChange }) => {
    return (
        <div style={{ marginBottom: '1rem' }}>
            <DatePicker
                label="Select End Date"
                value={dayjs(selectedDate)}
                onChange={(newValue) => onChange(newValue.toDate())}
                maxDate={dayjs()}
                format="DD MMM YYYY"
                slotProps={{
                    textField: {
                        variant: "outlined",
                        fullWidth: true
                    }
                }}
            />
        </div>
    );
};

export default DateSelector;