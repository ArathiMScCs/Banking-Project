import { useState } from "react";
import { useContext } from "react";
import Usercontext from "./context";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let people = useContext(Usercontext);
  const { users, setvalue } = people;
  const navigate = useNavigate()
  function Submit(e) {
    e.preventDefault();
    const user = users.users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      localStorage.setItem("email", user.email);
      localStorage.setItem("password", user.password);
      setvalue((prev) => ({ ...prev, currentUser: user }));
      setEmail("");
      setPassword("");
      navigate('/deposit')
    } else {
      alert("Invalid email or password");
    }
  }
  return (
    <>
      <div className="container mt-5" id="form">
        <>
          <div className="row ">
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <br></br>
              <button type="submit" className="button" onClick={Submit}>
                login
              </button>
              {/* <button type="submit" className="button " onClick={logout}>
                logout
              </button> */}
            </form>
          </div>
        </>
      </div>
    </>
  );
}
