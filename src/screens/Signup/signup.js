import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import "./signup.scss";
import AuthHeader from "../../hoc/auth.header";
import { Input } from "../../components";
import { signupUser } from "../../store/actions/auth.actions";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const onSignup = (e) => {
    e.preventDefault();
    console.log(email, password, username);
    const user = {
      email,
      password,
      username,
    };
    dispatch(signupUser(user));
  };

  return auth.isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <div className="signup">
      <AuthHeader title="Sign up" onSubmitHandler={(e) => onSignup(e)}>
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input type="submit" value="Next!" />
        <p>
          Already you an have account? <Link to="/login">Log in!</Link>
        </p>
      </AuthHeader>
    </div>
  );
};

export default Signup;
