import React from "react";
  import EmptyPage from "./emptyPage";
  import Search from "./Search"

function Result(props) {
  const {
    filteredData,
    bookReturn,
    isSearchClicked,
    returnFilterData,
    passengerCount,
  } = props;

  return (
    <div className="card" style={{ height: "100%" }}>
      <div className="card-body">
        {!isSearchClicked &&
        filteredData.length === 0 &&
        returnFilterData.length === 0 ? (
          <EmptyPage />
        ) : isSearchClicked &&
          filteredData.length === 0 &&
          returnFilterData.length === 0 ? (
          <div
            className="d-flex justify-content-center"
            style={{ color: "red" }}
          >
            <h3>Not Found</h3>
          </div>
        ) : (
          <div>
          
            <div>
              {bookReturn && isSearchClicked ? (
                <div className="row">
                  <div className="col">
                    <div style={{ color: "deepskyblue", fontWeight: "bold" }}>
                      Departure flight
                      <p>{filteredData[0].depart}</p>
                    </div>
                    
                      filteredData={filteredData}
                      passengerCount={passengerCount}
                    />
                  </div>
                  {returnFilterData.length && returnFilterData ? (
                    <div className="col">
                      <div style={{ color: "deepskyblue", fontWeight: "bold" }}>
                        Return flight
                        <p>{returnFilterData[0].depart}</p>
                      </div>
                     
                    </div>
                  ) : null}
                </div>
              ) : (
                <>
                  <div style={{ color: "deepskyblue", fontWeight: "bold" }}>
                    Departure flight
                    <p>{filteredData[0].depart}</p>
                  </div>
                
                    filteredData={filteredData}
                    passengerCount={passengerCount}
                  />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Result;
