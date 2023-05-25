import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Login.css";

const LoginForm = ({ handleLogin, handleSignup }) => {
  const [isLoginVisible, setLoginVisible] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSwitch = () => {
    setLoginVisible((prevState) => !prevState);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isLoginVisible) {
      try {
        await handleLogin(email, password);
        navigate("/addNewQuestion");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await handleSignup(email, password, username);
        handleSwitch();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="LOGIN">
      <div className="formContainer">
        <div className="backbox">
          <div className="loginMsg">
            <div className="textcontent">
              <p className="title">Looking to add a new subject?</p>
              <p style={{ marginTop: "2vh"}}>
                Sign up to generate dataset
              </p>
              <p style={{ marginTop: "1vh"}}>
                for additional subjects.
              </p>
              <button onClick={handleSwitch}>SIGN UP</button>
            </div>
          </div>
          <div className="signupMsg">
            <div className="textcontent">
              <p className="title">Have a existing subject?</p>
              <p style={{ marginTop: "2vh" }}>
              Log in to access and manage your
              </p>
              <p style={{ marginTop: "1vh" }}>
              existing subject dataset.
              </p>
              
              <button onClick={handleSwitch}>LOG IN</button>
            </div>
          </div>
        </div>

        <div className={`frontbox ${isLoginVisible ? "" : "moving"}`}>
          <div className={`login ${isLoginVisible ? "" : "hide"}`}>
            <h2>LOG IN</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="inputbox">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="bpop">
                <button type="submit">LOG IN</button>
              </div>
            </form>
          </div>

          <div className={`signup ${isLoginVisible ? "hide" : ""}`}>
            <h2>SIGN UP</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="inputbox">
                <input
                  type="text"
                  placeholder="Subject Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="bpop">
                <button type="submit">SIGN UP</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
