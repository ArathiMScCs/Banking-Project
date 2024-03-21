import "./styles.css";
import UserContext from "./context";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./login";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import Alldata from "./Alldata";
import { useState } from "react";
// import Signup from "./Signup";

export default function App() {
  const [value, setvalue] = useState({
    users: [
      {
        name: "Arathi",
        email: "arathi@gmail.com",
        password: "12345",
        balance: 0,
      },
    ],
  });
  return (
    <Router>
      <UserContext.Provider value={{ users: value, setvalue }}>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/alldata" element={<Alldata />} />
        </Routes>
      </UserContext.Provider>
      
    </Router>
  );
}
