import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faPhoneAlt, faVideo, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import "./home.scss";
import profileIcon from "../../assets/icon.jpg";
import { ChatList } from "../../components";

import { logout } from "../../store/actions/auth.actions";
import { getRealTimeUsers } from "../../store/actions/user.actions";

const Home = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    getUsers();
  }, []);

  const onLogout = () => {
    dispatch(logout(auth.uid));
  };

  const getUsers = () => {
    dispatch(getRealTimeUsers(auth?.uid));
  }

  return (
    <div className="home">
      <div className="chatList-container">
        <div className="profile-container">
          <div className="avatar">
            <img src={profileIcon} className="profileImg" alt="profile-icon" />
            <p>{auth?.displayName}</p>
          </div>
          <div className="icon-container" onClick={() => onLogout()}>
            <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
          </div>
        </div>
        <div className="search-container">
          <div className="form-control">
            <input className="form-input" placeholder="Search..." />
          </div>
        </div>
        <div className="chatList">
          {user?.users?.length > 0 ?
            user?.users?.map(user => {
              return (<ChatList
                profileIcon={profileIcon}
                user={user.username}
                lastMessage={"I hope that you'll need the..."}
                timer={user}
                key={user.uid}
              />)
            }) : null
          }

        </div>
      </div>
      <div className="chatBody-container">
        <div className="chatBody-header">
          <div className="avatar">
            <img src={profileIcon} className="profileImg" alt="profile-icon" />
            <p>Ravichandran</p>
          </div>
          <div className="header-option">
            <div className="icon-container">
              <FontAwesomeIcon icon={faPhoneAlt} className="icon" />
            </div>
            <div className="icon-container">
              <FontAwesomeIcon icon={faVideo} className="icon" />
            </div>
          </div>
        </div>
        <div className="chatBody"></div>
        <div className="chatBody-input">
          <div className="form-control">
            <input className="form-input" placeholder="Type your message here.." />
            <div className="icon-container">
              <FontAwesomeIcon icon={faPaperPlane} className="icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
