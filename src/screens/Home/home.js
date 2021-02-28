import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/auth.actions";

import "./home.scss";

const Home = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Home page</h1>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
};

export default Home;
