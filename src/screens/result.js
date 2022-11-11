import { useEffect,useState } from "react"
import BasicSelect from "../components/dropDown"
import { getDatabase,ref,onValue } from "firebase/database"
import app from "../config/FirebaseConfig"
import { Box,Grid,Typography,TextField,Button } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid";

let database = getDatabase(app)

function Result() {
    
const [categories,setCategories] = useState([])
const [selectedCategory,setSelectedCategory] = useState("")
const [resultData,setResultData] = useState([])
const [inputRollNo,setInputRollNo] = useState("")
const [showResultData,setShowResultData] = useState([])
const [showSelectedResult,setShowSelectedResult] = useState({})
const [searchResultData,setSearchResultData] = useState([])
const [showSearchResult,setShowSearchResult] = useState({})
useEffect(()=>{
    const reference = ref(database,`result`)
    onValue(reference,(e)=>{
        if(e.exists()){
            let value = e.val()
            let values = Object.values(value)
            setResultData(values)
           let  valuess = values.map((e,i)=>{
            return e.course
           })
           valuess = new Set(valuess)
           valuess = {...[...valuess]}

           setCategories(valuess)
            

        }
    })
},[])


const showResult = () => {
        let searchData = []
    resultData.map((e,i)=>{
      if(selectedCategory){
      e.isShowResult&&selectedCategory==e.course&&e.result.filter((event,ind)=>{
                  if(event.rollNo == inputRollNo){
                    searchData.push({
                      ...event,
                      id:searchData.length+1}
                      )
                  } 
      })}
      else{
        e.isShowResult&&e.result.filter((event,ind)=>{
          if(event.rollNo == inputRollNo){
            searchData.push({
              ...event,
              id:searchData.length+1}
              )
          } 
})
      }
      })
    
  setSearchResultData(searchData)


    setShowSelectedResult({})
    setShowResultData([])
    setShowResultData(resultData.filter((e,i)=>{
     

        if(e.course==selectedCategory&&e.isShowResult){
            return e
        }
    }))


  
  console.log(showResultData)
}

const column = [
    {
      field: "id",
      headerName: "ID",
      width: "100",
    },
    {
      field: "name",
      headerName: "Student Name",
      width: "230",
    },
    {
      field: "rollNo",
      headerName: "Roll No",
      width: "150",
    },
    {
      field: "marks",
      headerName: "Marks",
      width: "150",
    },
    {
      field: "result",
      headerName: "Result",
      width: "150",
    },

  ];

const results  =  () => {
      let pushResult = []
        showResultData.map((e,i)=>{
            
        e.result.map((x,ind)=>{
              pushResult.push({
                ...x,
                id:pushResult.length+1
              })
                       })
})
setShowSelectedResult(pushResult)
pushResult=[]
}




useEffect(()=>{
    results()
},[showResultData])




    return (
        <Box sx={{backgroundColor:"blue",maxHeight:"fitContent",minHeight:"110vh"}}>
            <Grid sx={{display:"flex",justifyContent:"center",flexDirection:"column",width:"100%",padding:5,alignItems:"center"}} container >
                <Grid sx={{display:"flex",justifyContent:"center",width:"100%",backgroundColor:"white"}} item md={8} >
                    <Box sx={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",paddingBottom:5}} >
        <Typography sx={{mt:5,mb:2}} variant="h4" >Result</Typography>
        <Box sx={{display:"flex",width:"100%",justifyContent:"space-around"}} >
        <Box sx={{width:"30%"}}>
        <BasicSelect  status="Course" id={categories} onChange={(e)=>setSelectedCategory(e)} /> 
        </Box>
        <TextField onChange={(e)=>setInputRollNo(e.target.value)} sx={{width:"30%"}}  label = "Enter Roll No"  />
        <Button onClick={showResult} sx={{width:"25%",border:"1px solid blue"}} >Show Result</Button>
        </Box>
        
        </Box>
        
        </Grid>
        <Grid sx={{width:"100%"}} item md={8}>
        <Box sx={{height:500,display:"flex",width:"100%",mb:5,display:"flex",justifyContent:"center"}} >
          {searchResultData&&searchResultData.length>0?
          <Box sx={{width:"100%",backgroundColor:"white",padding:5}} >
          <DataGrid  columns={column} rows={searchResultData} /> 
          </Box>
          :showSelectedResult&&showSelectedResult.length>0&&
          <Box sx={{width:"100%",backgroundColor:"white",padding:5}} >
          <DataGrid  columns={column} rows={showSelectedResult} /> 
          </Box> 
        }
        </Box>
        </Grid>
        </Grid>
        
        </Box>
        
    )
} 

export default Result