import React, { useState } from "react";
import "./FormInput.css";
import { DatePicker } from "@material-ui/pickers";

function FormInput({ changeText, value, placeholderText, isDate }) {
  return (
    <>
      <div className="formInput">
        <div className="formInput__input">
          {isDate ? (
            <DatePicker
              style={{
                backgroundColor: "white",
                display: "flex",
                alignItems: "start",
                height: "2.8rem",
                width: "380px",
                border: "1px solid #47c132",
                borderRadius: "7px",
                padding: "5px 10px",
              }}
              variant="inline"
              label="Departure Date"
              value={value}
              onChange={changeText}
              fullWidth
            />
          ) : (
            <input
              value={value}
              onChange={changeText}
              placeholder={placeholderText}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default FormInput;
