import React, { useState, useEffect } from "react";
import "./HeroSection.css";
import FormInput from "./FormInput";
import { Button } from "@material-ui/core";
import { instance } from "./axios";
import { useHistory } from "react-router-dom";
import RouteRow from "./RouteRow";
import EditIcon from "@material-ui/icons/Edit";

function HeroSection() {
  const history = useHistory();
  const [fromCity, setFromCity] = useState("wanganui");
  const [toCity, setToCity] = useState("palmerston north");

  const [routes, setRoutes] = useState([]);

  const searchPage = async () => {
    //TODO - refactor
    const request = await instance
      .get(`/Route/getRouteByNameDate?fromCity=${fromCity}&toCity=${toCity}`)
      .then((response) => {
        setRoutes(response.data);
      });
  };

  const editSearch = () => {
    setRoutes([]);
  };
  return (
    <div>
      <div className="hero">
        <div
          className={`hero__bookingContainer ${
            routes.length > 0 && "hideForm"
          }`}
        >
          <div className="hero__bookingForm">
            <h2>Where would you like to go?</h2>
            <div className="row1">
              <FormInput
                value={fromCity}
                changeText={(e) => setFromCity(e.target.value)}
                placeholderText="From"
              />
              <FormInput
                placeholderText="To"
                value={toCity}
                changeText={(e) => setToCity(e.target.value)}
              />
            </div>
            <div className="row2">
              <FormInput placeholderText="Departure Date" />
              <FormInput placeholderText="Passengers" />
            </div>

            <div className="hero__button">
              <Button variant="outlined" onClick={searchPage}>
                Search
              </Button>
            </div>
          </div>
        </div>
        {routes.length > 0 ? (
          <div className="hero__editSearchContainer">
            <p></p>
            <h2>
              {fromCity} to {toCity}
            </h2>

            <div className="hero__editSearchButton">
              <Button variant="outlined" onClick={editSearch}>
                <EditIcon />
                Edit Search
              </Button>
            </div>
          </div>
        ) : null}

        {routes?.map((route) => (
          <>
            <RouteRow
              departureTime={route.departureTime}
              arrivalTime={route.arrivalTime}
              standardPrice={route.standardPrice}
            />
          </>
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
