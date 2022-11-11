import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DatePickers(prop) {
    const {label,onChange,values} = prop
  const [value, setValue] = React.useState(null);


    
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        onChange={(newValue) => {
            
            const dates = newValue
            const dateOfAdmission = `${dates.$D}/${dates.$M}/${dates.$y}`
            onChange(dateOfAdmission)
            setValue(newValue);
            
        }}
        renderInput={(params) => <TextField  {...params}  /> }
      />
    </LocalizationProvider>
  );
}
