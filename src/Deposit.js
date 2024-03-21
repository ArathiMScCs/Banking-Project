import { Container, Row } from "react-bootstrap";
import { useState, useContext } from "react";
import UserContext from "./context";
import "./pagestyle.css";

export default function Deposit() {
  let people = useContext(UserContext);
  const {
    users: { users },
  } = people;
  const [deposit, setDeposit] = useState("");
  const [status, setStatus] = useState("");
  var balAnce = users?.find(
    (v) =>
      v.email === localStorage.email && v.password === localStorage.password
  )?.balance;
  console.log(balAnce);
  const [availablebal, setAvailableBal] = useState(balAnce);
  const [show, setShow] = useState(true);

  // form validation
  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      alert("Please Enter Valid Number");
      return false;
    }
    if (parseInt(field) <= 0) {
      setStatus("Error: " + label);
      alert(" Please Enter a Value greater than zero");
      return false;
    }
    return true;
  }
  function handleCreate(e) {
    e.preventDefault();
    if (!validate(deposit, "deposit")) return;
    var Money = balAnce + parseInt(deposit);
    setAvailableBal(Money);
    let user = users.forEach((ele) => {
      if (
        ele.email === localStorage.email &&
        ele.password === localStorage.password
      ) {
        ele.balance = Money;
      }
    });
    people.setvalue((prev) => ({ ...prev, users: users }));
    setShow(false);
    alert("Successfully Deposited ₹" + deposit);
  }

  function refrushForm() {
    setDeposit("");
    setShow(true);
    setStatus("");
  }
  return (
    <>
      <Container className="d-flex align-items-center  flex-column justify-content-center">
        <h2 className="text-white w-75 text-left fw-bold">Deposit</h2>
        <div className="d-flex align-items-center flex-column justify-content-center w-75 h-90 border p-3 rounded mt-1">
          <Row className="d-flex align-items-start justify-content-center w-100 my-2">
            <h1 className="m-0 p-0 w-100">Balance : ₹ {availablebal}</h1>
          </Row>
          <Row className="d-flex align-items-start justify-content-center  w-100">
            {show ? (
              <form className="p-0">
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Amount to be deposited"
                    value={deposit}
                    onChange={(e) => setDeposit(e.currentTarget.value)}
                  />
                </div>
                <br></br>
                <div>
                  <button
                    type="submit"
                    className="button "
                    onClick={handleCreate}
                  >
                    Deposit
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h5>Successful Transaction</h5>
                <br />
                <br />
                <button type="submit" className="button1" onClick={refrushForm}>
                  Add Another Deposit
                </button>
              </>
            )}
          </Row>
        </div>
      </Container>
    </>
  );
}
