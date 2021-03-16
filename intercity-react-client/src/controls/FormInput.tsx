import React, { ChangeEvent } from "react";
import "./Input.css";

type Props = {
  changeText?: (event: ChangeEvent<HTMLInputElement>) => void;

  value?: string | number;

  placeholderText?: string;

  fullSpan?: boolean;
};

const FormInput = ({ changeText, value, placeholderText, fullSpan }: Props) => {
  return (
    <>
      <div className="formInput">
        <div
          className={`formInput__input ${!fullSpan && "input__defaultWidth"}`}
        >
          <input
            value={value}
            onChange={changeText}
            placeholder={placeholderText}
            className={`${fullSpan && "Input__fullSpan"}`}
          />
        </div>
      </div>
    </>
  );
};

export default FormInput;
