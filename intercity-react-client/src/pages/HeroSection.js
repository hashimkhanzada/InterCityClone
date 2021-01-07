import React, { useState, useEffect } from "react";
import "./HeroSection.css";
import FormInput from "../components/FormInput";
import { Button } from "@material-ui/core";
import { instance } from "../axios";
import { useHistory } from "react-router-dom";
import RouteRow from "../components/RouteRow";
import EditIcon from "@material-ui/icons/Edit";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import ContactDetails from "../components/ContactDetails";
import BookingSummary from "../components/BookingSummary";
import Receipt from "../components/Receipt";

function HeroSection() {
  const history = useHistory();
  const [fromCity, setFromCity] = useState("Wanganui");
  const [toCity, setToCity] = useState("Palmerston North");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [noOfPassengers, setnoOfPassengers] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fareType, setFareType] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [routeId, setRouteId] = useState(0);
  const [contactDetailsPage, setContactDetailsPage] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [bookingSummaryPage, setBookingSummaryPage] = useState(false);
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");

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

  const submitUserDetails = async () => {
    const submit = await instance
      .post("/Booking", {
        firstName,
        lastName,
        emailAddress,
        phoneNumber,
        noOfPassengers,
        fareType,
        totalCost,
        routeId,
      })
      .then(function (response) {
        setReferenceNumber(response.data.referenceNumber);
        setBookingSummaryPage(false);
      });
  };

  const incrementPassengers = () => {
    setnoOfPassengers(noOfPassengers + 1);
  };

  const decrementPassengers = () => {
    if (noOfPassengers > 0) {
      setnoOfPassengers(noOfPassengers - 1);
    }
  };

  const swapCityNames = () => {
    setFromCity(toCity);
    setToCity(fromCity);
  };

  const editSearch = () => {
    setRoutes([]);
  };

  const addBooking = (
    price,
    id,
    seatType,
    departDate,
    arriveTime,
    departTime
  ) => {
    setFareType(seatType);
    setTotalCost(price);
    setRouteId(id);
    setContactDetailsPage(true);
    setDepartureDate(departDate);
    setDepartureTime(arriveTime);
    setArrivalTime(departTime);
  };

  return (
    <div>
      <div className="hero">
        <div
          className={`hero__bookingContainer ${
            (routes.length > 0 && "hideForm") ||
            (contactDetailsPage && "hideForm") ||
            (bookingSummaryPage && "hideForm") ||
            (referenceNumber.length > 0 && "hideForm")
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
                value={noOfPassengers}
                isNumber
                increment={incrementPassengers}
                decrement={decrementPassengers}
              />
            </div>
            <div className="hero__button">
              {toCity && fromCity ? (
                <Button variant="outlined" onClick={searchPage}>
                  Search
                </Button>
              ) : (
                <Button variant="outlined" onClick={searchPage} disabled>
                  Search
                </Button>
              )}
            </div>
          </div>
        </div>

        <div
          className={`hero__results ${
            routes.length > 0 &&
            !contactDetailsPage &&
            !bookingSummaryPage &&
            referenceNumber.length == 0 &&
            "hero__results__appear"
          }`}
        >
          <div className="hero__editSearchContainer">
            <p></p>
            <h2>
              {fromCity} to {toCity}
            </h2>

            <div className="hero__editSearchButton">
              <Button variant="outlined" onClick={editSearch} disable>
                <EditIcon />
                Edit Search
              </Button>
            </div>
          </div>
          <div className="hero__routeResults">
            {routes?.map((route) => (
              <>
                <RouteRow
                  key={route.routeId}
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
                  numberOfAdults={noOfPassengers}
                  bookStandard={() =>
                    addBooking(
                      route.standardPrice * noOfPassengers,
                      route.routeId,
                      "standard",
                      route.departureDate,
                      route.arrivalTime,
                      route.departureTime
                    )
                  }
                  bookFlexi={() =>
                    addBooking(
                      route.flexiPrice * noOfPassengers,
                      route.routeId,
                      "flexi",
                      route.departureDate,
                      route.arrivalTime,
                      route.departureTime
                    )
                  }
                />
              </>
            ))}
          </div>
        </div>
        {contactDetailsPage && (
          <ContactDetails
            firstName={firstName}
            firstNameChange={(e) => setFirstName(e.target.value)}
            lastName={lastName}
            lastNameChange={(e) => setLastName(e.target.value)}
            email={emailAddress}
            emailChange={(e) => setEmailAddress(e.target.value)}
            phoneNumber={phoneNumber}
            phoneNumberChange={(e) => setPhoneNumber(e.target.value)}
            goBack={() => {
              setContactDetailsPage(false);
            }}
            goForward={() => {
              setBookingSummaryPage(true);
              setContactDetailsPage(false);
            }}
          />
        )}
        {bookingSummaryPage && (
          <BookingSummary
            fromCity={fromCity}
            toCity={toCity}
            routeId={routeId}
            departureDate={departureDate}
            departureTime={departureTime}
            arrivalTime={arrivalTime}
            fareType={fareType}
            noOfPassengers={noOfPassengers}
            totalCost={totalCost}
            pay={() => {
              submitUserDetails();
            }}
          />
        )}
        {referenceNumber && (
          <Receipt
            firstName={firstName}
            lastName={lastName}
            referenceNumber={referenceNumber}
          />
        )}
      </div>
    </div>
  );
}

export default HeroSection;
