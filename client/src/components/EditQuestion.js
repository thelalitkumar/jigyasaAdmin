import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faA,
  faB,
  faC,
  faCheckCircle,
  faD,
  faPenNib,
  faQ,
} from "@fortawesome/free-solid-svg-icons";
import { Alert, InputAdornment, Snackbar, TextField } from "@mui/material";
import "../style/Question.css";
import { editQues, getQuesById } from "../service/api";
import { useParams } from "react-router-dom";

export default function EditQuestion() {
    const [inputs, setInputs] = useState({'present':"notVisited"});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleCorrect=(val)=>{
    switch(val) {
        case 1:
            setInputs((values) => ({ ...values, ['correct']: inputs.a}));
            break;
        case 2:
            setInputs((values) => ({ ...values, ['correct']: inputs.b}));
            break;
        case 3:
            setInputs((values) => ({ ...values, ['correct']: inputs.c}));
            break;
        case 4:
            setInputs((values) => ({ ...values, ['correct']: inputs.d}));
            break;
      }
  }

  useEffect(()=>{
      loadClickedQuestion();
    },[])
    
    const {id} =useParams();
    const loadClickedQuestion=async()=>{
        const response =await getQuesById(id);
        setInputs(response)
    }

    const handleEditedSubmit=async()=>{
      if(inputs.question && inputs.a && inputs.b && inputs.c && inputs.d && ((inputs.correct==inputs.a) || (inputs.correct==inputs.b) || (inputs.correct==inputs.c) || (inputs.correct==inputs.d))){
          await editQues({
            question: inputs.question,
            a: inputs.a,
            b: inputs.b,
            c: inputs.c,
            d: inputs.d,
            present: inputs.present,
            correct: inputs.correct,
          },id);
          setOpen(true);
          setInputs({});
      }
    }
    const [open, setOpen] = useState(false);

  const handleToClose = (event, reason) => {
    if ("clickaway" == reason) return;
    setOpen(false);
  };
  return (
    <div className="Question">
      <div className="newQues">
        <div className="name">Edit Question</div>
        <div className="content">
          <div className="question">
          <TextField
              name="question"
              value={inputs.question || ""}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faQ} style={{ color: "black",paddingRight:".5vw" }} />
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
                    <FontAwesomeIcon icon={faA} style={{ color: "black" ,paddingRight:".5vw" }} />
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
              <FontAwesomeIcon onClick={()=>handleCorrect(1)} className="box" icon={faCheckCircle} style={inputs.a===inputs.correct && inputs.correct?{color: '#2080b7'}:{color: '#d8e8f1'}} />
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
                    <FontAwesomeIcon icon={faB} style={{ color: "black",paddingRight:".5vw"  }} />
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
              <FontAwesomeIcon onClick={()=>handleCorrect(2)} className="box" icon={faCheckCircle} style={inputs.b===inputs.correct && inputs.correct?{color: '#2080b7'}:{color: '#d8e8f1'}} />
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
                    <FontAwesomeIcon icon={faC} style={{ color: "black" ,paddingRight:".5vw" }} />
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
              <FontAwesomeIcon onClick={()=>handleCorrect(3)} className="box" icon={faCheckCircle} style={inputs.c===inputs.correct && inputs.correct?{color: '#2080b7'}:{color: '#d8e8f1'}} />
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
                    <FontAwesomeIcon icon={faD} style={{ color: "black",paddingRight:".5vw"  }} />
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
              <FontAwesomeIcon onClick={()=>handleCorrect(4)} className="box" icon={faCheckCircle} style={inputs.d===inputs.correct && inputs.correct?{color: '#2080b7'}:{color: '#d8e8f1'}} />
            </div>
          </div>
        </div>
        <div className="output" style={{justifyContent:"right"}}>
          <button onClick={handleEditedSubmit} id="publish" className="custom-btn">
            <p>
              Publish Edited Question{" "}
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
