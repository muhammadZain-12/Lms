import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: "100vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

export default function BasicModal(prop) {
  const { data, setData, submitData, open, setOpen, submitDataToDb } = prop;

  const handleOpen = () => {
    submitData();
  };
  const handleClose = () => setOpen(false);

  const values = Object.values(data);
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Button
        sx={{
          border: "2px solid green",
          width: "50%",
          padding: 1,
          color: "green",
          fontWeight: "600",
          boxShadow: 3,
        }}
        onClick={handleOpen}
      >
        Submit Form
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "space-between",
            }}
          >
            <Typography
              varaint="h6"
              sx={{
                color: "red",
                display: "flex",
                alignSelf: "center",
                fontWeight: "600",
              }}
            >
              Kindly Verify The Below Details
            </Typography>
            {Object.entries(data).map(([key, value]) => {
              console.log(key, value.length);
              return (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 2,
                  }}
                  key={key}
                >
                  <Typography
                    sx={{ color: "blue" }}
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    {key + ":"}
                  </Typography>
                  <Box
                    sx={{
                      border: "1px solid green",
                      minWidth: "50%",
                      color: "green",
                      fontWeight: "600",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    id="modal-modal-title"
                  >
                    {key == "assistantTrainers" ? (
                      value.map((e) => (
                        <Button sx={{ color: "green" }}>{e}</Button>
                      ))
                    ) : (
                      <Button sx={{ color: "green" }}>
                        {value.toString()}
                      </Button>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              fontWeight: "500",
              textAlign: "center",
              width: "100%",
              
            }}
          >
            Are You Sure You want to submit this Course?
          </Typography>
          <Box>
            <Button
              onClick={submitDataToDb}
              sx={{
                textAlign: "center",
                width: "100%",
                marginTop: 2,
                border: "1px solid blue",
              }}
            >
              Submit Course
            </Button>
            <Button
              onClick={() => setOpen(false)}
              sx={{
                textAlign: "center",
                width: "100%",
                marginTop: 2,
                border: "1px solid blue",
              }}
            >
              Back to Course Form
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
