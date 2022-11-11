import { Box } from "@mui/material"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"
import app from "../config/FirebaseConfig"
import { getDatabase,ref,push,set,onValue} from "firebase/database";
import BasicSelect from "../components/dropDown"
import BasicDatePicker from "../components/datePicker"
import { useNavigate } from "react-router-dom"
import { signUpUser } from "../config/firebaseMethod"

const dataBase = getDatabase(app)

const RegistrationForm = (prop) => {
    const[disabled,setDisabled] = useState(false)    
    const navigate = useNavigate()
    const [DOB,setDOB] = useState("")    
    const [DOBYear,setDOBYear] = useState("")
    let[rollno,setRollNo] = useState("0")
    const [course, setCourse] = useState(''); 
    const [section,setSection] = useState("")   
    const [val,setVal] = useState([])
    

    let {email} = prop
    
    const [data,setData] = useState({
        email:"",
        password:"",
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
        rollno:"aax",
        registrationDate: "",
        registrationYear:"",
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
    data.registrationDate = registeredDate
    data.registrationYear = registeredYear
    data.dateOfBirth=DOB
    data.age  = userAge
 
    setData(data)
    let values = Object.values(data)
    
    
    let count = 0
    console.log(values)
    values.forEach((e,i)=>{
        if(e===""){
            count = count+1
             } 
    })
    
    if(count){
        alert("Fill input")
    }
    
    else{
   
    
    signUpUser(data).then((success)=>{
        const user = success
        console.log(user,"userss")
    alert(success)
    
    console.log(success)
    
    setDisabled(true)
    navigate("/")
        
    


    }).catch((error)=>{
        console.log(error)
    })

    }

        

    
}


console.log(data,"dataaa")

const getDataFromDb = () => {
    const reference = ref(dataBase,`courses`)
    onValue(reference,(e)=>{
        if(e.exists()){
        let values = e.val()
        values = Object.values(values)
        
        values = values.map((e,i)=>{
            return e.courseName
        })
        values = new Set(values)
        values = {...[...values]}
        setVal(values)
    }
    })
}



useEffect(()=>{
        getDataFromDb()
},[])

  let userAge = DOBYear?registeredYear-DOBYear:""
    

    const idSection = {
        id1:"A",
        id2:"B",
        id3:"C"
    }


    

    return (

      
      
<Box sx={{backgroundColor:{md:"rgba(100,100,100,0.6)"},display:"flex",justifyContent:"center",flexDirection:"column"}} >
        
        <Grid container>
                    <Box sx={{display:"flex",justifyContent:"center",width:"100%"}}>            
                        <Grid item md={8} sm={10} xs={12} >
                <Box sx={{backgroundColor:"white",border:"2px solid black",marginTop:5,boxShadow:10,display:"flex",flexDirection:"column",AlignItems:"center",width:"100%"}} >
                <Box>
                <Typography variant="h4" sx={{textAlign:"center",marginTop:5}} >Student Registration Form</Typography>
                <Typography variant="h6" sx={{textAlign:"center"}} >Fill this form will get you registered in our quiz program</Typography>
                </Box>
                <Box  sx={{display:"flex",justifyContent:"space-around",width:"100%"}} > 
                    <Grid item md={4} sm={5} xs={5} >
                    <TextField required="required" type="email" onChange={(e)=>setData((prev)=>({...prev,email:e.target.value}))} label="Email"   sx={{marginTop:5,width:"100%"}} />
                    </Grid>
                    <Grid item md={4} sm={5} xs={5}  >
                    <TextField type="password" onChange={(e)=>setData((prev)=>({...prev,password:e.target.value}))} label="Password" sx={{marginTop:5,width:"100%"}} />
                    </Grid> 
                    </Box>
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
                    <BasicSelect onChange={(e)=>setData((prev)=>({...prev,course:e}))}   marginTop={5} age={course} setAge={setCourse} id = {val} status="course"  course1="web Development" course2="Mobile Development" course3="App Development" />
                    </Grid>
                    <Grid item md={4} sm={5} xs={5}  >
                    <BasicSelect onChange={(e)=>setData((prev)=>({...prev,section:e}))} marginTop={5}  id={idSection} status="section"  course1="A" course2="B" course3="C" sx={{marginTop:5}} />
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
                    <Box sx={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
                    <Button onClick={tranferDatatoDataBase}  variant="contained" sx={{width:"30%",marginTop:5,marginBottom:5,padding:2}} >Register Student</Button>
                    </Box>
                    <Box sx={{display:"flex",width:"100%",marginBottom:5,flexDirection:"row",justifyContent:"center"}} >
                    <Button onClick={()=>navigate("/")} sx={{width:"30%",border:"1px solid blue",padding:1,color:"blue"}}   variant="standard">Back to Login</Button>
                    

                    </Box>
                   
                   
                    
                </Box>

            </Grid>
            </Box>
        </Grid>
            </Box>

    )

}

export default RegistrationForm