import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Select } from '@mui/material';

export default function BasicSelect(prop) {
  
  let {status,course1,course2,course3,id,age,setAge,marginTop,disabled} = prop



  const handleChange = (event) => {

    setAge(event.target.value)
    
  };

  


  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl  sx={{marginTop:{marginTop} }}  fullWidth>
        <InputLabel id="demo-simple-select-label">{status}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label= {status}
          onChange={handleChange}
          disabled={disabled}
      
        >

          
          <MenuItem value={id.id1}>{course1}</MenuItem>
          <MenuItem value={id.id2}>{course2}</MenuItem>
          <MenuItem value={id.id3}>{course3}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}