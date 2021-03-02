import React from "react";
// import { useDispatch } from "react-redux";
// import { logout } from "../../store/actions/auth.actions";

import "./home.scss";
import profileIcon from "../../assets/icon.jpg";
import { ChatList } from "../../components";

const Home = () => {
  // const dispatch = useDispatch();
  return (
    <div className="home">
      <div className="chatList-container">
        <div className="search-container">
          <div className="form-control">
            <input className="form-input" placeholder="Search..." />
          </div>
        </div>
        <div className="chatList">
          <ChatList
            profileIcon={profileIcon}
            user={"John Trump"}
            lastMessage={"I hope that you'll need the..."}
            timer={"3 min"}
          />
        </div>
      </div>
      <div className="chatBody-container">
        
      </div>
    </div>
  );
};

export default Home;
