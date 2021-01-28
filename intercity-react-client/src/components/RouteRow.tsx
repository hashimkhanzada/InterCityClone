import React, { useState, MouseEventHandler } from "react";
import "./RouteRow.css";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import WorkIcon from "@material-ui/icons/Work";
import WifiIcon from "@material-ui/icons/Wifi";
import AirlineSeatReclineExtraIcon from "@material-ui/icons/AirlineSeatReclineExtra";
import BookingOption from "./BookingOption";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import LocationOnIcon from "@material-ui/icons/LocationOn";

type Props = {
  departureTime?: string;
  arrivalTime?: string;
  standardPrice?: number;
  fromCity?: string;
  toCity?: string;
  routeId?: number;
  standardSeatPrice: number;
  flexiSeatPrice: number;
  fromCityBusStop?: string;
  toCityBusStop?: string;
  numberOfAdults: number;
  bookStandard?: MouseEventHandler;
  bookFlexi?: MouseEventHandler;
};

const RouteRow = ({
  departureTime,
  arrivalTime,
  standardPrice,
  fromCity,
  toCity,
  routeId,
  standardSeatPrice,
  flexiSeatPrice,
  fromCityBusStop,
  toCityBusStop,
  numberOfAdults,
  bookStandard,
  bookFlexi,
}: Props) => {
  const [routeDetails, setRouteDetails] = useState(false);

  const showDetails = () => {
    if (routeDetails) {
      setRouteDetails(false);
    } else {
      setRouteDetails(true);
    }
  };

  return (
    <div className={`routeRow ${routeDetails && "routeRow__border"}`}>
      <div className="routeRow__main" onClick={showDetails}>
        <div className="routeRow__timeInfo">
          <div className="routeRow__fareTime">
            <h2>{departureTime}</h2>
            <p>DEPARTURES</p>
          </div>
          <div className="routeRow__tripLine" />
          <div className="routeRow__tripInfo">
            <p>Direct Service</p>
            <p>1h 30m</p>
          </div>
          <div className="routeRow__tripLine" />
          <div className="routeRow__fareTime">
            <h2>{arrivalTime}</h2>
            <p>ARRIVES</p>
          </div>
        </div>
        <div className="routeRow__price">
          <p>From</p>
          <h2>${standardPrice}.00</h2>
        </div>
      </div>

      <div
        className={`routeRow__infoContainer ${
          !routeDetails && "routeRow__infoContainer__hide"
        }`}
      >
        <div className="routeRow__info">
          <div className="routeRow__info__details">
            <div className="routeRow__info__details__summary">
              <div className="routeRow__info__details__cities">
                <img
                  className="routeRow__logo"
                  src="https://www.intercity.co.nz/resources/themes/intercity/images/intercity-logo.svg"
                  alt=""
                />
                <h3>
                  ({routeId}) {fromCity} - {toCity}
                </h3>
              </div>
              <div className="routeRow__info__details__icons">
                <AcUnitIcon />
                <WorkIcon />
                <WifiIcon />
              </div>
            </div>

            <div className="routeRow__info__details__busStops">
              <div className="routeRow__info__details__busStopInfo">
                <p>{departureTime}</p> <h3>{fromCityBusStop}</h3>
                <LocationOnIcon />
              </div>
              <div className="routeRow__info__details__busStop__duration">
                <p>1h 30m</p> <h3>DURATION</h3>
              </div>
              <div className="routeRow__info__details__busStopInfo">
                <p>{arrivalTime}</p> <h3>{toCityBusStop}</h3>
                <LocationOnIcon />
              </div>
            </div>
            <div className="routeRow__info__details__importantInfo">
              <div className="routeRow__info__details__importantInfo__header">
                <InfoOutlinedIcon />
                IMPORTANT INFORMATION
              </div>
              <div className="routeRow__info__details__importantInfo__body">
                <p>
                  Please allow at least 90 minutes between the scheduled arrival
                  time at Wellington Airport and your flight check-in time as we
                  cannot be responsible for missed flights through delays.
                </p>
                <p>
                  Please allow at least 90 minutes between the scheduled arrival
                  time at Wellington Airport and your flight check-in time as we
                  cannot be responsible for missed flights through delays.
                </p>
              </div>
            </div>
          </div>
          <div className="routeRow__info__booking__container">
            <div className="routeRow__info__booking__seats">
              <AirlineSeatReclineExtraIcon />
              {numberOfAdults} {numberOfAdults > 1 ? "Adults" : "Adult"}
            </div>
            <div className="routeRow__info__booking__options">
              <div
                className="routeRow__info__booking__optionsinfo1"
                onClick={bookStandard}
              >
                <BookingOption
                  seatType="Standard"
                  seatPrice={standardSeatPrice}
                />
              </div>
              <div
                className="routeRow__info__booking__optionsinfo2"
                onClick={bookFlexi}
              >
                <BookingOption seatType="Flexi" seatPrice={flexiSeatPrice} />
              </div>
            </div>
            <div className="routeRow__info__booking__extraInfo">
              <p>*Additional fare charges & booking fees apply. </p>
              <p>
                Booking fees are non-refundable. <span>Find out more</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteRow;
