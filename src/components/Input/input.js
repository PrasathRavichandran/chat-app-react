import React from "react";
import "./input.scss";

const Input = ({ type, ...rest }) => {
  return (
    <div className="form-control">
      <input className="form-input" type={type} {...rest} />
    </div>
  );
};

export default Input;
