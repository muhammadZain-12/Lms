import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect } from 'react';

export default function BasicDatePicker(prop) {
const [value, setValue] = React.useState(null);

let {setDOB,setDOBYear,SetAge,Age,DOBYear,RegisteredYear} = prop

const getDate = () => {

    let date = value?value.$D:""
    let month = value?value.$M:""
    let year = value?value.$y:""
    setDOB(`${date}/${month}/${year}`)
    setDOBYear(year)
}

useEffect (()=>{

    getDate()


},[value])





// console.log(DOB)

  return (
    
 <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker

        label="Basic example"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          SetAge(RegisteredYear-DOBYear)
          
        }}
        
        renderInput={(params) => <TextField sx={{marginTop:5}} {...params} fullWidth  />}
      />
    </LocalizationProvider>
  );
}
