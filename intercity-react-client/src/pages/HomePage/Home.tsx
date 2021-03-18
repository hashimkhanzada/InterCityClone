import React, { useState, useEffect } from "react";
import "./Home.css";
import AutoCompleteInput from "../../controls/AutoCompleteInput";
import DateInput from "../../controls/DateInput";
import NumberInput from "../../controls/NumberInput";
import { Button } from "@material-ui/core";
import { createAPIEndpoint, ENDPOINTS } from "../../api/axios";
import { RouteRow } from "../../components";
import EditIcon from "@material-ui/icons/Edit";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import { ContactDetails } from "../../components";
import { BookingSummary } from "../../components";
import { Receipt } from "../../components";

interface RouteInfo {
  routeId: number;
  departureTime: string;
  arrivalTime: string;
  standardPrice: number;
  flexiPrice: number;
  fromCity: { busStop: string };
  toCity: { busStop: string };
  departureDate: string;
}

const HeroSection = () => {
  const [fromCity, setFromCity] = useState("Wanganui");
  const [toCity, setToCity] = useState("Palmerston North");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [noOfPassengers, setnoOfPassengers] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fareType, setFareType] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [routeId, setRouteId] = useState(0);
  const [contactDetailsPage, setContactDetailsPage] = useState(false);
  const [bookingSummaryPage, setBookingSummaryPage] = useState(false);
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");

  const [routes, setRoutes] = useState<any>([]);

  useEffect(() => {
    if (window.innerWidth <= 960) {
      alert("This app is currently only suitable for desktop mode")
    }
  }, []);

  const searchPage = async () => {
    const convertedDate = moment(selectedDate).format("ddd, D MMM YYYY");

    await createAPIEndpoint(ENDPOINTS.ROUTE)
      .createRoute(fromCity, toCity, convertedDate)
      .then(async () => {
        await createAPIEndpoint(ENDPOINTS.ROUTELIST)
          .fetchByCityAndDate(fromCity, toCity, convertedDate)
          .then((response: any) => {
            setRoutes(response.data);
          });
      });
  };

  const submitUserDetails = async () => {
    await createAPIEndpoint(ENDPOINTS.BOOKINGS)
      .createBooking(
        firstName,
        lastName,
        emailAddress,
        phoneNumber,
        noOfPassengers,
        fareType,
        totalCost,
        routeId
      )
      .then((response: any) => {
        setReferenceNumber(response.data.referenceNumber);
        setBookingSummaryPage(false);
      });
  };

  const incrementPassengers = () => {
    setnoOfPassengers(noOfPassengers + 1);
  };

  const decrementPassengers = () => {
    if (noOfPassengers > 1) {
      setnoOfPassengers(noOfPassengers - 1);
    }
  };

  const editSearch = () => {
    setRoutes([]);
  };

  const addBooking = (
    price: number,
    id: number,
    seatType: string,
    departDate: string,
    arriveTime: string,
    departTime: string
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
              <AutoCompleteInput
                changeText={(e) => {
                  console.log(e.target.value);
                  setFromCity(e.target.value);
                }}
                placeholderText="From"
              />

              <AutoCompleteInput
                placeholderText="To"
                changeText={(e) => setToCity(e.target.value)}
              />
            </div>
            <div className="row2">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateInput
                  dateValue={selectedDate}
                  changeDate={setSelectedDate}
                />
              </MuiPickersUtilsProvider>
              <NumberInput
                value={noOfPassengers}
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
                <Button variant="outlined" disabled>
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
            referenceNumber.length === 0 &&
            "hero__results__appear"
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
            {routes?.map((route: RouteInfo) => (
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
};

export default HeroSection;
