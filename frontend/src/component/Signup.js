import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup(props) {
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    cpassword: "",
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const [visible, setVisible] = useState(false)
  const handleVisible = ()=>{
    setVisible(!visible)
  }
  const [cvisible, setcVisible] = useState(false)
  const chandleVisible = ()=>{
    setcVisible(!cvisible)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, username, password, cpassword } = credentials;
    if (cpassword !== password) {
      props.showAlert("Password and Confirm Password Doesnot Match");
      return;
    }
    const response = await fetch("http://localhost:8000/auth/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, username, email, password }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json["auth-token"]);
      navigate("/");
      props.showAlert("Account Created Successfully");
      console.log("created account");
    } else {
      console.log("Invalid Details");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={credentials.name}
          onChange={onChange}
          required
        />
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={credentials.username}
          onChange={onChange}
          required
          autoComplete="username"
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          id="email"
          value={credentials.email}
          onChange={onChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <div className="password">
        <input
          type= {visible? "text":"password"}
          name="password"
          id="password"
          value={credentials.password}
          onChange={onChange}
          required
          autoComplete="current-password"
        />
        <span onClick={handleVisible}>
          {visible? "Hide": "Show"}
        </span>
        </div>
        
        <label htmlFor="email">Confirm Password:</label>
        <div className="password">
        <input
          type={cvisible? "text":"password"}
          name="cpassword"
          id="cpassword"
          value={credentials.cpassword}
          onChange={onChange}
          autoComplete="current-password"
          required
        />
        <span onClick={chandleVisible}>
          {cvisible? "Hide": "Show"}
        </span>
        </div>
        <input type="submit" value="Signup" />
        <br />
        <br />
        Already has an account? &nbsp; &nbsp;
        <Link to="/login">Login</Link>
      </form>
    </>
  );
}
