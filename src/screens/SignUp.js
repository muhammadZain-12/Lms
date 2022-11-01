import { Box,Grid,Typography,TextField,Button } from "@mui/material"
import {Link, useNavigate} from "react-router-dom"
import RadioButtonsGroup from "../components/Radiobutton";
import { signUpUser } from "../config/firebaseMethod";
import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
function SignUp() {
    const navigate = useNavigate()
    const [data,setData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        isCAdmin:false,
        isAdmin:false,
        islogin:false
    })
    const [loading,setLoader] = useState(false)

    const AuthenticateUser = () => {
        setLoader(true)
        signUpUser(data).then((success)=>{
            setLoader(false)
            console.log(success)
            alert("Sign up succesfully")
            navigate("/")
            const {user} = success
        }).catch((error)=>{
            setLoader(false)
            console.log(error)
        })
    }


    return(
        <Box>
            <Grid container sx={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
        
            
            <Grid item sm={7} md={4} xs={9}>
            <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%"}}>        
                
                <Typography  variant="h4">
                SignUp
                </Typography>
                <TextField onChange={(e)=>setData((prev)=>({...prev,email:e.target.value}))}  sx={{width:"100%",marginTop:1}} type="email" label="Email" variant="standard" />
                <TextField onChange={(e)=>setData((prev)=>({...prev,password:e.target.value}))} sx={{width:"100%",marginTop:1}} type="password" label="Password" variant="standard" />                 
                <TextField onChange={(e)=>setData((prev)=>({...prev,firstName:e.target.value}))} sx={{width:"100%",marginTop:1}} type="text" label="FirstName" variant="standard" />
                <TextField onChange={(e)=>setData((prev)=>({...prev,lastName:e.target.value}))} sx={{width:"100%",marginTop:1}} type="text" label="LastName" variant="standard" />
                <Box sx={{width:"inherit",marginTop:3}}>
                    <RadioButtonsGroup/>
                </Box>

                <Link disabled={loading} style={{marginTop:20,width:"100%",padding:1,textDecoration:"none",display:"flex",justifyContent:"center"}} > <Button sx={{width:"50%"}} disabled={loading} onClick={AuthenticateUser} variant="contained"  >{loading?<CircularProgress/>:"SignUp"}</Button></Link>
               <Link to="/" style={{marginTop:20,width:"100%",padding:1,textDecoration:"none",display:"flex",justifyContent:"center"}} > <Button sx={{width:"50%"}} variant="contained"  >Login</Button></Link>
                
                </Box>
            </Grid>
        
        </Grid>
        
    </Box>
    )
    }
    export default SignUp;
    