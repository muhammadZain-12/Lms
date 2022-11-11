import { Box, Grid, Typography, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import BasicSelect from "../components/dropDown";
import BasicTooltip from "../components/toolTip";
import BasicModal from "../components/modal";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  update,
} from "firebase/database";
import app from "../config/FirebaseConfig";
import { useNavigate } from "react-router-dom";
let initialData = {
  courseName: "",
  courseDuration: "",
  isFormOpen: false,
  noOfQuiz: "",
  feesInRupees: "",
  leadTrainerId: "",
  assistantTrainers: [],
};
const database = getDatabase(app);

function CourseForm() {
  const [trainer, setTrainer] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(initialData);

  let selectData = {
    Open: "true",
    Close: "false",
  };

  const deleteValue = (id) => {
    setData({
      ...data,
      assistantTrainers: data.assistantTrainers.filter((e, i) => {
        return e !== id;
      }),
    });
  };

  const getTrainerData = () => {
    if (trainer) {
      setData({
        ...data,
        assistantTrainers: [...data.assistantTrainers, trainer],
      });
      setTrainer("");
    } else {
      alert("Write in Input Field");
    }
  };

  const assistantTrainers = data.assistantTrainers.map((e, i) => {
    return (
      <Box sx={{ width: "fit-content", marginTop: 2 }} key={i}>
        <Button
          sx={{ border: "1px solid green", width: "100%", color: "green" }}
        >
          {e}
          <BasicTooltip ID={deleteValue} value={e} />
        </Button>
      </Box>
    );
  });

  //   const submitTrainers = () => {
  //     setDisabled(false);
  //   };

  const submitDataToDb = () => {
    // data.assitantTrainer = data.assistantTrainers
    // setData({ ...data, assistantTrainers: data.assistantTrainers });

    let value = Object.values(data);
    let count = 0;
    value.forEach((e) => {
      if (e === "") {
        count = count + 1;
      }
    });
    if (count) {
      alert("Fill All Inputs");
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const submitData = () => {
    const reference = ref(database, `courses`);
    setOpen(false);
    push(reference, data);
    setData(initialData);
    // setdata.assistantTrainers([]);
  };

  return (
    <Box>
      <Grid sx={{ display: "flex", justifyContent: "center",backgroundColor:"#125491",maxHeight:"fit-content",minHeight:"90vh" }} container>
        <Grid item md={6}>
          <Box
            sx={{
              backgroundColor:"white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 5,
              border: "1px solid green",
              boxShadow: 10,
              padding: 5,
              marginTop: 5,
            }}
          >
            <Typography variant="h3" sx={{ color: "green" }}>
              {" "}
              COURSE FORM
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginTop: 3,
              }}
            >
              <TextField
                value={data.courseName}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, courseName: e.target.value }))
                }
                disabled={disabled}
                variant="standard"
                label="course Name"
                sx={{ width: "40%" }}
              />
              <TextField
                value={data.courseDuration}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    courseDuration: e.target.value,
                  }))
                }
                disabled={disabled}
                variant="standard"
                label="course Duration"
                sx={{ width: "40%" }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginTop: 3,
              }}
            >
              <BasicSelect
                disabled={disabled}
                width="40%"
                status="is Form Open"
                id={selectData}
                course1="true"
                course2="false"
                onChange={(value) => {
                  setData({ ...data, isFormOpen: value == "true" });
                }}
              />
              <TextField
                value={data.noOfQuiz}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, noOfQuiz: e.target.value }))
                }
                disabled={disabled}
                variant="standard"
                label="No Of Quiz"
                sx={{ width: "40%" }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginTop: 3,
              }}
            >
              <TextField
                value={data.feesInRupees}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, feesInRupees: e.target.value }))
                }
                disabled={disabled}
                variant="standard"
                label="Fees (in Rupees)"
                sx={{ width: "40%" }}
              />
              <TextField
                value={data.leadTrainerId}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    leadTrainerId: e.target.value,
                  }))
                }
                disabled={disabled}
                variant="standard"
                label="Lead Trainer Id"
                sx={{ width: "40%" }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginTop: 3,
              }}
            >
              <TextField
                value={trainer}
                onChange={(e) => setTrainer(e.target.value)}
                variant="standard"
                label="Assistant Trainer"
                sx={{ width: "65%" }}
              />
              <Button
                onClick={getTrainerData}
                sx={{
                  width: "30%",
                  border: "2px solid green",
                  color: "green",
                  boxShadow: 1,
                  fontWeight: "600",
                }}
              >
                Add Trainer
              </Button>
            </Box>
            {/* {disabled ? ( */}
            {data.assistantTrainers.length > 0 && (
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexDirection: "flex-start",
                    flexWrap: "wrap",
                    width: "100%",
                  }}
                >
                  {assistantTrainers}
                </Box>
              </Box>
            )}
            {/* <Box
                  sx={{
                    marginTop: 3,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    onClick={submitTrainers}
                    variant="contained"
                    sx={{ padding: 2, width: "40%" }}
                  >
                    Submit Trainers
                  </Button>
                </Box> */}
            {/* </Box> */}
            {/* // ) : ( // "" // )} */}
            <Box
              sx={{
                marginTop: 3,
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {/* <Button
                onClick={submitDataToDb}
                disabled={disabled}
                variant="contained"
                sx={{ padding: 2, width: "40%" }}
              >
                Submit Form
              </Button> */}
              <BasicModal
                submitDataToDb={submitData}
                open={open}
                setOpen={setOpen}
                submitData={submitDataToDb}
                data={data}
                setData={setData}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CourseForm;
