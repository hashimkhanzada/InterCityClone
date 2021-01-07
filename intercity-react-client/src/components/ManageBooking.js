import React, { useState } from "react";
import "./ManageBooking.css";
import { Button } from "@material-ui/core";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import WorkIcon from "@material-ui/icons/Work";
import WifiIcon from "@material-ui/icons/Wifi";
import LocationOnIcon from "@material-ui/icons/LocationOn";

function ManageBooking({
  firstName,
  bookingReference,
  departureDate,
  fromCityName,
  toCityName,
  departureTime,
  arrivalTime,
  noOfPassengers,
  fareType,
  routeId,
  fromCityBusStop,
  toCityBusStop,
  deleteBooking,
}) {
  const [selectedManageType, setselectedManageType] = useState(0);

  const [viewText, setViewText] = useState("View Details");
  const [bookingDetails, setBookingDetails] = useState(false);

  const showBookingDetails = () => {
    if (bookingDetails) {
      setBookingDetails(false);
      setViewText("View Details");
    } else {
      setBookingDetails(true);
      setViewText("Less Details");
    }
  };

  return (
    <>
      <div className="manageBooking">
        <h1>Hi {firstName}, welcome back</h1>
        <Button variant="outlined">Log Out</Button>

        <div className="manageBooking__manageType">
          <p
            className={`${
              selectedManageType == 0 && "manageBooking__manageType__selected"
            }`}
            onClick={() => {
              setselectedManageType(0);
            }}
          >
            Bookings
          </p>
          <p
            className={`${
              selectedManageType == 1 && "manageBooking__manageType__selected"
            }`}
            onClick={() => {
              setselectedManageType(1);
            }}
          >
            FAQs
          </p>
          <p
            className={`${
              selectedManageType == 2 && "manageBooking__manageType__selected"
            }`}
            onClick={() => {
              setselectedManageType(2);
            }}
          >
            Sign Up
          </p>
        </div>
      </div>
      <div className="Bookings">
        <h1>Your Bookings</h1>
        <p>
          If you need to cancel a booking just select it from the Travel Summary
          below and click cancel.
        </p>
        <p>
          {" "}
          Cancellations can be made on all coach bookings up to 2 hours prior to
          departure.
        </p>
        <h2>Booking Reference: {bookingReference}</h2>
        <Button variant="outlined">Update Passenger Details</Button>

        <div className="Bookings__card" onClick={showBookingDetails}>
          <div className="Bookings__card__date">{departureDate}</div>

          <div className="Bookings__card__cities">
            {fromCityName} to {toCityName}
          </div>
          <div className="Bookings__card__timesRow">
            <div className="Bookings__card__times">
              {departureTime} - {arrivalTime}
            </div>
            <div className="Bookings__card__viewDetails">{viewText}</div>
          </div>
        </div>
        <div
          className={`Bookings__card__info ${
            !bookingDetails && "Bookings__card__info__hide"
          }`}
        >
          <div className="Bookings__card__info__passengers">
            <h1>{noOfPassengers} Passenger</h1>
            <h2>
              {noOfPassengers} x {fareType}
            </h2>
          </div>
          <div className="Bookings__card__info__summary">
            <div className="Bookings__card__info__summary_cities">
              <img
                className="routeRow__logo"
                src="https://www.intercity.co.nz/resources/themes/intercity/images/intercity-logo.svg"
                alt=""
              />
              <h3>
                ({routeId}) {fromCityName} - {toCityName}
              </h3>
            </div>
            <div className="Bookings__card__info__summary_icons">
              <AcUnitIcon />
              <WorkIcon />
              <WifiIcon />
            </div>
          </div>
          <div className="Bookings__card__info__busStops">
            <div className="Bookings__card__info__busStopInfo">
              <p>{departureTime}</p> <h3>{fromCityBusStop}</h3>
              <LocationOnIcon />
            </div>
            <div className="Bookings__card__info__busStopInfo">
              <p>{arrivalTime}</p> <h3>{toCityBusStop}</h3>
              <LocationOnIcon />
            </div>
          </div>
          <div className="Bookings__card__info__buttons">
            <Button variant="outlined" onClick={deleteBooking}>
              Cancel Booking
            </Button>
            <Button variant="outlined" disabled>
              Change Booking
            </Button>
          </div>
          <div className="Bookings__card__info__endText">
            <p>
              See <span>full terms and conditions</span> for managing your
              booking.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageBooking;
