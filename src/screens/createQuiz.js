import { Box,Grid,TextField,Typography,Divider,Button } from "@mui/material"
import { useEffect } from "react"
import { useState } from "react"
import { getDatabase,ref,push, onValue } from "firebase/database"
import app from "../config/FirebaseConfig"
import BasicSelect from "../components/dropDown"

const database = getDatabase(app)
function CreateQuiz () {
    const [clicked,setClicked] = useState(false)
    const [data,setData] = useState("")
    const [course,setCourse] = useState("")
    const [createQuiz,setCreateQuiz] = useState({
        question:"",
        options1:"",
        options2:"",
        options3:"",
        options4:"",
        correctAnswer:"",
        timeDuration:"",
        course:""
    })



const getValueFromDb=() =>{
    if(createQuiz.question.length){
        if(course.length){
    setClicked(true)
    }
    else{
        alert("Fill Category")
    }
}
    
    else{
    alert("fill Input")
}
}
const submitOptionInDb = () => {
    if(createQuiz.options1.length>0&&createQuiz.options2.length>0){
        if(createQuiz.correctAnswer.length){
            if(createQuiz.question.length>0){
                if(createQuiz.options1===createQuiz.correctAnswer||createQuiz.options2===createQuiz.correctAnswer||createQuiz.options3===createQuiz.correctAnswer||createQuiz.options4===createQuiz.correctAnswer){
            setClicked(false)
            createQuiz.course = course
            const reference = ref(database,`quiz`)
            push(reference,createQuiz)
            createQuiz.question = ""
            createQuiz.correctAnswer= ""
            createQuiz.options1=""
            createQuiz.options2=""
            createQuiz.options3=""
            createQuiz.options4=""
        }
        else{
            alert("One Option must be Correct Answer")
        }
        }

        else{
            alert("Fill Question")
        }
        }
        else{
            alert("Fill Correct Answer")
        }
    }
    
    else{
        alert("Fill atleast First 2 Options")
    }
}

const idCourse = {
    id1 : "wd",
    id2 : "md",
    id3 : "blch"
}



console.log(data,"data")
  return (
        <Box>

            <Grid  container>
                <Box sx={{display:"flex",justifyContent:"center",width:"100%"}} >
                <Grid  item md={7} sm={10} xs={12}>
                    <Box sx={{marginTop:5,display:"flex",flexDirection:"column",alignItems:"flex-start",color:"red",width:"100%"}} >
                        
                        <Typography variant="h3"  >Create Quiz Questions</Typography>
                        
                        <Box sx={{marginTop:7,display:"flex",width:"100%",alignItems:"center",justifyContent:"space-between"}}>
                        <Grid item md={5} sm={5} xs={6} >    
                        <TextField  value={createQuiz.question} onChange={(e)=>setCreateQuiz((prev)=>({...prev,question:e.target.value}))} label="Add Question Here..." variant="standard" fullWidth />
                        </Grid>
                        <Grid item md={3} sm={5} xs={3} >    
                        <BasicSelect disabled={clicked} marginTop={0} status="category" age={course} setAge={setCourse} id ={idCourse} course1="Web Development" course2="Mobile Development" course3="App Development"  />
                        </Grid>
                        <Grid  item md={3} sm={3} xs={3} >
                        <Button  disabled={clicked} onClick={getValueFromDb} sx={{padding:1,marginLeft:1}} variant="contained" >Add Question</Button>
                        </Grid>
                        </Box>
                        {clicked?
                        <Box sx={{display:"flex",flexDirection:"column",width:"70%",justifyContent:"center" }} >
                        <Typography variant="h5" sx={{textAlign:"center",marginTop:3}} >Enter Options</Typography>
                        <TextField onChange={(e)=>setCreateQuiz((prev)=>({...prev,options1:e.target.value}))}  label="Option1" variant="standard" fullWidth  />
                        <TextField  onChange={(e)=>setCreateQuiz((prev)=>({...prev,options2:e.target.value}))} label="Option2" variant="standard"fullWidth sx={{marginTop:2}} />
                        <TextField  onChange={(e)=>setCreateQuiz((prev)=>({...prev,options3:e.target.value}))} label="Option3" variant="standard" fullWidth sx={{marginTop:2}} />
                        <TextField  onChange={(e)=>setCreateQuiz((prev)=>({...prev,options4:e.target.value}))} label="Option4" variant="standard" fullWidth sx={{marginTop:2}} />
                        <TextField  onChange={(e)=>setCreateQuiz((prev)=>({...prev,correctAnswer:e.target.value}))} label="Correct Answer" variant="standard" fullWidth sx={{marginTop:2}} />
                        <Button onClick={submitOptionInDb} disabled={!clicked} variant="contained" sx={{marginTop:2,marginBottom:2}} >Submit Options</Button>
                        </Box>
                        :""}
                        
                    </Box>
                </Grid>
                </Box>
            </Grid>
            

        </Box>
  ) 
}

export default CreateQuiz
