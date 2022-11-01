// import PersistentDrawerRight from "../components/drawer"
import app from "../config/FirebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { Navigate, useNavigate,Link } from "react-router-dom";
import { Routes,Route } from "react-router-dom";
import { Button } from "@mui/material";
import UserData from "./userData";
import { useEffect, useState } from "react";
import PersistentDrawerLeft from "../components/drawer";
import StudentData from "./studentData";
import AdminHome from "./AdminHome";
import CreateQuiz from "./createQuiz";
import QuizData from "./QuizData";

const auth = getAuth(app)




function CAdmin () {
    

const navigate = useNavigate()
    


const checkingAdmin = () => {
    onAuthStateChanged(auth,(admin)=>{
        if(admin){
            console.log(admin)
        }
        else{
            navigate("/")
        }
    })
}


useEffect(()=>{
    checkingAdmin()
},[])



  return (
    
        <div style={{height:"10vh"}}>
         
        <PersistentDrawerLeft  status="Admin Panel" />
        


        <Routes>
            <Route path="/" element={<AdminHome/>}/>
            <Route path="userData" element={<UserData/>} />
            <Route path="StudentData" element={<StudentData/>} />
            <Route path="createQuiz" element={<CreateQuiz/>} />
            <Route path="quizData" element={<QuizData/>} />
        </Routes>
          
        

        </div>
  
  )

  }

export default CAdmin