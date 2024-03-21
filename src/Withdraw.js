import { Container, Row } from "react-bootstrap";
import { useState, useContext } from "react";
import UserContext from "./context";
import "./pagestyle.css";

export default function Withdraw() {
  let people = useContext(UserContext);
  const [withdraw, setWithdraw] = useState("");
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(true);
  const {
    users: { users },
  } = people;
  var balAnce = users?.find(
    (v) =>
      v.email === localStorage.email && v.password === localStorage.password
  )?.balance;
  const [availablebal, setAvailableBal] = useState(balAnce);

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
    console.log(parseInt(field) <= balAnce);
    if (!(parseInt(field) <= balAnce)) {
      setStatus("Error: " + label);
      alert("Sorry mate, you don't have enough cash to Withdraw");
      return false;
    }
    return true;
  }

  function handleCreate(e) {
    e.preventDefault();

    if (!validate(withdraw, "withdraw")) return;
    var Money = balAnce - parseInt(withdraw);
    setAvailableBal(Money);
    let user = users.forEach((element) => {
      if (
        element.email === localStorage.email &&
        element.password === localStorage.password
      ) {
        element.balance = Money;
      }
    });
    people.setvalue((prev) => ({ ...prev, users: users }));
    setShow(false);
    alert("Successfully Withdraw ₹" + withdraw);
  }
  function refrushForm() {
    setWithdraw("");
    setShow(true);
  }
  return (
    <>
      <Container className="d-flex align-items-center  flex-column justify-content-center">
        <h2 className="text-white w-75 text-left fw-bold">Withdraw</h2>
        <div className="d-flex align-items-center flex-column justify-content-center w-75 h-90 border p-3 rounded mt-1">
          <Row className="d-flex align-items-start justify-content-center w-100 my-2">
            <h1 className="m-0 p-0 w-100">Balance : ₹ {availablebal} </h1>
          </Row>
          <Row className="d-flex align-items-start justify-content-center  w-100">
            {show ? (
              <form className="p-0" onSubmit={handleCreate}>
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Amount to withdraw"
                    value={withdraw}
                    onChange={(e) => setWithdraw(e.currentTarget.value)}
                  />
                </div>
                <br></br>
                 <button
                  type="submit"
                  className="button my-2"
                  disabled={!withdraw}
                >
                  Withdraw
                </button>
              </form>
            ) : (
              <>
                <h5>Successful Transaction</h5>
                <br />
                <br />
                <button type="submit" className="button1" onClick={refrushForm}>
                  Add Another Withdraw
                </button>
              </>
            )}
          </Row>
        </div>
      </Container>
    </>
  );
}
