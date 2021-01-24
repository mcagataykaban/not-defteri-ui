import React from "react";
import { Navbar } from "react-bootstrap";
import "./Navbarown.css";
import SimplePopover from "./SimplePopover";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Logonot from "../images/logonot.png";

const Navbarown = (props) => {
  const exitHandler = (event) => {
    event.preventDefault();
    localStorage.removeItem("login");
    sessionStorage.removeItem("login");
    window.location.href = "/";
  };
  return (
    <Navbar className="justify-content-around py-0 navbar-own" bg="light">
      <div className="d-flex align-items-baseline"> 
        <div className="mr-4"><img src={Logonot} alt="" width="30" height="30" /></div>
        <Navbar.Brand>{props.email}</Navbar.Brand>
      </div>
      <div className="d-flex">
        <SimplePopover />
        <button onClick={exitHandler} className="btn-sm btn-dark">
          <ExitToAppIcon />
        </button>
      </div>
    </Navbar>
  );
};

export default Navbarown;
