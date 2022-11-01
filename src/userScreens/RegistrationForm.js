import { Box } from "@mui/material"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { useEffect, useState } from "react"
import app from "../config/FirebaseConfig"
import { getDatabase,ref,push,set} from "firebase/database";
import BasicSelect from "../components/dropDown"
import BasicDatePicker from "../components/datePicker"
import { useNavigate } from "react-router-dom"
const dataBase = getDatabase(app)


const RegistrationForm = (prop) => {
    const[disabled,setDisabled] = useState(false)    
    const navigate = useNavigate()
    const [DOB,setDOB] = useState("")    
    const [DOBYear,setDOBYear] = useState("")
    let[rollno,setRollNo] = useState("0")
    const [course, setCourse] = useState(''); 
    const [section,setSection] = useState("")   
    

    let {email} = prop
    
    const [data,setData] = useState({
        firstName:"",
        lastName:"",
        course:"",
        section:"",
        contact:"",
        cnic:"",
        fatherName:"",
        fatherCnic:"",
        fatherContact:"",
        emergencyContact:"",
        dateOfBirth:"",
        age : "",
        registrationDate: "",
        registrationYear:"",
        rollno:'',
        isFeeSubmited:false,
        isApproved:false,
        isActive:false,
        email:email

    })


   


const days = ["sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const Month = ["jan","Feb","Mar","Apr","May","Jun","jul","Aug","Sep","Oct","Nov","Dec"]

    let Fulldate = new Date();
    
    let day = Fulldate.getDay();
    let month = Fulldate.getMonth();
    let date = Fulldate.getDate()
    let registerDay = days[day];
    let registerMonth = Month[month]
    let registeredDate = `${registerDay}/${date}/${registerMonth}`
    let registeredYear = Fulldate.getFullYear();

const tranferDatatoDataBase = () => {

    rollno = Number(rollno)
    rollno = rollno+1
    console.log(rollno,"rooll")
    rollno = rollno.toString()
    console.log(rollno,"roll")
    setRollNo(rollno)
   let newRollNo = `0000${rollno}`
   console.log(newRollNo)
    const reference = ref(dataBase,`students`)
    data.registrationDate = registeredDate
    data.registrationYear = registeredYear
    data.rollno = newRollNo
    data.dateOfBirth=DOB
    data.age  = userAge 
    data.course = course
    data.section = section
    setData(data)
    
    let values = Object.values(data)
let count = 0
    values.forEach((e,i)=>{
        if(e===""){
            count = count+1
             } 
    })
    
    if(count){
        alert("Fill input")
    }
    
    else{
        push(reference,data)
        navigate("/user/PersonalInformation",{state:data})
        setDisabled(true)
    }

    
}



  let userAge = DOBYear?registeredYear-DOBYear:""
    
   const idCourse = {
        id1 : "wd",
        id2 : "md",
        id3 : "blch"
    }

    const idSection = {
        id1:"A",
        id2:"B",
        id3:"C"
    }


    

    return (

      
      
<Box sx={{display:"flex",justifyContent:"center",flexDirection:"column"}} >
        <h1 style={{textAlign:"center"}} >Student Registration Form</h1>
        <Grid container>
                    <Box sx={{display:"flex",justifyContent:"center",width:"100%"}}>            
                        <Grid item md={8} sm={10} xs={12} >
                <Box sx={{display:"flex",flexDirection:"column",AlignItems:"center",width:"100%"}} >
                    
                    <Box  sx={{display:"flex",justifyContent:"space-around",width:"100%"}} > 
                    <Grid item md={4} sm={5} xs={5} >
                    <TextField required="required" onChange={(e)=>setData((prev)=>({...prev,firstName:e.target.value}))} label="FirstName"   sx={{marginTop:5,width:"100%"}} />
                    </Grid>
                    <Grid item md={4} sm={5} xs={5}  >
                    <TextField type="text" onChange={(e)=>setData((prev)=>({...prev,lastName:e.target.value}))} label="LastName" sx={{marginTop:5,width:"100%"}} />
                    </Grid> 
                    </Box>
                    <Box sx={{display:"flex",justifyContent:"space-around"}} > 
                    <Grid item md={4} sm={5} xs={5}  >
                    <BasicSelect marginTop={5} age={course} setAge={setCourse} id = {idCourse} status="course"  course1="web Development" course2="Mobile Development" course3="App Development" />
                    </Grid>
                    <Grid item md={4} sm={5} xs={5}  >
                    <BasicSelect marginTop={5} age={section} setAge={setSection} id={idSection} status="section"  course1="A" course2="B" course3="C" sx={{marginTop:5}} />
                    </Grid>
                    </Box>
                    <Box sx={{display:"flex",justifyContent:"space-around"}} > 
                    <Grid item md={4} sm={5} xs={5}  >
                    <TextField type="Number" onChange={(e)=>setData((prev)=>({...prev,contact:e.target.value}))} label="Contact"   sx={{marginTop:5,width:"100%"}} />
                    </Grid>
                    <Grid item md={4} sm={5} xs={5}  >
                    <TextField type="Number" onChange={(e)=>setData((prev)=>({...prev,cnic:e.target.value}))} label="Cnic" sx={{marginTop:5,width:"100%"}} />
                    </Grid>
                    </Box>
                    <Box sx={{display:"flex",justifyContent:"space-around"}} > 
                    <Grid item md={4} sm={5} xs={5}  >
                    <TextField onChange={(e)=>setData((prev)=>({...prev,fatherName:e.target.value}))} label="FatherName"   sx={{marginTop:5,width:"100%"}} />
                    </Grid>
                    <Grid item md={4} sm={5} xs={5}  >
                    <TextField type="Number" onChange={(e)=>setData((prev)=>({...prev,fatherCnic:e.target.value}))} label="FatherCnic" sx={{marginTop:5,width:"100%"}} />
                    </Grid>
                    </Box>
                    <Box sx={{display:"flex",justifyContent:"space-around"}} > 
                    <Grid item md={4} sm={5} xs={5}  >
                    <TextField type="Number" onChange={(e)=>setData((prev)=>({...prev,fatherContact:e.target.value}))} label="FatherContact"   sx={{marginTop:5,width:"100%"}} />
                    </Grid>
                    <Grid item md={4} sm={5} xs={5}  >
                    <TextField type="Number"  onChange={(e)=>setData((prev)=>({...prev,emergencyContact:e.target.value}))} label="EmergencyContact" sx={{marginTop:5,width:"100%"}} />
                    </Grid>
                    </Box>
                    <Box sx={{display:"flex",justifyContent:"space-around"}} > 
                    <Grid item md={4} sm={5} xs={5}  >
                    <BasicDatePicker setDOBYear={setDOBYear} setDOB={setDOB} />
                    </Grid>
                    <Grid item md={4} sm={5} xs={5} >
                    <TextField  onChange={(e)=>setData((prev)=>({...prev,age:e.target.value}))} label="Age" value={userAge} sx={{marginTop:5,width:"100%"}} />
                    </Grid>
                    </Box>
                    <Box sx={{display:"flex",justifyContent:"center"}}>
                        <Button onClick={tranferDatatoDataBase}  variant="contained" sx={{marginTop:5,marginBottom:5,padding:2}} >Register Student</Button>
                    </Box>
                   
                   
                    
                </Box>

            </Grid>
            </Box>
        </Grid>
            </Box>

    )

}

export default RegistrationForm