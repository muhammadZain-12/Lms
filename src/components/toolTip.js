import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function BasicTooltip(prop) {
  
  const {ID,value} = prop


    return (
    <Tooltip title="Delete" onClick={()=>ID(value)}>
      <IconButton>
        <DeleteIcon  />
      </IconButton>
    </Tooltip>
  );
}