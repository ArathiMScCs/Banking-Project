import { Container, Row } from "react-bootstrap";
import { useContext } from "react";
import UserContext from "./context";
import "./navbar.css";
import "./pagestyle.css";

export default function Alldata() {
  let people = useContext(UserContext);
  function renderTableHeader() {
    let header = Object.keys(people.users.users[0]);
    return ["Name", "Balance"].map((value, index) => {
      return <th>{value}</th>;
    });
  }
  function renderTableData() {
    return people.users.users.map((user, index) => {
      const { name, email, password, balance } = user;
      return (
        <tr>
          <td>{name}</td>
          <td>₹ {balance}</td>
        </tr>
      );
    });
  }
  return (
    <>
      <Container className="d-flex align-items-center  flex-column justify-content-center">
        <h3 className="text-white w-75 text-left fw-bold">All Transactions</h3>
        <div className="d-flex align-items-center flex-column justify-content-center w-75 h-90 border p-3 rounded mt-1">
          <Row className="d-flex align-items-start justify-content-center w-100 my-2">
            <br />
            <table id="users" className="table mt-5">
              <thead className="thead">
                <tr>{renderTableHeader()}</tr>
              </thead>
              <tbody>{renderTableData()}</tbody>
            </table>
            <br />
          </Row>
        </div>
      </Container>
    </>
  );
}
