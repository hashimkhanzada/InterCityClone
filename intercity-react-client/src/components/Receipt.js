import React from "react";
import "./Receipt.css";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Button } from "@material-ui/core";

function Receipt({ firstName, lastName, referenceNumber }) {
  return (
    <div className="receipt">
      <CheckCircleIcon />
      <h1>Your booking was successful</h1>
      <h2>
        Thank you {firstName} {lastName}
      </h2>
      <h4>Here's your booking reference number:</h4>
      <h3>{referenceNumber}</h3>
      <Button variant="outlined">Print this page</Button>
      <p>
        <span>Important:</span>
        Your booking confirmation will be sent to the email address you
        specified during the booking process and may take up to 10 minutes to
        arrive. If you have not received your confirmation email within this
        time, please check your email spam folder and be sure to mark it as not
        spam.
      </p>
    </div>
  );
}

export default Receipt;
