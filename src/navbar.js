import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import logo from "./bank4.png";
import UserContext from "./context";
import { useContext } from "react";

export default function Navbar() {
  let people = useContext(UserContext);
  const navigate = useNavigate()

  function logout() {
    navigate('/login')
    localStorage.clear();
    people.setvalue((prev) => ({ ...prev, currentUser: {} }));
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand text-black" to="/">
          <input type="image" src={logo} className="icon" alt="logo-bank" />
        </Link>
        <button
          className="navbar-toggler bg-light"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
          {!localStorage?.email ? (<> <li className="nav-item active">
              <Link className="nav-link text-white" to="/signup">
                Sign Up
              </Link>
            </li>
          
              <li className="nav-item">
                <Link className="nav-link text-white" to="/login">
                  Sign In
                </Link>
              </li></> 
            ) : null}

            {localStorage?.email ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/deposit">
                    Deposit
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/withdraw">
                    Withdraw
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/alldata">
                    All Data
                  </Link>
                </li>
                <li className="nav-item text-white nav-link">
                  <button className="nav-button text-white" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            ) : null}
          </ul>
        </div>
      </nav>
    </>
  );
}