import { Box, Button, Grid } from "@mui/material";
import { getDatabase, ref, set, push, onValue, update } from "firebase/database";
import app from "../config/FirebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { OpenInBrowserOutlined } from "@mui/icons-material";

const Database = getDatabase(app);

function UserData() {
  const [val, setVal] = useState("");

  const getDataFromDb = () => {
    const reference = ref(Database, `users`);
    onValue(reference, (e) => {
      if (e.exists()) {
        setVal(e.val())
         
      }
    });
  };

  let keys = Object.keys(val);

  let values = Object.values(val);

  useEffect(() => {
    getDataFromDb();
  }, []);

const changeStatus = (e,i) => {
  console.log(e)
       
    let emails = values.filter((event,ind)=>{
        return event.email===e.email
    })

    let [emailing] = emails

    if(emailing.isAdmin){
        emailing.isAdmin = false
    }
    else{
        emailing.isAdmin = true
    }
    
    
    const reference = ref(Database,`users/${emailing.id}`)
    
    update(reference,emailing)
        
    
}

let keyDate = Object.entries(val).map(([key,value])=>{
    value.id = key
   return value
   
})





  let data = values.map((e, i) => {
        return (
            <div>
            {!e.isCAdmin?
            <Grid sx={{  width: "inherit",display:"flex",justifyContent:"center" }} key={i} container>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                AlignItems: "center",
                width: "90%",
                
              }}
            >
              <Grid item md={12} sm={12} sx={12} >
              </Grid>  
              <Grid item md={12} sm={12} xs={12}>
                <Box
                  sx={{display:"flex",border:"1px solid black",AlignItems:"center",justifyContent:"space-around",flexDirection:{xs:"column",md:"row",sm:"row"}}}
                >   
                    
                    <Grid  item md={3} sm={4.5} xs={8}  >
                  <h3>{e.email}</h3>
                  </Grid>
                  <Grid item md={2} sx={{display:{xs:"none",md:"block",sm:"block"}}} >
                  <h3>{e.firstName}</h3>
                  </Grid>
                  <Grid item md={2}  sx={{display:{xs:"none",md:"block"}}}  >
                  <h3>{e.lastName}</h3>
                  </Grid>
                  <Grid item md={1} sm={1} sx={{display:{xs:"none",sm:"block",md:"block"}}}   >
                  <h3>{e.isCAdmin?"CAdmin":e.isAdmin?"Admin":"User"}</h3>
                  </Grid>
                  <Grid item md={1} sm={2}  sx={{justifyContent:"center",alignItems:"center",display:{xs:"none",md:"flex",sm:"flex"}}}>
                  <Button onClick={()=>changeStatus(e,i)} variant="contained" sx={{width:"100%",height:"50%"}} >{e.isAdmin?"Demote":"Promote"}</Button>
                  </Grid>
                  <Grid sx={{display:"flex",justifyContent:"center",alignItems:"center"}} item md={1}  >
                  <Button  variant="contained" sx={{width:"100%",height:"50%"}} >Detail</Button>
                  </Grid>
                </Box>
              </Grid>
            </Box>
          </Grid>:""}
          </div>
      
    );
  });

  return (
    <div>
      <h1>Hello User Data</h1>
        <div style={{width:"100vw"}} >
      {data}
      </div>
    </div>
  );
}

export default UserData;
