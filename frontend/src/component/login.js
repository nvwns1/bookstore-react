import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login(props) {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [remember, setRemember] = useState(true);
  const handleRemember = () => {
    setRemember(!remember);
  };

  const [visible, setVisible] = useState(false);
  const handleVisible = () => {
    setVisible(!visible);
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = credentials;
    if (username === "" || password === "") {
      props.showAlert("Please Enter valid username and assword.");
      return;
    }

    const response = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const json = await response.json();
    if (json.success) {
      if (remember) {
        localStorage.setItem("token", json["token"]);
      } else {
        sessionStorage.setItem("token", json["token"]);
      }
      if (username === "admin") {
        localStorage.setItem("admin", json["token"])
        navigate("/admin");
      } else {
        navigate("/");
      }
      props.showAlert("Welcome to Book Store");
    } else {
      props.showAlert(json.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Login to your BookStore</h2>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={credentials.name}
          onChange={onChange}
          autoComplete="username"
          required
        />
        <label htmlFor="password">Password:</label>
        <div className="password">
          <input
            type={visible ? "text" : "password"}
            id="password"
            name="password"
            value={credentials.name}
            onChange={onChange}
            required
            autoComplete="current-password"
          />
          {credentials.password !== "" && (
            <span onClick={handleVisible}>{visible ? "Hide" : "Show"}</span>
          )}
        </div>
        <input
          type="checkbox"
          id="check"
          checked={remember}
          onChange={handleRemember}
          required
        />
        <label htmlFor="check">Remember me </label>
        <br />
        <input type="submit" value="Login" />
        <br />
        <br />
        Create an account! &nbsp;&nbsp;
        <Link to="/signup">Signup</Link>
      </form>
    </>
  );
}
