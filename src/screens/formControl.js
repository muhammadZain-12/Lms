import { Grid,Box,Typography,TextField,Button } from "@mui/material"
import { useEffect, useState } from "react"
import { getDatabase,ref,push, onValue, remove } from "firebase/database"
import app from "../config/FirebaseConfig"
import { DataGrid } from "@mui/x-data-grid"
import BasicSelect from "../components/dropDown"
import MultipleSelect from "../components/multipleSelect"
import QuizData from "./QuizData"
import DatePickers from "../components/basicDatePicker"

const database = getDatabase(app)

function FormControl () {

let initialData = {
    course : "",
    isFormOpen:"",
    countryName:"",
    cityName :[],
    dateOfAdmissionStart:"",
    dateOfAdmissionEnd:""
}

    const [data,setData] = useState(initialData)
    const [cityData,setCityData] = useState([])
    const [country,setCountry]  = useState([])
    const [city,setCity] = useState([])
    const [courses,setCourses] = useState([])

const getDataFromDb = () => {
    const reference = ref(database,`courses`)
    onValue(reference,(e)=>{
        if(e.exists()){
         let val = e.val()
            let values = Object.values(val)
           values =  values.map((e,i)=>{
                return e.courseName 
            })
            values = new Set(values)
            values = {...[...values]}
            setCourses(values)
        }
    })
}

useEffect(()=>{
    getDataFromDb()
    getCityData()
},[])

const getCityData = () =>{
    const reference = ref(database,`cities`)
    onValue(reference,(e)=>{
        if(e.exists()){
         let val = e.val()
        val =  Object.values(val)
         setCityData(val)
         
        let values = Object.values(val)
        values = values.map((e,i)=>{
            return e.countryName
        })
        values = new Set(values)
        values = {...[...values]}
        console.log(values,"country")
        setCountry(values)
            
    }
        
    })
}

console.log(data,"data")

const getCity = () => {
    
    
    cityData&&data.countryName.length>0&&
    
    setCity(cityData.filter((e,i)=>{
        return e.countryName == data.countryName
    }))
    
    
}

console.log(city,"city")

useEffect(()=>{
    getCity()
},[data])

let isFormOpen = {
    open:"open",
    close:"close"
}

const sendFormControlToDb = () => {
    const reference = ref(database,`formControl`)
    push(reference,data).then(()=>{
        alert("Your Data Has been Successfully Registered")
        setData(initialData)
        setCity([])
    }).catch(()=>{
        alert("Data Not Found")
    })
    
}


    return (
        <Box>
          <Grid sx={{ display: "flex", justifyContent: "center",backgroundColor:"#125491",maxHeight:"fit-content",minHeight:"90vh" }} container>
            <Grid item md={6}>
              <Box
                sx={{
                  backgroundColor:"white",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: 5,
                  border: "1px solid green",
                  boxShadow: 10,
                  padding: 5,
                  marginTop: 5,
                }}
              >
                <Typography variant="h3" sx={{ color: "green" }}>
                  {" "}
                  Form Control
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    flexWrap:"wrap",
                    marginTop: 3,

                  }}
                >
                     <Box sx={{width:"40%"}} >
                <BasicSelect value={data.course}   status="Course" id={courses}  onChange={(e)=>setData({...data,course:e})} />
                    </Box>
                    <Box sx={{width:"40%"}} >
                <BasicSelect value={data.isFormOpen} status="is Form Open" id={isFormOpen}  onChange={(e)=>setData({...data,isFormOpen:e})}   />
                    </Box>
                    <Box sx={{width:"40%",mt:5}} >
                <BasicSelect value={data.countryName} status="Country Name" id={country}    onChange={(e)=>setData({...data,countryName:e})}   />
                    </Box>
                    <Box sx={{width:"40%",mt:5}} >
                <MultipleSelect value={data.cityName} status="City Name" id={city.length?city:["zaon","boadas"]}    onChange={(e)=>setData({...data,cityName:e})}   />
                    </Box>
                  <Box sx={{width:"40%",mt:5}} >
                        <DatePickers  values={data.dateOfAdmissionStart} onChange={(e)=>setData({...data,dateOfAdmissionStart:e})} label="Date Of Admission Start" />
                  </Box>
                  <Box sx={{width:"40%",mt:5}} >
                        <DatePickers value={data.dateOfAdmissionEnd} onChange={(e)=>setData({...data,dateOfAdmissionEnd:e})} label="Date Of Admission End" />
                  </Box>
                  <Box sx={{width:"100%",mt:5,display:"flex",justifyContent:"center"}} >
                  <Button onClick={sendFormControlToDb} sx={{width:"50%",border:"1px solid green",boxShadow:3,color:"green"}} >Submit Form</Button>
                  </Box>
                    
                  
                </Box>
                </Box>
                </Grid>
                </Grid>
                </Box>
    )
}

export default FormControl