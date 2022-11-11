import { Box,Typography,Button } from "@mui/material"
import { getDatabase,ref,onValue } from "firebase/database"
import { useEffect,useState, } from "react"
import app from "../config/FirebaseConfig"
import { DataGrid } from "@mui/x-data-grid";
import loaderImage from "../assets/loaderImage.gif"
const database = getDatabase(app)


function CourseFormData(){

const [value,setValue] = useState([])
const [row,setRow] = useState([])


const getDataFromDb = () => {
    const reference = ref(database,"courses")
    onValue(reference,(e)=>{
        if(e.exists()){
            let val = e.val()
            val = Object.values(val)
            setValue(val)
        }
    })
}

const column = [
    {
      field:"id", headerName:"ID",width:"50"
    },
    {
      field:"courseName", headerName:"Course Name",width:"300"
    },
    {
      field:"courseDuration", headerName:"Course Duration",width:"300"
    },
    {
      field:"isFormOpen", headerName:"isFormOpen",width:"300"
    },
    {
      field:"noOfQuiz", headerName:"No Of Quiz",width:"300"
    },
    {
      field:"feesInRupees", headerName:"Fees (inRupees)",width:"300"
    },
    {
      field:"leadTrainerId", headerName:"Lead Trainer",width:"300"
    },
    {
      field:"assistantTrainers", headerName:"Assistant Trainers",width:"300"
    },
    
  ]

console.log(row,"row")



  const GetTable = () => {

    setRow(value.map((row,index)=>{
        
        return    {
          id:index+1,
          courseName:row.courseName,
          courseDuration:row.courseDuration,
          isFormOpen:row.isFormOpen,
          noOfQuiz:row.noOfQuiz,
          feesInRupees:row.feesInRupees,
          leadTrainerId:row.leadTrainerId,
          assistantTrainers:row.assistantTrainers.map((e,i)=>e)
        }
    })
    )
    }


useEffect(()=>{
        getDataFromDb()
},[])
useEffect(()=>{
    GetTable()
},[value])
const getData = () => {
  alert("hello")
}


    return (
        row.length?
        <Box>
          <Typography sx={{color:"purple",marginTop:3,marginLeft:2,backgroundColor:"white"}} variant="h4" >COURSE FORM DATA</Typography>
        <Box sx={{height:"75vh",padding:2,marginTop:0,backgroundColor:"white"}} >
            
            {row.length?<DataGrid rows={row} sx={{color:"purple",fontSize:"16px",border:"1px solid black",boxShadow:5}}  columns={column} />:""}
        
        </Box>
        </Box>
        :
        <Box sx={{display:"flex",flexDirection:"column",marginTop:10}} >
        <Box sx={{display:"flex",flexDirection:"column",alignItems:"center"}} >
          <Typography variant="h5" >Please wait!</Typography>
          <Typography variant="h5" >Fetching Data</Typography>
        </Box>
        <img src={loaderImage} width="100%" height="200" />
        </Box>
    )
}

export default CourseFormData