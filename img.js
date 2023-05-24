import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faA,
  faB,
  faC,
  faCheckCircle,
  faD,
  faPenNib,
  faQ,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { InputAdornment, TextField, Snackbar, Alert, Button } from "@mui/material";
import "../style/Question.css";
import { addNewQues } from "../service/api";

export default function Question() {
  const [inputs, setInputs] = useState({ present: "notVisited" });
  const [selectedImage, setSelectedImage] = useState(null); // State to store the selected image

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      setInputs((values) => ({ ...values, quesimg: base64String }));
    };

    if (file) {
      reader.readAsDataURL(file);
      setSelectedImage(file);
    }
  };

  const handleCorrect = (val) => {
    switch (val) {
      case 1:
        setInputs((values) => ({ ...values, ["correct"]: inputs.a }));
        break;
      case 2:
        setInputs((values) => ({ ...values, ["correct"]: inputs.b }));
        break;
      case 3:
        setInputs((values) => ({ ...values, ["correct"]: inputs.c }));
        break;
      case 4:
        setInputs((values) => ({ ...values, ["correct"]: inputs.d }));
        break;
    }
  };

  const handleSubmit = async () => {
    if (
      inputs.question &&
      inputs.a &&
      inputs.b &&
      inputs.c &&
      inputs.d &&
      inputs.correct
    ) {
      console.log(inputs)
      inputs.present = "notVisited";
      await addNewQues({
        question: inputs.question,
        a: inputs.a,
        b: inputs.b,
        c: inputs.c,
        d: inputs.d,
        quesimg: inputs.quesimg, // Include the base64 image string in the request payload
        present: inputs.present,
        correct: inputs.correct,
      });
      setOpen(true);
      setInputs({});
      setSelectedImage(null);
    }
  };

  const refreshPage = () => {
    setInputs({});
    setSelectedImage(null);
  };

  const [open, setOpen] = useState(false);

  const handleToClose = (event, reason) => {
    if ("clickaway" === reason) return;
    setOpen(false);
  };

  return (
    <div className="Question">
      <div className="newQues">
        <div className="name">Add new Question</div>
        <div className="content">
          <div className="question">
            <TextField
              name="question"
              value={inputs.question || ""}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon
                      icon={faQ}
                      style={{ color: "black", paddingRight: ".5vw" }}
                    />
                  </InputAdornment>
                ),
              }}
              inputProps={{ style: { color: "rgb(111 121 137)" } }}
              className="textarea"
              label="Question"
              variant="standard"
              required
              type="text"
              multiline
              minRows={2}
              maxRows={2}
            />
          </div>
          <div className="option">
            <TextField
              name="a"
              value={inputs.a || ""}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon
                      icon={faA}
                      style={{ color: "black", paddingRight: ".5vw" }}
                    />
                  </InputAdornment>
                ),
              }}
              inputProps={{ style: { color: "rgb(111 121 137)" } }}
              className="textarea"
              label="Option A"
              variant="standard"
              required
              type="text"
            />
            <div className="boxOption">
              <FontAwesomeIcon
                onClick={() => handleCorrect(1)}
                className="box"
                icon={faCheckCircle}
                style={
                  inputs?.a === inputs?.correct && inputs.correct
                    ? { color: "#2080b7" }
                    : { color: "#d8e8f1" }
                }
              />
            </div>
          </div>
          <div className="option">
            <TextField
              name="b"
              value={inputs.b || ""}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon
                      icon={faB}
                      style={{ color: "black", paddingRight: ".5vw" }}
                    />
                  </InputAdornment>
                ),
              }}
              inputProps={{ style: { color: "rgb(111 121 137)" } }}
              className="textarea"
              label="Option B"
              variant="standard"
              required
              type="text"
            />
            <div className="boxOption">
              <FontAwesomeIcon
                onClick={() => handleCorrect(2)}
                className="box"
                icon={faCheckCircle}
                style={
                  inputs?.b === inputs?.correct && inputs.correct
                    ? { color: "#2080b7" }
                    : { color: "#d8e8f1" }
                }
              />
            </div>
          </div>
          <div className="option">
            <TextField
              name="c"
              value={inputs.c || ""}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon
                      icon={faC}
                      style={{ color: "black", paddingRight: ".5vw" }}
                    />
                  </InputAdornment>
                ),
              }}
              inputProps={{ style: { color: "rgb(111 121 137)" } }}
              className="textarea"
              label="Option C"
              variant="standard"
              required
              type="text"
            />
            <div className="boxOption">
              <FontAwesomeIcon
                onClick={() => handleCorrect(3)}
                className="box"
                icon={faCheckCircle}
                style={
                  inputs?.c === inputs?.correct && inputs.correct
                    ? { color: "#2080b7" }
                    : { color: "#d8e8f1" }
                }
              />
            </div>
          </div>
          <div className="option">
            <TextField
              name="d"
              value={inputs.d || ""}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon
                      icon={faD}
                      style={{ color: "black", paddingRight: ".5vw" }}
                    />
                  </InputAdornment>
                ),
              }}
              inputProps={{ style: { color: "rgb(111 121 137)" } }}
              className="textarea"
              label="Option D"
              variant="standard"
              required
              type="text"
            />
            <div className="boxOption">
              <FontAwesomeIcon
                onClick={() => handleCorrect(4)}
                className="box"
                icon={faCheckCircle}
                style={
                  inputs?.d === inputs?.correct && inputs.correct
                    ? { color: "#2080b7" }
                    : { color: "#d8e8f1" }
                }
              />
            </div>
          </div>
          <div className="imageUpload">
            <TextField
              type="file"
              onChange={handleImageUpload}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon
                      icon={faPenNib}
                      style={{ color: "black", paddingRight: ".5vw" }}
                    />
                  </InputAdornment>
                ),
              }}
              inputProps={{ style: { color: "rgb(111 121 137)" } }}
            />
            {selectedImage && (
              <div className="selectedImage">{selectedImage.name}</div>
            )}
          </div>
          <Button
            variant="contained"
            className="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={handleToClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleToClose} severity="success" sx={{ width: "100%" }}>
            Question added successfully!
          </Alert>
        </Snackbar>
        <Button
          variant="contained"
          className="refresh"
          onClick={refreshPage}
        >
          Refresh
        </Button>
      </div>
    </div>
  );
}
