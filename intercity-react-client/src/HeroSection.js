import React, { useState, useEffect } from "react";
import "./HeroSection.css";
import FormInput from "./FormInput";
import { Button } from "@material-ui/core";
import { instance } from "./axios";
import { useHistory } from "react-router-dom";
import RouteRow from "./RouteRow";
import EditIcon from "@material-ui/icons/Edit";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";

function HeroSection() {
  const history = useHistory();
  const [fromCity, setFromCity] = useState("Wanganui");
  const [toCity, setToCity] = useState("Palmerston North");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [passengers, setPassengers] = useState(1);

  const [routes, setRoutes] = useState([]);

  const searchPage = async () => {
    const convertedDate = moment(selectedDate).format("ddd, D MMM YYYY");

    //TODO - refactor
    const request = await instance
      .get(
        `/Route/getRouteByNameDate?fromCity=${fromCity}&toCity=${toCity}&date=${convertedDate}`
      )
      .then((response) => {
        setRoutes(response.data);
      });
  };

  const incrementPassengers = () => {
    setPassengers(passengers + 1);
  };

  const decrementPassengers = () => {
    if (passengers > 0) {
      setPassengers(passengers - 1);
    }
  };

  const swapCityNames = () => {
    setFromCity(toCity);
    setToCity(fromCity);
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
                swapIcon
                swapCities={swapCityNames}
              />
              <FormInput
                placeholderText="To"
                value={toCity}
                changeText={(e) => setToCity(e.target.value)}
              />
            </div>
            <div className="row2">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <FormInput
                  isDate
                  value={selectedDate}
                  changeText={setSelectedDate}
                />
              </MuiPickersUtilsProvider>
              <FormInput
                value={passengers}
                isNumber
                increment={incrementPassengers}
                decrement={decrementPassengers}
              />
            </div>
            <div className="hero__button">
              <Button variant="outlined" onClick={searchPage}>
                Search
              </Button>
            </div>
          </div>
        </div>

        <div
          className={`hero__results ${
            routes.length > 0 && "hero__results__appear"
          }`}
        >
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
          <div className="hero__routeResults">
            {routes?.map((route) => (
              <>
                <RouteRow
                  departureTime={route.departureTime}
                  arrivalTime={route.arrivalTime}
                  standardPrice={route.standardPrice}
                  fromCity={fromCity}
                  toCity={toCity}
                  routeId={route.routeId}
                  standardSeatPrice={route.standardPrice}
                  flexiSeatPrice={route.flexiPrice}
                  fromCityBusStop={route.fromCity.busStop}
                  toCityBusStop={route.toCity.busStop}
                  numberOfAdults={passengers}
                />
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
