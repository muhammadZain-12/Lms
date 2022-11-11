import { getAuth } from "firebase/auth";
import app from "../config/FirebaseConfig";
import { signOut } from "firebase/auth";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDatabase,onValue,ref,set } from "firebase/database";
import loaderImage from "../assets/loaderImage.gif"
import Box from "@mui/material/Box";
import {Grid,Typography} from "@mui/material";


const auth = getAuth(app)
const database = getDatabase(app)

function AdminHome (prop) {
  const [value,setValue] = useState("")
  let {adminData} = prop

  const {uid} = adminData


const getDataFromFirebase = () => {
  const reference = ref(database,`students/${uid}`)
  onValue(reference,(e)=>{
    if(e.exists()){
      setValue(e.val())
    }
  })
}

useEffect(()=>{
  getDataFromFirebase()
},[uid])

console.log(value)


    


    return (
      
        
        <Box>
         
       { !value?
       <Box  >
        <Box sx={{display:"flex",flexDirection:"column",width:"100%",alignItems:"center",marginTop:5}} >
        <Typography variant="h5" >Please Wait!</Typography>
        <Typography variant="h5" >Fetching Data</Typography>
        </Box>
        <img width="100%" height="300" src={loaderImage} />
        </Box>
      :
       <Box sx={{margin:5}} >
        <Typography variant="h4"  >
       
        Welcome Back {value?value.firstName:""}!
    </Typography>
    
    </Box>
    }
    </Box>
    )
}
export default AdminHome

