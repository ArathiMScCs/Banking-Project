import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useContext } from "react";
import userContext from "./context";
import "./pagestyle.css";

export default function Signup() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  let people = useContext(userContext);
  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      alert("Please enter " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (label === "password" && password.length < 8) {
      setStatus("Error: " + label);
      alert("Please enter minimum 8 characters");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (label === "name") {
      if (!isNaN(field)) {
        setStatus("Error: " + label);
        alert("Please Enter Valid Name");
        setTimeout(() => setStatus(""), 3000);
        return false;
      }
    }
    if (label === "email") {
      //setStatus("Error: " + label);
      var pattern = new RegExp(
        /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,6}$/
      );
      if (!pattern.test(email)) {
        alert("Please enter a valid email address");
        setTimeout(() => setStatus(""), 3000);
        return false;
      }
      // else{
      //   people.users.users.map(u=>
      //     email == u.email ? alert("This email is already exist"):null
      //     )
      //     return false;
      // }
    }
    if (label === "phone") {
      let phonePattern = /^[6-9]{1}[0-9]{9}$/;
      if (!phonePattern.test(phone)) {
        alert("Please enter a valid phone number");
        setTimeout(() => setStatus(""), 3000);
        return false;
      }
    }
    return true;
  }
  function handleCreate(e) {
    e.preventDefault();
    console.log(name, email,phone, password);
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(phone, "phone")) return;
    if (!validate(password, "password")) return;
    // people.users.users.push({ name, email, password, phone, balance: 0 });
    people.setvalue((prev) => ({
      ...prev,
      users: [...prev.users, { name, email, password, phone, balance: 0 }],
    }));
    setShow(false);
    alert("Successfully Created");
  }
  function refreshForm() {
    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setShow(true);
  }
  return (
    <>
      <div className="container mt-5" id="form">
        {show ? (
          <>
            <div className="row ">
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                  />
                  <div>
                    <label htmlFor="exampleInputPhone1">Phone number</label>
                    <input
                      type="number"
                      className="form-control"
                      id="exampleInputPhone1"
                      placeholder="Phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.currentTarget.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                  />
                </div>
                <br></br>
                <div>
                  <button
                    type="submit"
                    className="button "
                    disabled={!name && !email && !phone && !password}
                    onClick={handleCreate}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <>
            <h5>Successfully Account Created</h5>
            <button type="submit" className="button1" onClick={refreshForm}>
              Add another account
            </button>
          </>
        )}
      </div>
    </>
  );
}
