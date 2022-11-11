import {
  Box,
  Grid,
  TextField,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { getDatabase, ref, push,set, onValue } from "firebase/database";
import app from "../config/FirebaseConfig";
import BasicSelect from "../components/dropDown";
import Checkbox from "@mui/material/Checkbox";
import BasicTooltip from "../components/toolTip";
import { typography } from "@mui/system";

const database = getDatabase(app);
function CreateQuiz() {

let initialState = {
    question: "",
    options: [],
    timeDuration: 0,
    quizName: "",
    course: "",
}

  const [clicked, setClicked] = useState(false);
  const [category, setCategory] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [questionClicked, SetQuestionClicked] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [getAllQuestions, setGetAllQuestions] = useState([]);
  const [isQuestion, setIsQuestion] = useState(initialState);
  

  const getValueFromDb = () => {
    if (isQuestion.quizName.length) {
      if (isQuestion.course.length) {
        if (isQuestion.timeDuration.length) {
          setClicked(true);
        } else {
          alert("Fill Quiz Time Duration");
        }
      } else {
        alert("Fill Category");
      }
    } else {
      alert("Fill Blank Inputs");
    }
  };
  const getCategory = () => {
    const reference = ref(database, `courses`);
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
      }
    });
  };




  useEffect(() => {
    getCategory();
  }, []);

  const submitOptionInDb = () => {
    if (inputValue) {
      setOptions([...options, { txt: inputValue }]);
      setInputValue("");
    } else {
      alert("write Option");
    }

  };

  const submitQuestion = () => {
    if (question) {
      SetQuestionClicked(true);
      setShowOptions(true);
    } else {
      alert("write Question");
    }
  };

  const submitDatainDb = () => {
    setIsSubmit(true);
    setShowOptions(false);
    setIsQuestion({ ...isQuestion, question: question, options: options});
    setQuestion("");
    setOptions([]);
  };

  useEffect(() => {
    isQuestion.question &&
      setGetAllQuestions([...getAllQuestions, { ...isQuestion }]);
  }, [isQuestion]);

  // console.log(isQuestion,"ISqUESTION")
  

  const getData = (i) => {
    setOptions(
      options.map((val, ind) => {
        if (ind == i) {
          return {
            ...val,
            correctAnswer: !val.correctAnswer,
          };
        } else {
          return val;
        }
      })
    );
  };

  const deleteValue = (ID) => {
            setOptions(options.filter((e,i)=>{
                return i !== ID
            }))
    ;
  };


  const showOption = options.map((e, i) => {
    return (
      <Box
        key={i}
        sx={{
          marginTop: 1,
          minWidth: "30%",
          overflow: "auto",
          border: "1px solid green",
          display: "flex",
          marginLeft: 1,
        }}
      >
        <Checkbox
          checked={e.correctAnswer}
          onChange={() => getData(i)}
          color="primary"
        />
        <Button sx={{ color: "green" }}>{e.txt}</Button>
        <BasicTooltip ID={deleteValue} value={i}/>
      </Box> 
    );
  });

  const submitQuiz = () => {
    setIsQuestion(initialState)
    setClicked(false)
    setIsSubmit(false)
    SetQuestionClicked(false)
    const reference = ref(database, `quiz`);
    let values = getAllQuestions.map((e, i) => {
      return {
        ...e,
      };
    });

    console.log(values, "value");
    push(reference, values);
    getAllQuestions([])

    
  };

const addMoreQuestions = () => {
    setIsSubmit(false)
    SetQuestionClicked(false)
}

const editQuestion = () => {
  setQuestion("")
 SetQuestionClicked(false) 
}

const deleteQuestion = (i) => {
      setGetAllQuestions(
        getAllQuestions.filter((e,ind)=>{
          return ind !== i
        })
      )
}


  return (
    <Box
      sx={{
        backgroundColor: "#125491",
        maxHeight: "fit-content",
        minHeight: "90vh",
      }}
    >
      <Grid container>
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Grid item md={9} sm={12} xs={10}>
            <Box
              sx={{
                backgroundColor: "#fff",
                marginTop: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                color: "green",
                border: "1px solid green",
                boxShadow: 10,
                padding: 5,
                borderRadius: 10,
                width: "100%",
              }}
            >
              <Typography
                sx={{ fontSize: { md: "24px", sm: "16px", xs: "12px" } }}
                variant="p"
              >
                Create Quiz Questions
              </Typography>

              <Box
                sx={{
                  flexDirection: { md: "row", sm: "row", xs: "column" },
                  marginTop: 2,
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Grid item md={4} sm={4} xs={12}>
                  <TextField
                    value={isQuestion.quizName}
                    disabled={clicked}
                    onChange={(e) =>
                      setIsQuestion((prev) => ({
                        ...prev,
                        quizName: e.target.value,
                      }))
                    }
                    label="Enter Quiz Name Here..."
                    variant="standard"
                  />
                </Grid>
                <Grid
                  sx={{ marginTop: { xs: 5, md: 0, sm: 0 } }}
                  item
                  md={3}
                  sm={3}
                  xs={12}
                >
                  <TextField
                    type="number"
                    value={isQuestion.timeDuration}
                    disabled={clicked}
                    onChange={(e) =>
                      setIsQuestion((prev) => ({
                        ...prev,
                        timeDuration: e.target.value,
                      }))
                    }
                    label="QuizDuration(inMinutes)"
                    variant="standard"
                  />
                </Grid>
                <Grid
                  sx={{ marginTop: { xs: 5, md: 0, sm: 0 } }}
                  item
                  md={4}
                  sm={4}
                  xs={12}
                >
                  <BasicSelect
                    disabled={clicked}
                    marginTop={0}
                    value={isQuestion.course}
                    status="Category"
                    onChange={(value) => {
                      setIsQuestion({ ...isQuestion, course: value });
                    }}
                    id={category}
                  />
                </Grid>
              </Box>
              <Grid sx={{ width: "100%" }} item md={12} sm={12} xs={12}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 4,
                  }}
                >
                  <Button
                    sx={{
                      width: { md: "50%", sm: "60%", xs: "90" },
                      border: "1px solid green",
                      color: "green",
                      fontWeight: "600",
                      boxShadow: "3",
                    }}
                    disabled={clicked}
                    onClick={getValueFromDb}
                    variant="standard"
                  >
                    Create Quiz
                  </Button>
                </Box>
              </Grid>
              {clicked ? (
                <Box
                  sx={{
                    marginTop: 5,
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* <Typography variant="h5" sx={{textAlign:"center",marginTop:3}} >Enter Question</Typography> */}
                  <Box
                    sx={{
                      display: "flex",
                      marginTop: 2,
                      flexDirection: { md: "row", sm: "row", xs: "column" },
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: { md: "90%", sm: "90%", xs: "100%" },
                    }}
                  >
                    <TextField
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      disabled={questionClicked}
                      sx={{ width: { md: "60%", sm: "60%", xs: "100%" } }}
                      label="ENTER QUESTION..."
                      variant="standard"
                      fullWidth
                    />
                    <Button
                      disabled={questionClicked}
                      sx={{
                        border: "1px solid green",
                        boxShadow: 3,
                        width: { xs: "100%", md: "30%", sm: "30%" },
                        marginTop: { xs: 2, md: 0, sm: 0 },
                      }}
                      onClick={submitQuestion}
                      variant="standard"
                    >
                      Submit Question
                    </Button>
                  </Box>
                </Box>
              ) : (
                ""
              )}
              {showOptions ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* <Typography variant="h5" sx={{textAlign:"center",marginTop:3}} >Enter Options</Typography> */}
                  <Box
                    sx={{
                      display: "flex",
                      marginTop: 2,
                      flexDirection: { md: "row", sm: "row", xs: "column" },
                      justifyContent: "space-between",
                      width: { md: "90%", sm: "90%", xs: "100%" },
                    }}
                  >
                    <TextField
                      value={inputValue}
                      sx={{ width: { md: "60%", sm: "65%", xs: "100%" } }}
                      onChange={(e) => setInputValue(e.target.value)}
                      label="Options"
                      variant="standard"
                      fullWidth
                    />
                    <Button
                      sx={{
                        width: { md: "30%", sm: "30%", xs: "100%" },
                        marginTop: { xs: 2, md: 0, sm: 0 },
                        border: "1px solid green",
                        boxShadow: 3,
                      }}
                      onClick={submitOptionInDb}
                      disabled={!showOption}
                      variant="standard"
                    >
                      Submit Options
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      width: { md: "90%", sm: "90%", xs: "100%" },
                      marginTop: 3,
                    }}
                  >
                    
                      <Box sx={{display:"flex",width:"70%"}}>
                        <Box sx={{display:"flex",width:"100%"}} >
                      <Typography variant="h5" sx={{maxWidth:"fit-content",minWidth:"50%"}} >Question:{question}</Typography>
                      <Button onClick={editQuestion} sx={{border:"1px solid blue",width:"30%"}} >Edit Question</Button>
                      </Box>
                    
                  </Box>
                  </Box>
                  
                  <Box

                    sx={{
                      width: "90%",
                      marginTop: 2,
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    {showOption}
                  </Box>

                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      marginTop: 5,
                    }}
                  >
                    <Button
                      onClick={submitDatainDb}
                      sx={{
                        border: "1px solid green",
                        color: "green",
                        boxShadow: 5,
                        width: { md: "40%", sm: "60%", xs: "90%" },
                        fontWeight: "600",
                        padding: 1,
                      }}
                    >
                      Submit Question
                    </Button>
                  </Box>
                </Box>
              ) : (
                ""
              )}
              <Box sx={{width:"100%",marginTop:3}}  >
                <Box sx={{
                  display: "flex",
                  width: "100%",
                  
                  justifyContent: "center",

                }} >
              <Button
                  disabled={!isSubmit}
                  onClick={addMoreQuestions}
                  sx={{
                    
                    color: "green",
                    boxShadow: 5,
                    width: { md: "40%", sm: "60%", xs: "90%" },
                    fontWeight: "600",
                    padding: 1,
                    marginTop: 2,
                  }}
                >
                  Add More Questions
                </Button>
                </Box>
                {
                isQuestion.question&&
                getAllQuestions.map((e,i)=>{
                  
                  return(

                    <Box sx={{mt:2,mb:2,display:"flex",flexDirection:"column",width:"100%"}} >
                      <Typography>Question{i+1}: {e.question}</Typography>
                      
                      <Box sx={{mt:1}} >
                        {e.options.map((e,i)=>{
                          return <Typography>Option{i+1}:{e.txt}</Typography>
                        })}
                      </Box><br />
                      <Button onClick={()=>deleteQuestion(i)} sx={{border:"1px solid blue"}} >Delete Question</Button>
                    </Box> 
                  )
                })
                }
              </Box>

              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <Button
                  onClick={submitQuiz}
                  disabled={!isSubmit}
                  sx={{
                    width: "40%",
                    color: "green",
                    boxShadow: 5,
                    width: { md: "40%", sm: "60%", xs: "90%" },
                    fontWeight: "600",
                    
                    padding: 1,
                    marginTop: 2,
                  }}
                >
                  Submit Quiz
                </Button>
                
              </Box>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}

export default CreateQuiz;
