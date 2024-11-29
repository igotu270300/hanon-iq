import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert("Login Failed!");
    }
  };

  return (
    <div>
      <header>
        <h1 className="header-login">IQ - Daily Attendance</h1>
      </header>
      <form className="form-login" onSubmit={handleLogin}>
        <input
          className="username-login"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="password-login"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="button-login" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
