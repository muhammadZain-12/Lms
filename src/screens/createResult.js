import SMswitch from "../components/Switch";
import { Box,Grid,Typography,Button } from "@mui/material";
import BasicSelect from "../components/dropDown";
import { useEffect } from "react";
import { getDatabase,onValue,ref,push } from "firebase/database";
import app from "../config/FirebaseConfig";
import { useState } from "react";
import { typography } from "@mui/system";

const database = getDatabase(app)

function ResultScreen () {
const [category,setCategory] = useState([])   
const [resultData,setResultData] = useState([
        {
            name:"Abc",
            marks:70,
            rollNo:"ab",
            result:"pass"
        },
        {
            name:"Efg",
            marks:50,
            rollNo:"ef",
            result:"pass"
        },
        {
            name:"Hij",
            marks:30,
            rollNo:"hi",
            result:"fail"
        },
        {
            name:"klm",
            marks:60,
            rollNo:"kl",
            result:"pass"
        },
        {
            name:"mno",
            marks:25,
            rollNo:"mn",
            result:"fail"
        },
        {
            name:"pqr",
            marks:90,
            rollNo:"pq",
            result:"pass"
        },
        {
            name:"stu",
            marks:80,
            rollNo:"st",
            result:"pass"
        },
        {
            name:"vwx",
            marks:40,
            rollNo:"vw",
            result:"fail"
        },
        {
            name:"xyz",
            marks:50,
            rollNo:"xy",
            result:"pass"
        },

])
const [modal,setModal] = useState({
    isShowResult : false,
    course : "",
    result : resultData
})


   
useEffect(()=>{
    const reference = ref(database,`courses`)
    onValue(reference, (e) => {
        if (e.exists()) {
          let val = e.val();
          val = Object.values(val);
          console.log(val, "val");
          let values = val.map((e) => {
            return e.courseName;
          });
          
          let cat = new Set(values);
          const uomObj = { ...[...cat] };
          setCategory(uomObj);
}})},[])

const sendDataToDb = () => {
        let count = 0

        if(!modal.course||!modal.result){
            count = count+1
        }
        
    
        if(count){
            alert("fill inputs")
        }
        else{
     const reference = ref(database,`result`)
    push(reference,modal)
    alert("Your data has been Submitted")

}
}

    return (
        <Box sx={{display:"flex",justifyContent:"center"}} >
            <Grid sx={{display:"flex",justifyContent:"center",width:"80%",boxShadow:10,border:'2px solid blue',margin:5}} container >
              
                <Grid item md={8}  >
            <Box sx={{display:"flex",alignItems:"center",flexDirection:"column",mt:2}} >        
            <Typography sx={{mt:5}} variant="h4" >Create Result</Typography>
            <Box sx={{display:"flex",marginTop:5,width:"100%",alignItems:"center",padding:3,justifyContent:"space-evenly"}} >
            <Box sx={{display:"flex",alignItems:"center",width:"30%",justifyContent:"space-around"}} >
            <Typography variant="h6" >is Show Result</Typography>
            <SMswitch label={"course"} onChange={(e)=>setModal((prev)=>({...prev,isShowResult:e}))}  />
            </Box>
            <Box sx={{width:"30%"}} >
            <BasicSelect id={category} status={"course"} onChange= {(e)=>setModal((prev)=>({...prev,course:e}))} />
            </Box>
            <Button onClick={sendDataToDb} sx={{width:"30%",border:"1px solid blue"}} >
                Submit Result
            </Button>
            </Box>
            </Box>
            </Grid>
            <Grid item md={8} >
                <Box sx={{display:"flex",flexDirection:"column",width:"100%",margin:1}} >
                <table  >
                                <tr style={{fontSize:"20px"}} >
                                    <th>Name</th>
                                    <th>Roll No</th>
                                    <th>Marks</th>
                                    <th>Result</th>
                                </tr>
                            </table>
                    {resultData.map((e,i)=>{
        
                        return <Box key={i} sx={{width:"100%",display:"flex",margin:1}} >
                            <table style={{display:"flex",width:"100%"}} >
                                <tr style={{display:"flex",width:"100%"}} >
                            <Typography variant="h6" > <td style={{width:"25vw",textAlign:"center"}}  >{e.name}</td>  </Typography>
                            <Typography variant="h6"  > <td style={{width:"25vw",textAlign:"center"}} >{e.rollNo}</td> </Typography>
                            <Typography variant="h6"  > <td style={{width:"25vw",textAlign:"center"}} >{e.marks}</td> </Typography>
                            <Typography variant="h6"  > <td style={{width:"25vw",textAlign:"center"}} >{e.result}</td> </Typography>
                            </tr>
                            </table>
                        </Box>
                    })}

                </Box>
            </Grid>
            
            </Grid>
            
        </Box>
    )
}

export default ResultScreen;