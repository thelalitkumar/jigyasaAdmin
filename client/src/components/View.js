import {
  faCheck,
  faFileDownload,
  faQ,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { getQues } from "../service/api";
import "../style/View.css";
import Setting from "./Setting";
import FileSaver from "file-saver";
export default function View() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    viewQues();
  }, []);

  const viewQues = async () => {
    let response = await getQues();
    // console.log(response)
    setQuestions(response);
  };

  const handleQuestionDeletion = (deletedId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question._id !== deletedId)
    );
  };

  const downloadJsonData = () => {
    const json = JSON.stringify(questions);
    const blob = new Blob([json], { type: "application/json" });
    FileSaver.saveAs(blob, "data.json");
  };

  return (
    <div className="View">
      <div className="setting">
        <div className="bb">
          <button
            id="publish"
            className="custom-btn"
            onClick={() => downloadJsonData()}
          >
            <p>
              Download Data.json file{" "}
              <FontAwesomeIcon
                style={{ color: "white", paddingBottom: ".04vw" }}
                icon={faFileDownload}
              />
            </p>
          </button>
        </div>
      </div>

      {Array.isArray(questions)
        ? questions.map((question, i) => {
            return (
              <div className="viewQuestion" key={i}>
                <div className="quesTop">
                  <div className="cnt">
                    Question: {i + 1} / {questions.length}
                  </div>
                  <Setting
                    id={question._id}
                    onDelete={handleQuestionDeletion}
                  />
                </div>
                <div className="cop">
                  <div className="left">
                    <FontAwesomeIcon icon={faQ} />
                  </div>
                  <div className="right">
                    {question.question?question.question: <img style={{maxWidth:"100%",height:"70%"}} src={question.quesimg} alt={i} />}
                  </div>
                </div>
                   
                <div className="cop">
                  <div className="left">
                    {question.a === question.correct ? (
                      <FontAwesomeIcon
                        style={{ color: "green" }}
                        icon={faCheck}
                      />
                    ) : (
                      <FontAwesomeIcon
                        style={{ color: "red" }}
                        icon={faTimes}
                      />
                    )}
                  </div>
                  <div
                    style={
                      question.a === question.correct
                        ? { color: "blue" }
                        : { color: "#2080b7" }
                    }
                    className="right"
                  >
                    {question.a}
                  </div>
                </div>
                <div className="cop">
                  <div className="left">
                    {question.b === question.correct ? (
                      <FontAwesomeIcon
                        style={{ color: "green" }}
                        icon={faCheck}
                      />
                    ) : (
                      <FontAwesomeIcon
                        style={{ color: "red" }}
                        icon={faTimes}
                      />
                    )}
                  </div>
                  <div
                    style={
                      question.b === question.correct
                        ? { color: "blue" }
                        : { color: "#2080b7" }
                    }
                    className="right"
                  >
                    {question.b}
                  </div>
                </div>
                <div className="cop">
                  <div className="left">
                    {question.c === question.correct ? (
                      <FontAwesomeIcon
                        style={{ color: "green" }}
                        icon={faCheck}
                      />
                    ) : (
                      <FontAwesomeIcon
                        style={{ color: "red" }}
                        icon={faTimes}
                      />
                    )}
                  </div>
                  <div
                    style={
                      question.c === question.correct
                        ? { color: "blue" }
                        : { color: "#2080b7" }
                    }
                    className="right"
                  >
                    {question.c}
                  </div>
                </div>

                <div className="cop">
                  <div className="left">
                    {question.d === question.correct ? (
                      <FontAwesomeIcon
                        style={{ color: "green" }}
                        icon={faCheck}
                      />
                    ) : (
                      <FontAwesomeIcon
                        style={{ color: "red" }}
                        icon={faTimes}
                      />
                    )}
                  </div>
                  <div
                    style={
                      question.d === question.correct
                        ? { color: "blue" }
                        : { color: "#2080b7" }
                    }
                    className="right"
                  >
                    {question.d}
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}
