
import { getDatabase, ref, set, push, onValue, update } from "firebase/database";
import app from "../config/FirebaseConfig";
import { useEffect,useState } from "react";
import { Box, Button, Grid } from "@mui/material";
// import { DataGrid } from '@mui/x-data-grid';
import { DataGrid } from "@mui/x-data-grid";

const Database = getDatabase(app);

function QuizData() {

const [val,setVal] = useState([])
const [row,setRow] = useState([])

 const column = [
  {
    field:"id", headerName:"ID",width:"50"
  },
  {
    field:"category", headerName:"Category",width:"100"
  },
  {
    field:"question", headerName:"Question",width:"400"
  },
  {
    field:"option1", headerName:"Option1",width:"300"
  },
  {
    field:"option2", headerName:"Option2",width:"300"
  },
  {
    field:"option3", headerName:"Option3",width:"300"
  },
  {
    field:"option4", headerName:"Option4",width:"300"
  },
  {
    field:"correctAnswer", headerName:"Correct Answer",width:"300"
  },
]

const GetValueFromDb  = () => {
  const reference = ref(Database,`quiz`)
  onValue(reference,(e)=>{
    if(e.exists()){
      let data = e.val()
      let values = Object.values(data)
      console.log(values,"values")
      setVal(values)
    }
  })
}

const GetTable = () => {

setRow(val.map((row,index)=>{

  return  {
      id:index+1,
      category:row.course,
      question:row.question,
      option1:row.options1,
      option2:row.options2,
      option3:row.options3,
      option4:row.options4,

      correctAnswer:row.correctAnswer
    
    }
}))
}



useEffect(()=>{
  GetValueFromDb()
  
},[])

useEffect(()=>{
  GetTable()
},[val])


  return (
    <div>
      <h1>Quiz Data</h1>
      <Box height={500} >

        {row?<DataGrid columns={column} rows={row} />:""}
      </Box>

      

        
    </div>
  );
}




export default QuizData