import React, { MouseEventHandler, ChangeEvent } from "react";
import "./FormInput.css";
import { DatePicker } from "@material-ui/pickers";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import SwapHorizRoundedIcon from "@material-ui/icons/SwapHorizRounded";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

type Props = {
  changeText?: (event: ChangeEvent<HTMLInputElement>) => void;
  changeDate?: (date: MaterialUiPickersDate) => void;
  value?: string | number;
  dateValue?: Date | null;
  placeholderText?: string;
  isDate?: boolean;
  isNumber?: boolean;
  increment?: MouseEventHandler;
  decrement?: MouseEventHandler;
  swapIcon?: boolean;
  swapCities?: MouseEventHandler;
  fullSpan?: boolean;
};

const FormInput = ({
  changeDate,
  changeText,
  value,
  dateValue,
  placeholderText,
  isDate,
  isNumber,
  increment,
  decrement,
  swapIcon,
  swapCities,
  fullSpan,
}: Props) => {
  return (
    <>
      <div className="formInput">
        <div
          className={`formInput__input ${!fullSpan && "input__defaultWidth"}`}
        >
          {isDate ? (
            <DatePicker
              style={{
                backgroundColor: "white",
                display: "flex",
                alignItems: "start",
                height: "2.8rem",
                width: "360px",
                padding: "5px 10px",
              }}
              variant="inline"
              label="Departure Date"
              value={dateValue}
              onChange={changeDate}
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
                className={`${fullSpan && "Input__fullSpan"}`}
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
};

export default FormInput;
