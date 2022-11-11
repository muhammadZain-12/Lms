import { Box, Button, Grid, Typography } from "@mui/material";
import { getDatabase, ref, set, push, onValue, update } from "firebase/database";
import app from "../config/FirebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import loaderImage from "../assets/loaderImage.gif"
import { DataGrid } from "@mui/x-data-grid";


const Database = getDatabase(app);

function StudentData() {
  const [val, setVal] = useState("");
  const [value,setValue] = useState([])

  const getDataFromDb = () => {
    const reference = ref(Database, `students`);
    onValue(reference, (e) => {
      if (e.exists()) {
        setVal(e.val())
         
      }
    });
  };


  const column = [
    {
      field: "id",
      headerName: "ID",
      width: "50",
    },
    {
      field: "firstName",
      headerName: "Student Name",
      width: "200",
    },
    
    {
      field: "lastName",
      headerName: "Last Name",
      width: "200",
    },
    {
      field: "fatherName",
      headerName: "Father Name",
      width: "200",
    },
    {
      field: "course",
      headerName: "Category",
      width: "100",
    },
    {
      field: "section",
      headerName: "Section",
      width: "100",
    },
    {
      field: "email",
      headerName: "Email Address ",
      width: "250",
    },
    {
      field: "dateOfBirth",
      headerName: "Date Of Birth ",
      width: "150",
    },
    
    {
      field: "cnic",
      headerName: "Cnic ",
      width: "150",
    },
    {
      field: "contact",
      headerName: "Contact",
      width: "150",
    },
    {
      field: "fatherContact",
      headerName: "Father Contact",
      width: "150",
    },
    {
      field: "emergencyContact",
      headerName: "Emergency Contact",
      width: "150",
    },
    {
      field: "age",
      headerName: "Age",
      width: "100",
    },
    {
      field: "rollno",
      headerName: "Roll No",
      width: "100",
    },
    {
      field: "registrationDate",
      headerName: "Registration Date ",
      width: "200",
    },
    
  ];

  

const getTable = () => {

let   values = Object.values(val);

   setValue(values.filter((e,i)=>{
        return e
  }).map((event,ind)=>{
    return {
      ...event,
      id:ind+1
    }
  }))
}

console.log(value,"value")


  useEffect(() => {
    getDataFromDb();
  }, []);


useEffect(()=>{
  getTable()
},[val])







  return (
    val?
    <div>

     
    <Box sx={{height:"90vh"}} >
      <DataGrid rows={value} columns = {column} />
      </Box>
      </div>
    :
    <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center"}} >
    <Box sx={{display:"flex",alignItems:"center",flexDirection:"column",justifyContent:"center",marginTop:10}} >
        <Typography variant="h5"  >Please Wait!</Typography>
        <Typography variant="h5" >Fetching Data</Typography>
    </Box>
    <img src={loaderImage} width="100%" height="250" alt=""  />
    </Box>
  );
}

export default StudentData;
