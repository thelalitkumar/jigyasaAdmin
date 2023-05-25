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
import { InputAdornment, TextField, Snackbar, Alert } from "@mui/material";
import "../style/Question.css";
import { addNewQues } from "../service/api";

export default function Question() {
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({
    present: "notVisited",
    textareaMode: true,
    imageMode: false,
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setInputs((values) => ({
        ...values,
        quesimg: base64String,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
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
      inputs.textareaMode && inputs.question
    ) {
      inputs.present = "notVisited";
      await addNewQues({
        question: inputs.question,
        a: inputs.a,
        b: inputs.b,
        c: inputs.c,
        d: inputs.d,
        present: inputs.present,
        correct: inputs.correct,
      });
      console.log(inputs);
      setOpen(true);
      setInputs({present: "notVisited",
      textareaMode: true,
      imageMode: false,});
    }
    else if (inputs.quesimg){
      inputs.present = "notVisited";
      await addNewQues({
        a: inputs.a,
        b: inputs.b,
        c: inputs.c,
        d: inputs.d,
        present: inputs.present,
        correct: inputs.correct,
        quesimg: inputs.quesimg,
      });
      console.log(inputs);
      setOpen(true);
      setInputs({present: "notVisited",
      textareaMode: true,
      imageMode: false,});
    }
  };

  const refreshPage = () => {
    setInputs({present: "notVisited",
    textareaMode: true,
    imageMode: false,});
  };

  

  const handleToClose = (event, reason) => {
    if ("clickaway" === reason) return;
    setOpen(false);
  };

  const toggleMode = () => {
    setInputs((values) => ({
      ...values,
      textareaMode: !values.textareaMode,
      imageMode: !values.imageMode,
    }));
  };

  return (
    <div className="Question">
      <div className="newQues">
        <button onClick={toggleMode} className="toggle-mode-btn">
          {inputs.textareaMode ? "Switch to Image Mode" : "Switch to Text Mode"}
        </button>
        <div className="name">Add new Question</div>
        <div className="content">
          <div className="question">
            {inputs.textareaMode && (
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
            )}
            {inputs.imageMode && (
              <TextField
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
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
              label="Question"
              variant="standard"
              required
            />
            )}
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
        </div>
        <div className="output">
          <button onClick={refreshPage} id="discard" className="custom-btn">
            <p>
              Discard question{" "}
              <FontAwesomeIcon
                style={{ color: "white", paddingBottom: ".04vw" }}
                icon={faTrash}
              />
            </p>
          </button>
          <button onClick={handleSubmit} id="publish" className="custom-btn">
            <p>
              Publish Question{" "}
              <FontAwesomeIcon
                style={{ color: "white", paddingBottom: ".04vw" }}
                icon={faPenNib}
              />
            </p>
          </button>
        </div>
        <Snackbar
          open={open}
          autoHideDuration={4000}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          onClose={handleToClose}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            Question Published Successfully!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
