import { useState } from "react";

export default function Signup() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, username, password } = credentials;
    const response = await fetch("http://localhost:8000/auth/createUser", {
        method: "POST",
        headers: {
            'Content-Type' : 'application/json'
        }, 
        body: JSON.stringify({name,username, email, password})
    });
    const json = await response.json()
    console.log(json)
    if(json.success){
        localStorage.setItem("token", json['auth-token'])
        console.log("created account")
    }else{
        console.log("Invalid Details")
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
        />

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={credentials.username}
          onChange={onChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          id="email"
          value={credentials.email}
          onChange={onChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="text"
          name="password"
          id="password"
          value={credentials.password}
          onChange={onChange}
        />

        <label htmlFor="email">Confirm Password:</label>
        <input
          type="text"
          name="cpassword"
          id="cpassword"
          value={credentials.cpassword}
          onChange={onChange}
        />

        <input type="submit" value="Signup" />
      </form>
    </>
  );
}