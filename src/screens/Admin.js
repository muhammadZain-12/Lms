// import PersistentDrawerRight from "../components/drawer"
import app from "../config/FirebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { Navigate, useNavigate,Link, useLocation } from "react-router-dom";
import { Routes,Route } from "react-router-dom";
import { Button } from "@mui/material";
import UserData from "./userData";
import { useEffect, useState } from "react";
import PersistentDrawerLeft from "../components/drawer";
import StudentData from "./studentData";
import AdminHome from "./AdminHome";
import CreateQuiz from "./createQuiz";
import QuizData from "./QuizData";
import CourseForm from "./createCourseForm";
import CourseFormData from "./courseFormData";
import ResultScreen from "./createResult";
import Countries from "./countries";
import Cities from "./cities";
import FormControl from "./formControl";
import FormControlData from "./formControlData";
import TrainerRegistrationForm from "./trainerRegistrationForm";
const auth = getAuth(app)




function CAdmin () {
    
const [adminData,setAdminData] = useState("")

const navigate = useNavigate()
const location = useLocation()




    


const checkingAdmin = () => {
    onAuthStateChanged(auth,(students)=>{
        if(students){
            setAdminData(students)
        }
        else{
            navigate("/")
        }
    })
}

console.log(adminData,"adminData")

useEffect(()=>{
    checkingAdmin()
    
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
    
        <div style={{height:"10vh"}}>
         
        <PersistentDrawerLeft signOut={SignOut}  status="Admin Panel" />
        


        <Routes>
            <Route path="/" element={<AdminHome adminData={adminData?adminData:""} />}/>
            <Route path="StudentData" element={<StudentData/>} />
            <Route path="createQuiz" element={<CreateQuiz/>} />
            <Route path="quizData" element={<QuizData/>} />
            <Route path="courseForm" element={<CourseForm/>} />
            <Route path="courseFormData" element={<CourseFormData/>} />
            <Route path="resultScreen" element={<ResultScreen/>} />
            <Route path="countries" element={<Countries/>} />
            <Route path="city" element={<Cities/>} />
            <Route path="formControl" element={<FormControl/>} />
            <Route path="formControlData" element={<FormControlData/>} />
            
        </Routes>
          
        

        </div>
  
  )

  }

export default CAdmin