import React, { useState } from "react";
import "./Manage.css";
import FormInput from "../../components/FormInput";
import { Button } from "@material-ui/core";
import { ManageBooking } from "../../components";
import { createAPIEndpoint, ENDPOINTS } from "../../api/axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const ManageSection = () => {
  const [referenceNumber, setReferenceNumber] = useState("");
  const [email, setEmail] = useState("");
  const [selectedMemberType, setselectedMemberType] = useState(1);
  const [manageBookingSection, setManageBookingSection] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [bookingReference, setBookingReference] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [fromCityName, setFromCityName] = useState("");
  const [toCityName, setToCityName] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [noOfPassengers, setNoOfPassengers] = useState(0);
  const [fareType, setFareType] = useState("");
  const [routeId, setRouteId] = useState(0);
  const [fromCityBusStop, setFromCityBusStop] = useState("");
  const [toCityBusStop, setToCityBusStop] = useState("");

  const searchBooking = async () => {
    await createAPIEndpoint(ENDPOINTS.BOOKINGS)
      .getBookings(referenceNumber)
      .then((response: any) => {
        setFirstName(response.data.firstName);
        setBookingReference(response.data.referenceNumber);
        setDepartureDate(response.data.route.departureDate);
        setFromCityName(response.data.route.fromCityName);
        setToCityName(response.data.route.toCityName);
        setDepartureTime(response.data.route.departureTime);
        setArrivalTime(response.data.route.arrivalTime);
        setNoOfPassengers(response.data.noOfPassengers);
        setFareType(response.data.fareType);
        setRouteId(response.data.routeId);
        setFromCityBusStop(response.data.route.fromCity.busStop);
        setToCityBusStop(response.data.route.toCity.busStop);

        checkBooking();
      });
  };

  const deleteBooking = async () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await createAPIEndpoint(ENDPOINTS.BOOKINGS)
              .deleteBooking(bookingReference)
              .then(() => {
                setReferenceNumber("");
                setEmail("");
                setManageBookingSection(false);
              });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  const checkBooking = () => {
    setManageBookingSection(true);
  };

  return (
    <>
      <div
        className={`manageSection ${
          manageBookingSection && "manageSection__Hide"
        }`}
      >
        <h1>Manage your trips</h1>
        <div className="manageSection__memberType">
          <p
            className={`${
              selectedMemberType === 0 && "manageSection__memberType__selected"
            }`}
            onClick={() => {
              setselectedMemberType(0);
            }}
          >
            Members
          </p>
          <p
            className={`${
              selectedMemberType === 1 && "manageSection__memberType__selected"
            }`}
            onClick={() => {
              setselectedMemberType(1);
            }}
          >
            Non-Member
          </p>
          <p
            className={`${
              selectedMemberType === 2 && "manageSection__memberType__selected"
            }`}
            onClick={() => {
              setselectedMemberType(2);
            }}
          >
            Pass Holders
          </p>
        </div>
        <p>
          Please enter the booking reference number and the email address you
          used when booking.
        </p>
        <div className="manageSection__formContainer">
          <FormInput
            value={referenceNumber}
            changeText={(e: any) => setReferenceNumber(e.target.value)}
            placeholderText="Booking reference"
            fullSpan
          />
          <FormInput
            value={email}
            changeText={(e: any) => setEmail(e.target.value)}
            placeholderText="Email"
            fullSpan
          />
          <Button
            variant="outlined"
            onClick={() => {
              searchBooking();
            }}
          >
            Search
          </Button>
        </div>
      </div>
      {manageBookingSection && (
        <ManageBooking
          firstName={firstName}
          bookingReference={bookingReference}
          departureDate={departureDate}
          fromCityName={fromCityName}
          toCityName={toCityName}
          departureTime={departureTime}
          arrivalTime={arrivalTime}
          noOfPassengers={noOfPassengers}
          fareType={fareType}
          routeId={routeId}
          fromCityBusStop={fromCityBusStop}
          toCityBusStop={toCityBusStop}
          deleteBooking={() => {
            deleteBooking();
          }}
        />
      )}
    </>
  );
};

export default ManageSection;
