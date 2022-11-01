
import { Email } from "@mui/icons-material";
import { keys } from "@mui/system";
import { getDatabase,onValue,ref } from "firebase/database";
import { useState } from "react";
import { useEffect } from "react";
import app from "../config/FirebaseConfig";
import StudentData from "./studentData";
import UserData from "./userData";


 const database = getDatabase(app)

function PersonalInformation () {
const [studentVal,setStudentVal] = useState("")
const [usersData,setUserData] = useState("")
const [Studentemail,setStudentEmail] = useState([])
const [emailData,setEmailData] = useState("")
const getDataFromDb = () => {

    const Studentreference = ref(database,`students`)
    const UserReference = ref(database,`users`)
    onValue(Studentreference,(e)=>{
        if(e.exists()){
            setStudentVal(e.val())
        }
    })
    onValue(UserReference,(e)=>{
        if(e.exists()){
            setUserData(e.val())
        }
    })

}


    useEffect(()=>{
        getDataFromDb()
        
    },[])


    

    

    return (
        <div>
        <h1>Personal Information</h1>
        
        

        </div>
    )
}

export default PersonalInformation