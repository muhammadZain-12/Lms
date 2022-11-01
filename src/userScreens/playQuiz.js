import { getDatabase,onValue,ref } from "firebase/database"
import { useState } from "react"
import { useEffect } from "react"
import app from "../config/FirebaseConfig"
import { Grid,Box,Button} from "@mui/material"
import {Typography} from "@mui/material"
import BasicSelect from "../components/dropDown"


const database = getDatabase(app)


function PlayQuiz () {


const [val,setVal] = useState([])
const [data,setData] = useState("")
const [course,setCourse] = useState("") 
const [playQuiz,setPlayQuiz] = useState(false)
const [index,setIndex] = useState(0)
const [score,setScore] = useState(0)
const [showScore,setShowScore] = useState(false)


useEffect(()=>{

    const reference = ref(database,`quiz`)

    onValue(reference,(e)=>{
        if(e.exists){
            const val = e.val()
            let values = Object.values(val)
            
            setVal(values)
        }
    })
},[])



const getQuestions = () => {

    setData(val.filter((e,i)=>{
        return  e.course == course
        
    })
)
}


useEffect(()=>{
    getQuestions()
},[course])





const id = {
    id1:"md",
    id2:"blch",
    id3:"wd"
}

const getAnswer = (answer) => {
    
    if(data.length  == index + 1){
        if(data[index].correctAnswer===answer){
        setScore(score+1)
        setShowScore(true)
    }
    else if(data[index].correctAnswer!==answer){
        setShowScore(true)
    }
    }
    else{
        if(data[index].correctAnswer===answer){
            
            setScore(score+1)
            setIndex(index+1)
        }
        
        else{
            setIndex(index+1)
        }
    }
    }

const playAgain = () => {
    setPlayQuiz(false)
    setScore(false)
    setShowScore(false)
    setIndex(0)
}

return (
    !playQuiz?
    <Box>
        <Grid sx={{display:"flex",justifyContent:"center"}} container>

            <Grid   item md ={8} sm={10} xs={12} >

                <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:5,width:"100%"}} >
                        
                        <Typography variant="h4">
                            Play Quiz 
                        </Typography>
                        <Box sx={{width:{xs:"70%",sm:"60%", md:"50%"},marginTop:3}}>
                        <BasicSelect id={id} age={course} setAge={setCourse} status="Select Course " course1="Mobile Development" course2="App Development" course3 = "WebDevelopment" />
                        </Box>
                        <Box sx={{display:"flex",justifyContent:"center",width:{xs:"70%",sm:"60%",md:"20"},marginTop:3}}>
                        <Button onClick={()=>setPlayQuiz(true)} sx={{padding:1,width:{xs:"50%",sm:"60%",md:"40%"}}} variant="contained" >Play Quiz</Button>
                        </Box>
                </Box>

            </Grid>

        </Grid>
    </Box>

    :
    showScore?   
                <Box>
                    <Grid sx={{display:"flex",justifyContent:"center",marginTop:5}} container >
                        <Grid item md={6}>
                            <Box sx={{display:"flex",flexDirection:"column",alignItems:"center"}} >
                                <Typography variant="h5" >
                                Your Score is {score}
                                </Typography>
                                <Button onClick={playAgain} >
                                    Play Again
                                </Button>
                                
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
    :playQuiz?
    <Box sx={{height:"90vh"}} >
        
        <Grid sx={{display:"flex",justifyContent:"center",alignItems:"center",height:"90%"}} container>
            <Grid sx={{border:"2px solid blue",padding:5}} item md={8} sm={10} xs={12}>
                <Typography sx={{color:"green"}}  variant="h4">
                Question {index+1+"/"+data.length}
                </Typography>
                <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:3,width:"100%",justifyContent:"center",height:"100%"}}>
                       <Typography sx={{color:"green"}} variant="h4" >{data[index].question}</Typography>
                </Box>
                <Box sx={{display:"flex",flexDirection:{md:"column",sm:"column",xs:"column"},width:"100%",marginTop:5,alignItems:"center",justifyContent:"center"}} >
                   <Box sx={{display:"flex",alignItems:"center",flexDirection:{xs:"column",sm:"column",md:"row",},marginTop:3}} >
                    <Button onClick={()=>getAnswer(data[index].options1)} >{data[index].options1}</Button>
                    <Button onClick={()=>getAnswer(data[index].options2)} >{data[index].options2}</Button>
                    </Box>
                    <Box sx={{display:"flex",alignItems:"center",flexDirection:{xs:"column",sm:"column",md:"row"},marginTop:{xs:0,md:3,sm:0},marginBottom:3}}>
                    <Button onClick={()=>getAnswer(data[index].options3)} >{data[index].options3}</Button>
                    <Button onClick={()=>getAnswer(data[index].options4)} >{data[index].options4}</Button>
                    </Box>
                </Box>
            </Grid>

        </Grid>
    </Box>
    :""
)
   
    
}

export default PlayQuiz