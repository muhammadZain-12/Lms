import { Box,Grid,Typography,TextField,Button } from "@mui/material"
import { useState } from "react"
import {Link, useParams} from "react-router-dom"
import { signInUser } from "../config/firebaseMethod"
import { useNavigate } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress';
import { onAuthStateChanged } from "firebase/auth"
function Login () {
    const navigate = useNavigate()
    const [data,setData] = useState({
        email:"",
        password:"",
        
    })
    const [loading,setLoader] = useState(false)

    const loginButton = () => {
        setLoader(true)
        signInUser(data).then((success)=>{

            setLoader(false)
            const user = success

            if(user.isCAdmin){
                navigate("Cadmin",{state:user})    
            }
            else{
            navigate("user",{state:user})
        }
        }).catch((error)=>{
            setLoader(false)
            console.log(error)
        })
    }
    return (
<Box>
            <Grid container sx={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
        
            
            <Grid item sm={8} md={4} xs={10}>
            <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%"}}>        
                
                <Typography  variant="h4">
                Login
                </Typography>
                 
                <TextField onChange={(e)=>setData((prev)=>({...prev,email:e.target.value}))} sx={{width:"100%",marginTop:3,borderRadius:"10px"}} type="email" label="Email" variant="standard" />
                <TextField onChange={(e)=>setData((prev)=>({...prev,password:e.target.value}))} sx={{width:"100%",marginTop:3}} type="password" label="Password" variant="standard" />
               <Link onClick={loginButton} style={{marginTop:20,width:"100%",padding:1,textDecoration:"none",display:"flex",justifyContent:"center"}} > <Button disabled={loading} sx={{width:"50%"}}  variant="contained"  >{loading?<CircularProgress/>:"Login"}</Button></Link>
               <Link to="signup" style={{marginTop:10,width:"100%",padding:1,textDecoration:"none",display:"flex",justifyContent:"center"}} > <Button sx={{width:"50%"}} variant="contained"  >SignUp</Button></Link>
                
                </Box>
            </Grid>
        
        </Grid>
        
    </Box>
    )
}

export default Login