import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import "./home.scss";
import profileIcon from "../../assets/icon.jpg";
import { ChatList } from "../../components";

import { logout } from "../../store/actions/auth.actions";

const Home = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout(auth.uid));
  };

  return (
    <div className="home">
      <div className="chatList-container">
        <div className="profile-container">
          <div className="avatar">
            <img src={profileIcon} className="profileImg" alt="profile-icon" />
            <p>Chats</p>
          </div>
          <div className="icon-container" onClick={() => onLogout()}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </div>
        </div>
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
      <div className="chatBody-container"></div>
    </div>
  );
};

export default Home;
