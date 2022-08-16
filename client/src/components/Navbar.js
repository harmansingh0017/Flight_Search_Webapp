import React from "react";
import plane from "../assets/airplane.png";
import search from "../assets/search2.png"
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Search from "./Search";

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-light" style={{ backgroundColor: "#eee" }}>
        <div
          className="navbar-brand"
          style={{ fontWeight: "bold", fontSize: "25px" }}
        >
          
          <Link to="/"> 
          <img
            src={search}
            width="30"
            height="30"
            className="d-inline-block align-top mr-2 ml-5"
            alt="plane"
          />
          Flight Search Engine</Link>
         
        </div>
        <Button variant="contained">
          <Link to="/flightPage"> Enter Flight Data</Link>
        </Button>
      </nav>
    </div>
  );
}

export default Navbar;
