import React, { MouseEventHandler } from "react";
import "./BookingSummary.css";
import FormInput from "../FormInput";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

type Props = {
  fromCity: string;
  toCity: string;
  routeId: number;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  fareType: string;
  noOfPassengers: number;
  totalCost: number;
  pay: MouseEventHandler;
};

const BookingSummary = ({
  fromCity,
  toCity,
  routeId,
  departureDate,
  departureTime,
  arrivalTime,
  fareType,
  noOfPassengers,
  totalCost,
  pay,
}: Props) => {
  return (
    <div className="bookingSummary">
      <div className="bookingSummary__summary">
        <h1>Booking summary</h1>
        <div className="bookingSummary__summary__container">
          <div className="bookingSummary__summary__container__row1">
            <div className="bookingSummary__summary__container__cities">
              {fromCity} to {toCity} ({routeId})
            </div>
            <div className="bookingSummary__summary__container__info">
              <div className="bookingSummary__summary__container__infoTime">
                <p>{departureDate}</p>
                <p>
                  {departureTime} - {arrivalTime}
                </p>
                <p>
                  {fareType} x {noOfPassengers}
                </p>
              </div>
              <div className="bookingSummary__summary__container__infoPrice">
                <h3>
                  ${totalCost}
                  <span>.00</span>
                </h3>
              </div>
            </div>
          </div>
          <div className="bookingSummary__summary__container__row2">
            <h1>TOTAL</h1>
            <h1>${totalCost}.00</h1>
          </div>
        </div>
        <Button variant="outlined">
          <AddIcon /> Add another journey
        </Button>
      </div>

      <div className="bookingSummary__payment">
        <h1>Payment method</h1>
        <div className="bookingSummary__payment__container">
          <FormInput placeholderText="Card number" fullSpan />
          <FormInput placeholderText="Name on Card" fullSpan />

          <div className="bookingSummary__payment__container__row2">
            <input placeholder="Expiry Date" />
            <input placeholder="Security Code" />
          </div>
          <div className="bookingSummary__payment__container__terms">
            <input type="checkbox" />
            <p>
              I agree to the <span>terms and conditions</span>
            </p>
          </div>
          <div className="bookingSummary__payment__container__total">
            <h3>TOTAL ${totalCost}.00</h3>
            <p>Price is given in NZD (includes GST)</p>
          </div>
          <div className="btn1">
            <Button variant="outlined" onClick={pay}>
              Pay by credit card
            </Button>
          </div>
          <div className="btn2">
            <Button variant="outlined" onClick={pay}>
              Pay with internet Banking
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
