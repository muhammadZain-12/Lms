import { Box,Grid,Typography,Button } from "@mui/material"
import { useEffect } from "react"
import { getDatabase,ref,onValue } from "firebase/database"
import app from "../config/FirebaseConfig"
import { useState } from "react"
import FallbackAvatars from "../components/avatar"
import { Navigate, useNavigate } from "react-router-dom"

const database = getDatabase(app)
function StudentProfile (prop) {
        

    const navigate = useNavigate()
    const [studentData,setStudentData] = useState([])
    const {data} = prop

    console.log(studentData)
    
useEffect(()=>{
let uid = data.uid
const reference = ref(database,`students/${uid}`)
onValue(reference,(e)=>{
    if(e.exists()){
        let val = e.val()
        // let values = Object.values(val)
        setStudentData(val)
    }
})

},[data])

const routeToProgress = () =>{
    navigate('/user')
}

const routeToResults = () => {
    navigate('/user/result')
}
    return (
            <Box sx={{paddingTop:2}} >
                <Grid container >
                    <Grid item md={12} sm={12} xs={12} >
                        <Box sx={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",backgroundColor:"#755BA4",pt:2}} >
                            <Box sx={{fontSize:{md:22,xs:18},display:"flex",flexDirection:"column",width:{md:"60%",sm:"70%",xs:"100%"},p:2,color:"white"}} >
                                <Typography variant="h3" sx={{fontSize:{md:32,sm:28,xs:20}}}  >Student Profile</Typography>
                                <Typography variant="h4" sx={{fontSize:{md:28,sm:25,xs:18}}} >View Profile</Typography>
                                </Box>
                        </Box>

                            
                        <Box sx={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",backgroundColor:"#755BA4",minHeight:"70.6vh",maxHeight:"fit-Content"}} >
                        <Grid item md={12} sm={12} xs={12} >
                            <Box sx={{display:"flex",flexDirection:"column",width:{md:"80vw",sm:'95vw',xs:"100vw"},padding:5,color:"white",border:"1px solid white",mb:3,borderRadius:5,mt:3,boxShadow:5,backgroundColor:"white"}} >
                                   <Box sx={{width:"100%",display:"flex",flexDirection:{md:"row",xs:"column",sm:"row",},justifyContent:"space-around",alignItems:{xs:"center",md:"flex-start",sm:"flex-start"}}} >
                                    <Box sx={{display:"flex",justifyContent:"flex-start",alignItems:{xs:"center",md:"flex-start",sm:"flex-start"},flexDirection:{md:"row",xs:"column",sm:"row"},width:"70%"}} >
                                    <FallbackAvatars/>
                                    <Typography variant="h4" sx={{color:"black",ml:2,fontSize:{xs:14,md:28,sm:28},mt:{md:0,sm:0,xs:1}}} >{studentData.firstName} S/o {studentData.fatherName}</Typography>
                                    </Box>
                                    <Button onClick={routeToResults} variant="contained" sx={{fontWeight:"700",width:{md:"25%",sm:"30%",xs:"80%"},mt:{md:0,sm:0,xs:1},height:"7vh",backgroundColor:"purple",color:"white",borderRadius:3,padding:3}} >View Result</Button>
                                    <Button onClick={routeToProgress} sx={{fontWeight:"700",ml:2,width:{md:"25%",sm:"30%",xs:"80%"},mt:{md:0,sm:0,xs:1},height:"7vh",backgroundColor:"purple",color:"white",borderRadius:3,padding:3}} variant="contained" >View Progress</Button>
                                    </Box>
                                    <Box sx={{display:"flex",flexDirection:{md:"row",sm:"row",xs:'column'},width:'100%',justifyContent:"space-between",mt:2}} >
                                        <Box sx={{display:"flex",padding:2,flexDirection:"column",alignItems:"space-between",border:"1px solid white",color:"black",width:{md:"48%",sm:"49%",xs:"100%"},boxShadow:2,borderRadius:5}} >
                                            <Typography sx={{mb:2,fontWeight:"700",textAlign:"center",fontSize:{md:28,sm:24,xs:20}}} variant="h5" >
                                                Personal Details:-
                                            </Typography>
                                            
                                            <Typography variant="h6" sx={{fontWeight:"700",fontSize:{md:18,sm:18,xs:10}}} >
                                                Cnic: <span style={{fontSize:'20px',fontWeight:"500",fontSize:{md:18,sm:20,xs:12}}} >{studentData.cnic}</span>
                                            </Typography>
                                            <Typography variant="h6" sx={{fontWeight:"700",fontSize:{md:18,sm:18,xs:10}}} >
                                                Contact Number: <span style={{fontSize:'20px',fontWeight:"500",fontSize:{md:18,sm:20,xs:12}}} >{studentData.contact}</span>
                                            </Typography>
                                            <Typography variant="h6" sx={{fontWeight:"700",fontSize:{md:18,sm:18,xs:10}}} >
                                                Date Of Birth: <span style={{fontSize:'20px',fontWeight:"500",fontSize:{md:18,sm:20,xs:16}}} >{studentData.dateOfBirth}</span>
                                            </Typography>
                                            <Typography variant="h6" sx={{fontWeight:"700",fontSize:{md:18,sm:18,xs:10}}} >
                                                Age: <span style={{fontSize:'20px',fontWeight:"500",fontSize:{md:18,sm:20,xs:16}}} >{studentData.age}</span>
                                            </Typography>
                                            
                                            <Typography variant="h6" sx={{fontWeight:"700",fontSize:{md:18,sm:18,xs:10}}} >
                                                Email: <span style={{fontSize:'20px',fontWeight:"500",fontSize:{md:18,sm:20,xs:14}}} >{studentData.email}</span>
                                            </Typography>
                                            <Typography variant="h6" sx={{fontWeight:"700",fontSize:{md:18,sm:18,xs:10}}} >
                                                Father Cnic: <span style={{fontSize:'20px',fontWeight:"500",fontSize:{md:18,sm:18,xs:16}}} >{studentData.fatherCnic}</span>
                                            </Typography>
                                            <Typography variant="h6" sx={{fontWeight:"700",fontSize:{md:18,sm:18,xs:10}}} >
                                                Father Contact: <span style={{fontSize:'20px',fontWeight:"500",fontSize:{md:18,sm:18,xs:16}}} >{studentData.fatherContact}</span>
                                            </Typography>

                                            
                                            

                                        </Box>
                                        <Box sx={{display:"flex",flexDirection:"column",justifyContent:"space-between",border:"1px solid black",color:"black",boxShadow:2,borderRadius:5,width:{md:"48%",sm:"49%",xs:"100%"},mt:{xs:2,sm:0,md:0},padding:2}} >

                                        <Typography sx={{fontWeight:"700",mb:2,textAlign:"center",fontSize:{md:28,sm:24,xs:20}}} variant="h5" >
                                                Course Details:-
                                            </Typography>
                                            
                                            <Typography variant="h6" sx={{fontWeight:"700",fontSize:{md:18,sm:18,xs:10}}} >
                                                Course: <span style={{fontWeight:"500"}} >{studentData.course}</span>
                                            </Typography>

                                            <Typography variant="h6" sx={{fontWeight:"700",fontSize:{md:18,sm:18,xs:10}}} >
                                                Registration Date: <span style={{fontWeight:"500"}} >{studentData.registrationDate}</span>
                                            </Typography>
                                            <Typography variant="h6" sx={{fontWeight:"700",fontSize:{md:18,sm:18,xs:10}}} >
                                                Registration Year: <span style={{fontWeight:"500"}} >{studentData.registrationYear}</span>
                                            </Typography>
                                            <Typography variant="h6" sx={{fontWeight:"700",fontSize:{md:18,sm:18,xs:10}}} >
                                                Roll No: <span style={{fontWeight:"500"}} >{studentData.rollno}</span>
                                            </Typography>
                                            <Typography variant="h6" sx={{fontWeight:"700",fontSize:{md:18,sm:18,xs:10}}} >
                                                Section: <span style={{fontWeight:"500"}} >{studentData.section}</span>
                                            </Typography>

                                        </Box>
                                    </Box>
                            </Box>
                            
                                        </Grid>
                        </Box>
                        
                    </Grid>

                </Grid>
            </Box>
            )
}



export default StudentProfile
