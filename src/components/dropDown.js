import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Select } from "@mui/material";

export default function BasicSelect(prop) {
  let {
    status,
    
    id,
    value,
    marginTop,
    disabled,
    width,
    onChange
  } = prop;

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };
  const handleChange = (event) => {
    onChange(event.target.value);
  };
console.log(value,"value")
  return (
    <Box sx={{ minWidth: 120, width: width }}>
      <FormControl sx={{ marginTop: marginTop }} fullWidth>
        <InputLabel id="demo-simple-select-label">{status}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={status}
          onChange={handleChange}
          disabled={disabled}
        >
          {Object.entries(id).map(([key, value], index) => {
            return (
              
            <MenuItem key={index} value={value}>
                {value}
              </MenuItem>
            );
          })}
          {/* <MenuItem value={id.id2}>{course2}</MenuItem>
          <MenuItem value={id.id3}>{course3}</MenuItem> */}
        </Select>
      </FormControl>
    </Box>
  );
}
