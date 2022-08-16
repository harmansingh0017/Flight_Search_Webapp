import { Button, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Popup from 'react-popup';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  }
}));

function FlightPage() {
  const classes = useStyles();

  const [flightName, setFlightName] = useState();
  const [originCity, setOriginCity] = useState();
  const [destination, setDestination] = useState();
  const [departure, setDeparture] = useState();
  const [passenger, setPassenger] = useState();

  const saveFlightDetails = () => {
    if (originCity && destination && departure && passenger && flightName) {
      axios
        .post("/setFlightDetails", {
          flightName,
          originCity,
          destination,
          departure,
          passenger
        })
        .then(function (response) {
          alert('Flight Details saved Successfully');
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert("Please fill all fields");
    }
  };

  const handleFocus = (e) => {
    e.currentTarget.type = "date";
  };
  const handleBlur = (e) => {
    e.currentTarget.type = "text";
  };
  return (
    <div>
      <Navbar />
      <div>
        <h3>Enter Flight Details</h3>
        <form
          className={(classes.root, "flight-form")}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Flight Name"
            variant="outlined"
            value={flightName}
            onChange={(e) => setFlightName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Origin City"
            variant="outlined"
            value={originCity}
            onChange={(e) => setOriginCity(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Destination"
            variant="outlined"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          {/* <TextField
            id="outlined-basic"
            label="Departure Date"
            variant="outlined"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
          /> */}
          <input
            type="text"
            placeholder="Enter departure date"
            className="form-control mt-2"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => setDeparture(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Number of passenger"
            variant="outlined"
            value={passenger}
            onChange={(e) => setPassenger(e.target.value)}
          />
          <Button onClick={() => saveFlightDetails()} variant="contained">
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}

export default FlightPage;
