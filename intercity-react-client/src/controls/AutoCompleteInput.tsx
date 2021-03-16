import React, { ChangeEvent } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./Input.css";

interface Props {
  changeText?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholderText?: string;
}

const AutoCompleteInput = ({ changeText, placeholderText }: Props) => {
  const cityNames = [
    { title: "Wanganui" },
    { title: "Palmerston North" },
    { title: "Wellington" },
  ];

  return (
    <div className="formInput">
      <div className={`formInput__input input__defaultWidth`}>
        <Autocomplete
          options={cityNames}
          getOptionLabel={(option: any) => option.title}
          fullWidth
          renderInput={(params: any) => (
            <TextField {...params} label={placeholderText} />
          )}
          onSelect={changeText}
        />
      </div>
    </div>
  );
};

export default AutoCompleteInput;
