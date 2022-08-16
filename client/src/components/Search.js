import React, { useEffect, useState } from "react";
import Result from "./Result";
import flightData from "../data";
import axios from "axios";
import Navbar from "./Navbar";

function Search() {
  const [btnType, setbtnType] = useState("oneWay");
  const [passengerCount, setPassengerCount] = useState(1);
  const [priceRange, setPriceRange] = useState(10000);

  const [flightName, setFlightName] = useState();
  const [bookReturn, setBookReturn] = useState(false);
  const [originCity, setOriginCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [returnFilterData, setReturnFilterData] = useState([]);

  const [flightDetails, setFlightDetails] = useState([]);

  const bookType = [
    {
      name: "One way",
      id: "oneWay"
    },
    {
      name: "Return",
      id: "return"
    }
  ];

  const handleBookType = (id) => {
    setbtnType(id);
    if (id === "oneWay") {
      setIsSearchClicked(false);
      setBookReturn(false);
      setReturnDate("");
    } else if (id === "return") {
      setIsSearchClicked(false);
      setBookReturn(true);
    }
  };

  const handleCount = (key) => {
    if (key === "add") {
      if (passengerCount >= 5) {
        return;
      }
      setPassengerCount(passengerCount + 1);
    } else if (key === "less") {
      if (passengerCount === 1) {
        return;
      }
      setPassengerCount(passengerCount - 1);
    }
  };

  const handleFocus = (e) => {
    e.currentTarget.type = "date";
  };
  const handleBlur = (e) => {
    e.currentTarget.type = "text";
  };

  useEffect(() => {
    handleFilter();
    returnFilter();
  }, [priceRange]);

  const handleFilter = () => {
    let result = flightData.filter((data) => {
      if (
        data &&
        data.from.city &&
        data.to.city &&
        data.from.city
          .toLowerCase()
          .includes(originCity.trim().toLowerCase()) &&
        data.to.city
          .toLowerCase()
          .includes(destinationCity.trim().toLowerCase()) &&
        data.depart === departureDate &&
        data.price <= priceRange
      ) {
        return data;
      }
    });
    setFilteredData(result);
  };
  const returnFilter = () => {
    let result = flightData.filter((data) => {
      if (
        data &&
        data.from &&
        data.from.city &&
        data.from.city
          .toLowerCase()
          .includes(destinationCity.trim().toLowerCase()) &&
        data.to &&
        data.to.city &&
        data.to.city.toLowerCase().includes(originCity.trim().toLowerCase()) &&
        data.depart === returnDate &&
        data.price <= priceRange
      ) {
        return data;
      }
    });
    setReturnFilterData(result);
  };

  const handleSearch = () => {
    if (bookReturn && !returnDate) {
      alert("Return date can't be empty!");
    } else if (!originCity) {
      alert("Origin city can't be empty!");
    } else if (!destinationCity) {
      alert("Destination city can't be empty!");
    } else if (!departureDate) {
      alert("Departure date can't be empty!");
    }
    if (flightName && originCity && destinationCity && departureDate) {
      // setIsSearchClicked(true);
      // handleFilter();
      // if (bookReturn && returnDate) {
      //   returnFilter();
      // }
      setFlightDetails([]);
      axios
        .post("/getflightDetail", {
          flightName,
          originCity,
          destinationCity,
          departureDate
        })
        .then(function (response) {
          console.log(response);
          setFlightDetails(response?.data?.result);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="row mt-4 ml-5 mr-5">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="card">
                <div className="card-body">
                  <div className="btn-group d-flex justify-content-center">
                    {bookType.map((type) => {
                      return (
                        <button
                          type="button"
                          className={`btn ${
                            btnType === type.id ? "active_btn" : ""
                          }`}
                          key={type.id}
                          onClick={() => handleBookType(type.id)}
                        >
                          {type.name}
                        </button>
                      );
                    })}
                  </div>
                  <input
                    type="text"
                    placeholder="Enter Flight Name"
                    className="form-control mt-4"
                    onChange={(e) => setFlightName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Enter origin city"
                    className="form-control mt-4"
                    onChange={(e) => setOriginCity(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Enter destination city"
                    className="form-control mt-2"
                    onChange={(e) => setDestinationCity(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Enter departure date"
                    className="form-control mt-2"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={(e) => setDepartureDate(e.target.value)}
                  />
                  {/* {btnType === "return" ? (
                    <input
                      type="text"
                      placeholder="Enter return date"
                      className="form-control mt-2"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      onChange={(e) => setReturnDate(e.target.value)}
                    />
                  ) : null} */}
                  <div
                    className="d-flex justify-content-center mt-2"
                    style={{ alignItems: "center" }}
                  >
                    <button
                      type="button"
                      className="btn btn-secondary mr-2"
                      onClick={() => handleCount("less")}
                    >
                      -
                    </button>
                    <div className="text-muted">
                      {passengerCount} passengers
                    </div>
                    <button
                      type="button"
                      className="btn btn-secondary ml-2"
                      onClick={() => handleCount("add")}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn search_btn"
                      onClick={handleSearch}
                    >
                      <b>Search</b>
                    </button>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
        <div className="col-md-8">
        <div
                    style={{
                      marginBottom: "12rem",
                      fontWeight: "bold",
                      fontSize: "60px",
                      color: "Blue"
                     
                    }}
                  >
                    {flightDetails.length === 0 ? (
                      <div>Refine flight search</div>
                    ) : (
                      flightDetails.map((flight) => {
                        return (
                          <div>
                            <div>Flight Name - {flight.flightName}</div>
                            <div>Destination - {flight.destination}</div>
                            <div> Origin City - {flight.originCity}</div>
                            <div>Departure - {flight.departure}</div>
                          </div>
                        );
                      })
                    )}
                  </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
