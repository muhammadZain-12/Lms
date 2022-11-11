import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  update,
} from "firebase/database";
import app from "../config/FirebaseConfig";
import { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
// import { DataGrid } from '@mui/x-data-grid';
import { DataGrid } from "@mui/x-data-grid";
import { CheckBox } from "@mui/icons-material";

const Database = getDatabase(app);

function QuizData() {
  const [val, setVal] = useState([]);
  const [value, setValue] = useState([]);


  const column = [
    {
      field: "id",
      headerName: "ID",
      width: "50",
    },
    {
      field: "quizName",
      headerName: "Quiz Name",
      width: "300",
    },
    {
      field: "course",
      headerName: "Category",
      width: "300",
    },
    {
      field: "question",
      headerName: "Question",
      width: "400",
    },
    {
      field: "options",
      headerName: "Options",
      width: "400",
    },

    {
      field: "correctAnswer",
      headerName: "Correct Answer",
      width: "300",
    },
    {
      field: "timeDuration",
      headerName: "Time Duration (in Minutes)",
      width: "300",
    },
  ];

  const GetValueFromDb = () => {
    const reference = ref(Database, `quiz`);
    onValue(reference, (e) => {
      if (e.exists()) {
        let data = e.val();
        // console.log(data,"data")

        let values = Object.values(data);
        console.log("VALUEs", values);
        setVal(values);
      }
    });
  };

  const GetTable = () => {
    let allQuizes = [];
    val.map((item, index) => {
      console.log(val,"val")
      item.map((values, index) => {
                console.log(values,"valuess")
        allQuizes.push({
          ...values,
          id: allQuizes.length + 1,

          options:values.options?values.options.map((e,i)=>e.txt):"",
          // options: value.options.map((val, ind) => {
          //   return val.txt;
          // }),
          correctAnswer: values.options?values.options
            .filter((item) => item.correctAnswer)
            .map((val, ind) => {
              return val.txt;
            }):"",
        });
      });
    });
    setValue(allQuizes);

  };
  
console.log(value,"values")

  useEffect(() => {
    GetValueFromDb();
  }, []);

  useEffect(() => {
    GetTable();
  }, [val]);

  // useEffect(()=>{
  //       getAllData()
  // },[row])

  return (
    <div>
      <h1>Quiz Data</h1>
      
      <Box height={500}>
          {value ? <DataGrid columns={column} rows={value} /> : ""}
        </Box>
      
    </div>
  );
}

export default QuizData;
