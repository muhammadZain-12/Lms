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
import StudentProfile from "./StudentProfile";
import Result from "./result";


const auth = getAuth(app)


function UserScreen () {
    

    const [User,setUser] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const [emails,setEmails] = useState("")
    const [data,setData] = useState([])
    

const checkingUser = () => {
    onAuthStateChanged(auth,(user)=>{
        
        
        if(user){
            getData(user)
            setUser(true)
            setData(user)
        }
        else{

            navigate("/",{state:user})
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
        
            <PersistentDrawerLeft path="/user" signOut={SignOut} status="User Panel" />  
        

        <Routes>
            <Route path="/" element = {<Home  />}  />
            <Route path="studentProfile" element = {<StudentProfile data={data} />} />
            <Route path="playQuiz" element = {<PlayQuiz/>} />
            <Route path="result" element = {<Result/>} />
        </Routes>
        </div>
)
    
    
}
export default UserScreen