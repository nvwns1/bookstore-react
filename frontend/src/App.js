import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar";
import Signup from "./component/Signup";
import About from "./component/About";
import Login from "./component/Login";
import Alert from "./component/Alert";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  return (
    <div>
      <Router>
        <Navbar />
        <Alert alert={alert} />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route path="/signup" element={<Signup showAlert={showAlert} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
