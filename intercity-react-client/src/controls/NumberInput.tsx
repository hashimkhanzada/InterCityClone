import React, { MouseEventHandler } from "react";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import "./Input.css";

interface Props {
  value?: string | number;
  increment?: MouseEventHandler;
  decrement?: MouseEventHandler;
}

const NumberInput = ({ value, decrement, increment }: Props) => {
  return (
    <div className="formInput">
      <div className={`formInput__input input__defaultWidth`}>
        <input value="Passenger" readOnly />
        <RemoveIcon className="counterIcon" onClick={decrement} />
        <p>{value}</p>
        <AddIcon className="counterIcon" onClick={increment} />
      </div>
    </div>
  );
};

export default NumberInput;
