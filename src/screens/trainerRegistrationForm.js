import { Grid,Box,Typography,TextField,Button } from "@mui/material"
import { useEffect, useState } from "react"
import { getDatabase,ref,push, onValue, remove } from "firebase/database"
import app from "../config/FirebaseConfig"
import { DataGrid } from "@mui/x-data-grid"
import BasicSelect from "../components/dropDown"
import MultipleSelect from "../components/multipleSelect"
import BasicTooltip from "../components/toolTip"

const database = getDatabase(app)

function TrainerRegistrationForm () {
    

    const initialData = {

        firstName:"",
        lastName:"",
        cnic:"",
        qualification:"",
        otherQualification:[],
        contactNumber:"",
        coursesAllowed:[],
        country:"",
        city:""
    }

    const [data,setData] = useState(initialData)
    const [courses,setCourses ] = useState()
    const [qualification,setQualification] = useState("")
    const [countryNames,setCountryNames] = useState({})
    const [cityNames,setCityNames] = useState({})
    const [cityData,setCityData] = useState([])
    const [cities,setCities] = useState({})


const getCoursesDataFromDb = () => {

    if(cities){
        
    const reference = ref(database,`formControl`)
    onValue(reference,(e)=>{
        if(e.exists()){
            let val = e.val()
            let values = Object.values(val)

            values.map((e,i)=>{
               
                let courses = [];
                
                if(e.isFormOpen){
                values.map((x)=>{
                    x.cityName.map((value)=>{
                        if(value==data.city&&x.isFormOpen=="open"){
                            courses.push(x.course)
                        }
                    })
                    
                })

            }    
            courses = new Set(courses)
            courses = [...courses]
            
            setCourses(courses)    
        })

        
        // let categories = new Set(courses)
        // categories = [...categories]
        // setCourses(categories)          
    }
})
}

}



const getCityDataFromDb = () => {
    const reference = ref(database,`cities`)
    onValue(reference,(e)=>{
        if(e.exists()){
            let val = e.val()
            let values = Object.values(val)
            setCityData(values)
            let country = []
            values.map((e,i)=>{
                country.push(e.countryName)    
            })
                country = new Set(country)
                country = {...[...country]}
                setCountryNames(country)

            let city = []

           
            
                    }
    })
}
const getFilteredCityData = () =>{
    data.country&&data.country.length>0&&
    setCityNames(cityData.filter((e,i)=>{
        return e.countryName == data.country
}))

}

const getCities = () =>{
    let city = []
    cityNames&&cityNames.length>0&& 
    cityNames.map((e,i)=>{
        return city.push(e.cityName)
    })
    city = new Set(city)
    city = {...[...city]}
    setCities(city)
    
}

useEffect(()=>{
    getCoursesDataFromDb()
},[cities])

useEffect(()=>{
    
    getCityDataFromDb()
},[])

useEffect(()=>{
        getFilteredCityData()
},[data])
useEffect(()=>{
    getCities()
},[cityNames])


const getQualificationFromTrainer = () => {
    setData({...data,otherQualification:[...data.otherQualification,qualification]})
    setQualification("")
}


const deleteQualification = (ind) => {
    
    setData({...data,otherQualification:data.otherQualification.filter((e,i)=>{
        return i !== ind
    })
    
})}



const showOtherQualification = data.otherQualification&&data.otherQualification.map((e,i)=>{
    return (
        <Box key={i} sx={{ml:2,flexDirection:"row",display:"flex"}}  >
            <Typography  variant="h5" >{i+1}: {e} <BasicTooltip ID={deleteQualification} value={i}  /> </Typography>
            
        </Box>
    )
})

const submitTrainerInDb = () => {

    let values = Object.values(data)
    let flag = values.some((e)=>{
        if(e==""||e==[]){
            return e

        }
        
        
    }
    )
    if(flag){
        alert("Fill All Inputs")
    }
    else{
        
    const reference = ref(database,`trainers`)
    push(reference,data).then(()=>{
        alert("Your Data Has been Successfully Submitted")
        setData(initialData)

    }).catch(()=>{
        alert("Your Data Not Found")
    })
    }

}






    return (
        <Box>
          <Grid sx={{ display: "flex", justifyContent: "center",backgroundColor:"#125491",maxHeight:"fit-Content",minHeight:"100vh" }} container>
            <Grid item md={7}>
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
                  Trainer Registration Form
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
                     <Box sx={{width:"45%",mt:5}} >
                        <TextField value={data.firstName} variant="standard" label="First Name" onChange={(e)=>setData({...data,firstName:e.target.value})} fullWidth />
                    </Box>
                    <Box sx={{width:"45%",mt:5}} >
                        <TextField value={data.lastName} variant="standard" label="Last Name" onChange={(e)=>setData({...data,lastName:e.target.value})} fullWidth />
                    </Box>
                    <Box sx={{width:"45%",mt:5}} >
                <BasicSelect value={data.country} id={countryNames} status="Country Name" onChange={(e)=>setData({...data,country:e})}   />
                    </Box>
                    <Box sx={{width:"45%",mt:5}} >
                <BasicSelect value={data.city} id={cities} status="City Name" onChange={(e)=>setData({...data,city:e})}   />
                    </Box>
                    <Box sx={{width:"45%",mt:5}} >
                        <TextField value={data.cnic} variant="standard" label="Cnic Number" onChange={(e)=>setData({...data,cnic:e.target.value})} fullWidth />
                    </Box>
                    <Box sx={{width:"45%",mt:5}} >
                        <TextField value={data.qualification} variant="standard" label="Qualification" onChange={(e)=>setData({...data,qualification:e.target.value})} fullWidth />
                    </Box>
                    <Box sx={{width:"60%",mt:5}} >
                        <TextField value={qualification} variant="standard" onChange={(e)=>setQualification(e.target.value)} label="Other Qualification" fullWidth />   
                    </Box>
                    <Box sx={{width:"30%",display:"flex",alignItems:"flex-end"}} >
                    <Button  onClick={getQualificationFromTrainer} sx={{width:"100%",height:"50%"}}  variant="contained" >Submit</Button>
                    </Box>
                    <Box sx={{mt:2,display:"flex",width:"100%",flexDirection:"column"}} >
                    {showOtherQualification&&showOtherQualification}
                    </Box>
                    <Box sx={{width:"45%",mt:5}} >
                        <TextField value={data.contactNumber} variant="standard" label="Contact Number" onChange={(e)=>setData({...data,contactNumber:e.target.value})} fullWidth />   
                    </Box>
                    <Box sx={{width:"45%",mt:5}} >
                <MultipleSelect value={data.coursesAllowed} id={courses} status="Apply For Courses" onChange={(e)=>setData({...data,coursesAllowed:e})}   />
                    </Box>
                 
                    <Box sx={{display:"flex",justifyContent:"center",width:"100%",mt:5}} >
                        <Button onClick={submitTrainerInDb} sx={{width:"50%",padding:1.2}} variant="contained" >
                            Submit Form
                        </Button>
                    </Box>
                    </Box>
                    </Box>
                    </Grid>
                    </Grid>
                    </Box>

                    )
}

export default TrainerRegistrationForm;
