import { Grid,Box,Typography,TextField,Button } from "@mui/material"
import { useEffect, useState } from "react"
import { getDatabase,ref,push, onValue, update, remove } from "firebase/database"
import app from "../config/FirebaseConfig"
import { DataGrid } from "@mui/x-data-grid"
import BasicSelect from "../components/dropDown"

const database = getDatabase(app)
function Cities ()  {

    const [data,setData] = useState({
        countryName:"",
        cityName:"",
        cityCode:""
    })
    const [cityData,setCityData] = useState({})
    const [countries,setCountries] = useState([])

    const submitDatainDb = () => {
        console.log(data,"data")  
        const reference = ref(database,`cities`)
        push(reference,data)
    
    }

    const getCityData = () => {
        const reference = ref(database,`cities`)
        onValue(reference,(e)=>{
            if(e.exists()){
                let val = e.val()
                let values = Object.values(val)
                let keys = Object.keys(val)
                keys.map((x)=>{
                    setCityData(values.map((e,i)=>{
                        return{
                            ...e,
                            id:i+1,
                            uid:x
    
                        }
                    }))    
                })
                
    }
    })
    }
const getDataFromDb = () => {
    const reference = ref(database,`countries`)
    onValue(reference,(e)=>{
        if(e.exists()){
            let val = e.val()
            let values = Object.values(val)
            values = values.map((e,i)=>{
                console.log("saasdas",e)
                return e.country
            })
        setCountries(values)
        }
    })
}


useEffect(()=>{
        getDataFromDb()
        getCityData()
},[])

const deleteData = (event) => {
        let uid = event.uid
    const reference = ref(database,`cities/${uid}`)
    remove(reference)
    
    

}

const column = [
    {
      field: "id",
      headerName: "ID",
      width: "50",
    },
    {
      field: "countryName",
      headerName: "Country Name",
      width: "250",
    },
    {
        field: "cityName",
        headerName: "City Name",
        width: "250",
      },
    {
      field: "cityCode",
      headerName: "City Code",
      width: "150",
    },
    {
        field: "action",
        headerName: "Action",
        width: "150",
        renderCell:(cellValues)=>{
            return <Button variant="contained" onClick={()=>deleteData(cellValues.row)} sx={{border:"1px solid blue",width:"100px"}} >Delete</Button>
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
                  ADD Cities
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: 3,
                  }}
                >
                <Box sx={{width:"30%"}} >

                <BasicSelect status="Country Name" id={countries} onChange={(e)=>setData((prev)=>({...prev,countryName:e}))} />
                </Box>
                  <TextField
                    value={data.cityName}
                    onChange={(e) =>
                      setData((prev) => ({ ...prev, cityName: e.target.value }))
                    }
                    
                    variant="standard"
                    label="City Name"
                    sx={{ width: "30%" }}
                  />
                  <TextField
                    value={data.cityCode}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        cityCode: e.target.value,
                      }))
                    }
                    
                    variant="standard"
                    label="City Code"
                    sx={{ width: "30%" }}
                  />
                  
                </Box>
                <Button onClick={submitDatainDb} sx={{mt:5,border:'1px solid green',color:"green",boxShadow:3,width:"30%",padding:1,fontWeight:700}} >Submit City</Button>
                </Box>
                <Box  sx={{height:"300px",backgroundColor:"white"}} >
                   {cityData?<DataGrid  rows={cityData} columns={column} />:""}
                </Box>
                </Grid>
                </Grid>
                </Box>

)
}
export default Cities

