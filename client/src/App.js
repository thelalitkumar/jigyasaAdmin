import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";

import EditQuestion from "./components/EditQuestion";
import Navbar from "./components/Navbar";
import Question from "./components/Question";
import View from "./components/View";
import LoginSignUpForm from "./components/Login";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(`/login`, {
        email,
        password,
      });
      const { username, token } = response.data;

      // Save the token to local storage or a state management solution
      localStorage.setItem("subject", username);
      localStorage.setItem("token", token);
      setAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("subject");
      localStorage.removeItem("token");
      setAuthenticated(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = async (email, password, username) => {
    try {
      const response = await axios.post(`/signup`, {
        email,
        password,
        username,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Router>
        <Navbar authenticated={authenticated} handleLogout={handleLogout}  />
        <Routes>
          <Route
            path="/"
            element={
              <LoginSignUpForm
                handleLogin={handleLogin}
                handleSignup={handleSignup}
              />
            }
          />
          <Route
            path="/viewQuestions"
            element={authenticated ? <View /> : <Navigate to="/" />}
          />
          <Route
            path="/addNewQuestion"
            element={authenticated ? <Question /> : <Navigate to="/" />}
          />
          <Route
            path="/editQuestion/:id"
            element={authenticated ? <EditQuestion /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
