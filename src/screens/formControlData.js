import { DataGrid } from "@mui/x-data-grid"
import { getDatabase,ref,onValue, Database } from "firebase/database"
import { useState } from "react"
import { useEffect } from "react"
import { Box } from "@mui/material"
import app from "../config/FirebaseConfig"

const database = getDatabase(app)


function FormControlData () {

    const [data,setData] = useState([])

const getDataFromDb = () => {
    const reference = ref(database,`formControl`)
    onValue(reference,(e)=>{
        if(e.exists()){
            let val = e.val()
            let value = Object.values(val)
            setData(value.map((e,i)=>{
                return {
                    ...e,
                    id:i+1,
                    // cityName:e.cityName&&e.cityName.map((e,i)=>e)
                }
            }))
        }
    })
}

useEffect(()=>{
    getDataFromDb()
},[])


const columns = [

        {
          field: "id",
          headerName: "ID",
          width: "50",
        },
        {
          field: "course",
          headerName: "Course Name",
          width: "300",
        },
        {
          field: "isFormOpen",
          headerName: "Is Form Open",
          width: "300",
        },
        {
          field: "countryName",
          headerName: "Open In Country",
          width: "400",
        },
        {
          field: "cityName",
          headerName: "open In Cities",
          width: "400",
        },
        {
            field: "dateOfAdmissionStart",
            headerName: "Date Of Admission Start",
            width: "400",
          },
          {
            field: "dateOfAdmissionEnd",
            headerName: "Date Of Admission End",
            width: "400",
          },
]


console.log(data,"data")

    return (
        <>
        <h2>Form Control Data</h2>
        <Box sx={{height:"500px"}} >
        <DataGrid rows={data} columns={columns} />
        </Box>
        </>
    )
}

export default FormControlData