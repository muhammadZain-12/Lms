import { Box, Button, Grid } from "@mui/material";
import { getDatabase, ref, set, push, onValue, update } from "firebase/database";
import app from "../config/FirebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { OpenInBrowserOutlined } from "@mui/icons-material";

const Database = getDatabase(app);

function StudentData() {
  const [val, setVal] = useState("");

  const getDataFromDb = () => {
    const reference = ref(Database, `students`);
    onValue(reference, (e) => {
      if (e.exists()) {
        setVal(e.val())
         
      }
    });
  };

  let keys = Object.keys(val);

  let values = Object.values(val);
  console.log(values,"values")

  useEffect(() => {
    getDataFromDb();
  }, []);









  let data = values.map((e, i) => {
        return (
            <div>
                
            <div>
            
            <Grid sx={{  width: "inherit",display:"flex",justifyContent:"center" }} key={i} container>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                AlignItems: "center",
                width: "90%",
                
              }}
            >
            
              <Grid item md={12} sm={12} xs={12}>
                <Box id="grid-box"
                  sx={{padding:'1',display:"flex",border:"1px solid black",justifyContent:"center",flexDirection:{xs:"column",md:"row",sm:"row"}}}
                >   
                    
                    <Grid sx={{display:"flex",justifyContent:"center"}} item md={2} sm={4.5} xs={8}  >
                  <h3>{e.firstName}</h3>
                  </Grid>
                  <Grid item md={1} sx={{justifyContent:"center",display:{xs:"none",md:"flex",sm:"block"}}} >
                  <h3>{e.course}</h3>
                  </Grid>
                  <Grid item md={.5}  sx={{justifyContent:"center",display:{xs:"none",md:"flex"}}}  >
                  <h3>{e.section}</h3>
                  </Grid>
                  <Grid item md={1.5} sm={1} sx={{justifyContent:"center",display:{xs:"none",sm:"block",md:"flex"}}}   >
                  <h3>{e.contact}</h3>
                  </Grid>
                  <Grid item md={1.5} sm={1} sx={{justifyContent:"center",display:{xs:"none",sm:"block",md:"flex"}}}   >
                  <h3>{e.cnic}</h3>
                  </Grid>
                  <Grid item md={1.5} sm={1} sx={{justifyContent:"center",display:{xs:"none",sm:"block",md:"flex"}}}   >
                  <h3>{e.fatherName}</h3>
                  </Grid>
                  <Grid item md={1.5} sm={1} sx={{justifyContent:"center",display:{xs:"none",sm:"block",md:"flex"}}}   >
                  <h3>{e.fatherContact}</h3>
                  </Grid>
                  <Grid item md={1.5} sm={1} sx={{justifyContent:"center",display:{xs:"none",sm:"block",md:"flex"}}}   >
                  <h3>{e.emergencyContact}</h3>
                  </Grid>
                  <Grid item md={1} sm={1} sx={{justifyContent:"center",alignItems:"center",display:{xs:"none",sm:"flex",md:"flex"}}}   >
                  <Button sx={{height:"50%"}} variant="contained" >Detail</Button>
                  </Grid>
                  
                </Box>
              </Grid>
            </Box>
          </Grid>
          </div>
          </div>
    );
  });

  return (
    <div>

      <h1 style={{textAlign:"center"}} >Student Data</h1>
        <div style={{width:"100vw"}} >
        <div>
            
            <Grid sx={{  width: "inherit",display:"flex",justifyContent:"center",AlignItems:"center" }}  container>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                AlignItems: "center",
                width: "90%",

                
              }}
            >
              
              <Grid  item md={12} sm={12} xs={12}>
                <Box
                  sx={{border:"2px solid green",color:"red",display:"flex",AlignItems:"center",justifyContent:"center",flexDirection:{xs:"column",md:"row",sm:"row"}}}
                >   
                    
                    <Grid sx={{display:"flex",justifyContent:"center"}}  item md={2} sm={4.5} xs={8}  >
                  <h3>FirstName</h3>
                  </Grid>
                  <Grid item md={1} sx={{justifyContent:"center",display:{xs:"none",md:"flex",sm:"block"}}} >
                  <h3>Course</h3>
                  </Grid>
                  <Grid item md={.5}  sx={{justifyContent:"center",display:{xs:"none",md:"flex"}}}  >
                  <h3>Section</h3>
                  </Grid>
                  <Grid item md={1.5} sm={1} sx={{justifyContent:"center",display:{xs:"none",sm:"block",md:"flex"}}}   >
                  <h3>Contact</h3>
                  </Grid>
                  <Grid item md={1.5} sm={1} sx={{justifyContent:"center",display:{xs:"none",sm:"block",md:"flex"}}}   >
                  <h3>Cnic</h3>
                  </Grid>
                  <Grid item md={1.5} sm={1} sx={{justifyContent:"center",display:{xs:"none",sm:"block",md:"flex"}}}   >
                  <h3>F.Name</h3>
                  </Grid>
                  <Grid item md={1.5} sm={1} sx={{justifyContent:"center",display:{xs:"none",sm:"block",md:"flex"}}}   >
                  <h3>F.Contact</h3>
                  </Grid>
                  <Grid item md={1.5} sm={1} sx={{justifyContent:"center",display:{xs:"none",sm:"block",md:"flex"}}}   >
                  <h3>EmCont</h3>
                  </Grid>
                  <Grid item md={1} sm={1} sx={{justifyContent:"center",display:{xs:"none",sm:"block",md:"flex"}}}   >
                  <h3>Detail</h3>
                  </Grid>
                  
                </Box>
              </Grid>
            </Box>
          </Grid>
          </div>

      {data}
      </div>
    </div>
  );
}

export default StudentData;
