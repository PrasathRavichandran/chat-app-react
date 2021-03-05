import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faPhoneAlt,
  faVideo,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

import "./home.scss";
import profileIcon from "../../assets/icon.jpg";
import { ChatList } from "../../components";

import { logout } from "../../store/actions/auth.actions";
import { getRealTimeUsers } from "../../store/actions/user.actions";

const Home = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  const [chatStarted, setChatStarted] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    getUsers();
  }, [user]);

  const onLogout = () => {
    dispatch(logout(auth.uid));
  };

  const getUsers = () => {
    dispatch(getRealTimeUsers(auth?.uid));
  };

  const initChat = (user) => {
    setChatStarted(true);
    setUserDetails(user);
  };

  useEffect(() => {
    reloadWhenSignout();
  }, [user]);

  const reloadWhenSignout = () => {
    user?.users?.map((item) => {
      if (item.uid === userDetails?.uid) {
        setUserDetails(item);
      }
    });
  };

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
          {user?.users?.length > 0 ? (
            user?.users?.map((user) => {
              return (
                <ChatList
                  profileIcon={profileIcon}
                  user={user.username}
                  lastMessage={"I hope that you'll need the..."}
                  timer={user}
                  key={user.uid}
                  onChatListClick={() => initChat(user)}
                />
              );
            })
          ) : (
            <div>
              <p>No users found!</p>
            </div>
          )}
        </div>
      </div>
      <div className="chatBody-container">
        {chatStarted ? (
          <>
            <div className="chatBody-header">
              <div className="avatar">
                <img
                  src={profileIcon}
                  className="profileImg"
                  alt="profile-icon"
                />
                <div>
                  <p className="heading">{userDetails?.username}</p>
                  <p className={[userDetails.isOnline && "online"]}>
                    {userDetails.isOnline
                      ? "online"
                      : moment(userDetails.createdAt.toDate()).fromNow()}
                  </p>
                </div>
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
                <input
                  className="form-input"
                  placeholder="Type your message here.."
                />
                <div className="icon-container">
                  <FontAwesomeIcon icon={faPaperPlane} className="icon" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>
            <p>Please click on any peoples to chat!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
