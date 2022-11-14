import { getDatabase,ref,onValue, remove } from "firebase/database"
import app from "../config/FirebaseConfig"
import { DataGrid } from "@mui/x-data-grid"
import { Box } from "@mui/system"
import { useEffect } from "react"
import { useState } from "react"
import { Button } from "@mui/material"

const database = getDatabase(app)


function TrainerData () {
    
const [trainerData,setTrainerData] = useState([])

const getDataFromDb = () => {
    const reference = ref(database,`trainers`)
    onValue(reference,(e)=>{
        if(e.exists()){
            let val = e.val()
            let values = Object.values(val)
            let keys = Object.keys(val)

            keys.map((e,i)=>{
               setTrainerData (values.map((x,ind)=>{
                    return {
                        ...x,
                        id:ind+1,
                        uid:e
                    }
                }))
            })

        }
    })
}

useEffect(()=>{

    getDataFromDb()

},[])


const deleteValue = (e) => {
    console.log(e)
    const uid = e.uid
    console.log(uid)
    const reference = ref(database,`trainers/${uid}`)
    remove(reference)
}

const columns = [

    {
      field: "id",
      headerName: "ID",
      width: "50",
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: "300",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: "300",
    },
    {
      field: "contactNumber",
      headerName: "Contact Number",
      width: "400",
    },
    {
      field: "cnic",
      headerName: "Cnic Number",
      width: "400",
    },
    {
      field: "country",
      headerName: "Country Name",
      width: "400",
    },
    {
      field: "city",
      headerName: "City Name",
      width: "400",
    },
    {
        field: "coursesAllowed",
        headerName: "Applied For Courses",
        width: "400",
      },
      {
        field: "qualification",
        headerName: "Qualification",
        width: "400",
      },
      {
        field: "otherQualification",
        headerName: "Other Qualifications",
        width: "400",
          
    },
    {
        field: "action",
        headerName: "Action",
        width: "400",
        renderCell:(cellValues)=>{

            return <Button variant="contained" onClick={()=>deleteValue(cellValues.row)} >Delete</Button>
          }
    }
      
]




    return (
        <Box>
        <h2>
        Trainer Data
        </h2>
        <Box sx={{height:"500px"}} >
            <DataGrid rows={trainerData} columns={columns} />
        </Box>
    </Box>
    )
}




export default TrainerData