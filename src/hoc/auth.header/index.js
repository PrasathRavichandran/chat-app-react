import React from "react";
import "./auth.header.scss";

const AuthHeader = ({ children, title, onSubmitHandler }) => {
  return (
    <div className="auth__header">
      <div className="header">
        <h1>{title}</h1>
        <p>
          Hi there, you can logged here to connect with peoples. Get in touch
          with friends!
        </p>
      </div>
      <form onSubmit={onSubmitHandler}>{children}</form>
    </div>
  );
};

export default AuthHeader;
