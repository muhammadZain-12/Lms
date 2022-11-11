import { Grid,Box,Typography,TextField,Button } from "@mui/material"
import { useEffect, useState } from "react"
import { getDatabase,ref,push, onValue, remove } from "firebase/database"
import app from "../config/FirebaseConfig"
import { DataGrid } from "@mui/x-data-grid"

const database = getDatabase(app)
function Countries  ()  {

    const [data,setData] = useState({
        country:"",
        countryCode:"",
        currency:""
    })
    const [countryData,setCountryData] = useState({})


    const submitDatainDb = () => {
        console.log(data,"data")  
        const reference = ref(database,`countries`)
        push(reference,data)
    
    }

const getDataFromDb = () => {
    const reference = ref(database,`countries`)
    onValue(reference,(e)=>{
        if(e.exists()){
            let val = e.val()
            let values = Object.values(val)
            let keys = Object.keys(val)
            keys.map((x)=>{
                values = values.map((e,i)=>{
                    return {
                        ...e,
                        id:i+1,
                        uid:x
                    }
                })
            })
            
        setCountryData(values)
        }
    })
}

useEffect(()=>{
        getDataFromDb()
},[])

const deleteCountry = (event) => {
    const uid = event.uid
    const reference = ref(database,`countries/${uid}`)
    remove(reference)
}




const column = [
    {
      field: "id",
      headerName: "ID",
      width: "50",
    },
    {
      field: "country",
      headerName: "Country Name",
      width: "210",
    },
    {
      field: "countryCode",
      headerName: "Country Code",
      width: "210",
    },
    {
        field: "currency",
        headerName: "Country Currency",
        width: "210",
      },
      {
        field: "action",
        headerName: "Actions",
        width: "210",
        renderCell:(cellValue)=>{
            return <Button onClick={()=>deleteCountry(cellValue.row)} variant="contained" >Delete</Button>
        }
      },

]
    return (
        <Box>
          <Grid sx={{ display: "flex", justifyContent: "center",backgroundColor:"#125491",maxHeight:"fit-content",minHeight:"90vh" }} container>
            <Grid item md={8}>
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
                  ADD COUNTRIES
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: 3,
                  }}
                >
                  <TextField
                    value={data.courseName}
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, country: e.target.value }))
                    }
                    
                    variant="standard"
                    label="Country Name"
                    sx={{ width: "30%" }}
                  />
                  <TextField
                    value={data.courseDuration}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        countryCode: e.target.value,
                      }))
                    }
                    
                    variant="standard"
                    label="Country Code"
                    sx={{ width: "30%" }}
                  />
                  <TextField
                    value={data.courseDuration}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        currency: e.target.value,
                      }))
                    }
                    
                    variant="standard"
                    label="Country Currency"
                    sx={{ width: "30%" }}
                  />
                </Box>
                <Button onClick={submitDatainDb} sx={{mt:5,border:'1px solid green',color:"green",boxShadow:3,width:"30%",padding:1,fontWeight:700}} >Submit Country</Button>
                </Box>
                <Box  sx={{height:"300px",backgroundColor:"white"}} >
                   {countryData?<DataGrid  rows={countryData} columns={column} />:""}
                </Box>
                </Grid>
                </Grid>
                </Box>

)
}
export default Countries