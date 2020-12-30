import React from "react";
import "./FormInput.css";

function FormInput({ changeText, value, placeholderText }) {
  return (
    <div className="formInput">
      <div className="formInput__input">
        <input
          value={value}
          onChange={changeText}
          placeholder={placeholderText}
        />
      </div>
    </div>
  );
}

export default FormInput;
