import React from "react";
import { DatePicker } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import "./Input.css";

interface Props {
  changeDate: (date: MaterialUiPickersDate) => void;
  dateValue?: Date | null;
}

const DateInput = ({ changeDate, dateValue }: Props) => {
  return (
    <div className="formInput">
      <div className={`formInput__input input__defaultWidth`}>
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
      </div>
    </div>
  );
};

export default DateInput;
