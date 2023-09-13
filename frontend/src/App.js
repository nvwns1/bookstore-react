import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar";
import Signup from "./component/Signup";
import About from "./component/About";
import Login from "./component/Login";

function App() {
  return (
    <div>
      <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      </Router>
    {/* <Navbar />
    <Login /> */}
    
    </div>
  );
}

export default App;
