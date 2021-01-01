import React, { useState } from "react";
import "./FormInput.css";
import { DatePicker } from "@material-ui/pickers";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import SwapHorizRoundedIcon from "@material-ui/icons/SwapHorizRounded";

function FormInput({
  changeText,
  value,
  placeholderText,
  isDate,
  isNumber,
  increment,
  decrement,
  swapIcon,
  swapCities,
}) {
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
                padding: "5px 10px",
              }}
              variant="inline"
              label="Departure Date"
              value={value}
              onChange={changeText}
              fullWidth
            />
          ) : isNumber ? (
            <>
              <input value="Passenger" />

              <RemoveIcon className="counterIcon" onClick={decrement} />
              <p>{value}</p>
              <AddIcon className="counterIcon" onClick={increment} />
            </>
          ) : (
            <>
              <input
                value={value}
                onChange={changeText}
                placeholder={placeholderText}
              />

              {swapIcon && (
                <SwapHorizRoundedIcon
                  className="swapIconSVG"
                  onClick={swapCities}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default FormInput;
