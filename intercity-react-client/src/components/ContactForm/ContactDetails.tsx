import React, { ChangeEvent, MouseEventHandler } from "react";
import "./ContactDetails.css";
import FormInput from "../FormInput";
import { Button } from "@material-ui/core";

type Props = {
  firstName?: string;
  lastName?: string;
  lastNameChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  email?: string;
  phoneNumber?: string;
  firstNameChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  emailChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  phoneNumberChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  goBack?: MouseEventHandler;
  goForward?: MouseEventHandler;
};

const ContactDetails = ({
  firstName,
  lastName,
  lastNameChange,
  email,
  phoneNumber,
  firstNameChange,
  emailChange,
  phoneNumberChange,
  goBack,
  goForward,
}: Props) => {
  return (
    <div className="contactDetails">
      <h1>Contact details</h1>
      <p>
        <span>Login</span> to autofill passenger details
      </p>
      <div className="contactDetails__formContainer">
        <div className="contactDetails__formContainer__row1">
          <FormInput
            value={firstName}
            changeText={firstNameChange}
            placeholderText="First Name"
          />
          <FormInput
            value={lastName}
            changeText={lastNameChange}
            placeholderText="Last Name"
          />
        </div>
        <div className="contactDetails__formContainer__row2">
          <FormInput
            value={email}
            changeText={emailChange}
            placeholderText="Email"
            fullSpan
          />
        </div>
        <div className="contactDetails__formContainer__row3">
          <FormInput
            value="New Zealand (+64)"
            changeText={phoneNumberChange}
            placeholderText="Phone"
          />
          <FormInput
            value={phoneNumber}
            changeText={phoneNumberChange}
            placeholderText="Phone"
          />
        </div>
        <div className="contactDetails__formContainer__buttons">
          <Button variant="outlined" onClick={goBack}>
            Go Back
          </Button>
          <Button variant="outlined" onClick={goForward}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
