import React from "react";
import "./BookingOption.css";
import { Button } from "@material-ui/core";

type Props = {
  seatType: string;
  seatPrice: number;
};

const BookingOption = ({ seatType, seatPrice }: Props) => {
  return (
    <div className="bookingOption">
      <h3>{seatType}</h3>
      <h2>
        ${seatPrice}
        <div className="small">.00</div>
      </h2>
      <Button variant="outlined">BOOK THIS</Button>

      {seatType == "Standard" ? (
        <>
          <p>Non-refundable</p>
          <p>Change or cancel up to 2 hours before departure*</p>
          <p>Credit from cancelled bookings expires same day</p>
          <p>
            Fees apply for changes made through our contact centre and selected
            agents.
          </p>
        </>
      ) : (
        <>
          <p>Fully refundable</p>
          <p>
            Change or cancel up to 2 hours before departure for a full refund*
          </p>
          <p>Credit from cancelled bookings expires after 28 days</p>
        </>
      )}
    </div>
  );
};

export default BookingOption;
