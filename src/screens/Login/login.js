import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import "./login.scss";
import AuthHeader from "../../hoc/auth.header";
import { Input } from "../../components";
import { loginUser } from "../../store/actions/auth.actions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const onLogin = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(loginUser(user));
  };

  return auth.isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <div className="login">
      <AuthHeader title="log in" onSubmitHandler={(e) => onLogin(e)}>
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input type="submit" value="Let's start!" />
        <p>
          Don't you have account? <Link to="/signup">Sign up!</Link>
        </p>
      </AuthHeader>
    </div>
  );
};

export default Login;
