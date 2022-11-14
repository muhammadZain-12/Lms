import { Box,Grid,Typography,TextField,Button } from "@mui/material"
import { useState } from "react"
import {Link, useParams} from "react-router-dom"
import { signInUser } from "../config/firebaseMethod"
import { useNavigate } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress';
import { onAuthStateChanged } from "firebase/auth"
import quizAppImage from "../assets/quizAppImage.jpg"
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
        //     else if (user.isActive){
        //     navigate("user",{state:user})
        // }
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
                
            <Grid sx={{display:{md:"flex",sm:"none",xs:"none"}}} item md={5}>
                <Box>
                        <img src={quizAppImage} width="100%" />
                </Box>
            </Grid>
            
            <Grid item sm={8} md={4} xs={10}>
            <Box sx={{display:"flex",border:"1px solid black",boxShadow:5,padding:5,flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100%"}}>        
                <Box sx={{display:"flex",flexDirection:"column",width:"100%"}} >
                <Typography  variant="h5">
                Welcome!
                </Typography>
                <Typography  variant="h6" sx={{marginTop:2}}>
                Login To Enter your Profile
                </Typography>
                </Box>
                <TextField onChange={(e)=>setData((prev)=>({...prev,email:e.target.value}))} sx={{width:"100%",marginTop:3,borderRadius:"10px"}} type="email" label="Email" variant="standard" />
                <TextField onChange={(e)=>setData((prev)=>({...prev,password:e.target.value}))} sx={{width:"100%",marginTop:3}} type="password" label="Password" variant="standard" />
               <Link onClick={loginButton} style={{marginTop:20,width:"100%",padding:1,textDecoration:"none",display:"flex",justifyContent:"center",border:"none"}} > <Button disabled={loading} sx={{width:"50%"}}  variant="contained"  >{loading?<CircularProgress/>:"Login"}</Button></Link>
               {/* <Link to="registrationForm" style={{marginTop:10,width:"100%",padding:1,textDecoration:"none",display:"flex",justifyContent:"center"}} > <Button sx={{width:"70%",fontSize:16,border:"1px solid blue",marginTop:1,display:{md:"flex",sm:"flex",xs:"none"}}} variant="standard"   >Get me Registered</Button></Link>
               <Link to="registrationForm" style={{marginTop:10,width:"100%",padding:1,textDecoration:"none",justifyContent:"center",display:"flex"}} > <Button sx={{width:{xs:"70%"},fontSize:16,display:{md:"none",sm:"none",xs:"flex"},border:"1px solid blue"}} variant="standard"   >Register Me</Button></Link>              */}
                
                
                </Box>
            </Grid>
        
        </Grid>
        
    </Box>
    )
}

export default Login