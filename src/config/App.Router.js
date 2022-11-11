import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import React from "react"
import Login from "../screens/Login"
import { Box } from "@mui/material"
import SignUp from "../screens/SignUp"
import UserScreen from "../screens/User"
import Admin from "../screens/Admin"
import { UserDetail } from "../screens/userDetail"
import RegistrationForm from "../userScreens/RegistrationForm"
import Result from "../screens/result"
import TrainerRegistrationForm from "../screens/trainerRegistrationForm"

function AppRouter () {
    
    
    return (
                       
            
        
            <Router>
            
                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="signup" element={<SignUp/>} />
                    <Route path="registrationForm" element = {<RegistrationForm/>} />
                    <Route path="result" element = {<Result/>} />
                    <Route path="user/*" element={<UserScreen/>} />
                    <Route path="Cadmin/*" element={<Admin/>} />
                    <Route path="userDetail" element={<UserDetail/>} />
                    <Route path="trainerRegistrationForm" element={<TrainerRegistrationForm/>} />
                    
                </Routes>
            </Router>
            

      
    )
}

export default AppRouter