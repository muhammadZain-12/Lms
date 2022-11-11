import { useLocation, useNavigate, useParams } from "react-router-dom"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from "../config/FirebaseConfig";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import PersistentDrawerLeft from "../components/drawer";
import Home from "../userScreens/Home";
import { Routes,Route } from "react-router-dom";
import RegistrationForm from "../userScreens/RegistrationForm";
import PersonalInformation from "./PersonalInformation";
import { getDatabase } from "firebase/database";
import PlayQuiz from "../userScreens/playQuiz";


const auth = getAuth(app)


function UserScreen () {
    

    const [User,setUser] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const [emails,setEmails] = useState("")
    
    

const checkingUser = () => {
    onAuthStateChanged(auth,(user)=>{
      
        
        if(user){
            getData(user)
            setUser(true)
        }
        else{

            navigate("/")
            console.log("a")
        }
    })
}



const getData = (data) => {
    console.log(data.email)
   setEmails(data.email)
}



    useEffect(()=>{
        checkingUser()
        
    },[])

    const SignOut = () => {
        signOut(auth).then(() => {
            console.log("sign Out")
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    }







return (
    <div>
        
            <PersistentDrawerLeft path="/user" status="User Panel" />  
        

        <Routes>
            <Route path="/" element = {<Home SIGNOUT={SignOut} />}  />
            <Route path="PersonalInformation" element = {<PersonalInformation  />} />
            <Route path="playQuiz" element = {<PlayQuiz/>} />
        </Routes>
        </div>
)
    
    
}
export default UserScreen