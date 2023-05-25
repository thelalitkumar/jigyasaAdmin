import React from "react";
import "../style/Navbar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export default function Navbar({ authenticated, handleLogout }) {
  const subject=localStorage.getItem("subject");
  return (
    <div className="Navbar">
      <div className="left">
        <img
          src="https://jigyasa-csir.in/assets-hdft/img/logo/JIGYASA-LOGO-4.webp"
          alt="logo"
        />
      </div>
      <div className="right">
        <ul>
          <li>
            <Link className="right-menu" to="/viewQuestions">
              <p>
                view Questions{" "}
                <FontAwesomeIcon
                  style={{ color: "black", paddingBottom: ".04vw" }}
                  icon={faEye}
                />
              </p>
            </Link>
          </li>
          <li>
            <Link className="right-menu" to="/addNewQuestion">
              <p>
                Add Question{" "}
                <FontAwesomeIcon
                  style={{ color: "black", paddingBottom: ".04vw" }}
                  icon={faPlusCircle}
                />
              </p>
            </Link>
          </li>
        </ul>
      </div>
      <div className="navLeft">
      {authenticated ? (
          <>
            <p style={{color:"#3690e4",fontSize:"1vw",textTransform:"uppercase",fontWeight:600}}>Subject : {subject}</p>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
