import { Box } from '@mui/material';
import Switch from '@mui/material/Switch';


function SMswitch (prop) {
    let {onChange,label} = prop
    return (
        <Box>
         <Switch label={label} onChange={(e)=>onChange(e.target.checked)}   />
        </Box>
    )
}

export default SMswitch