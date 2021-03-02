import React from "react";

const ChatList = ({profileIcon,user,lastMessage,timer}) => {
  return (
    <div className="chat">
      <div className="avatar">
        <img src={profileIcon} className="profileImg" alt="profile-icon" />
      </div>
      <div className="chat-message">
        <p className="header">{user}</p>
        <p className="last-message">{lastMessage}</p>
      </div>
      <div className="chat-timer">
        <p>{timer}</p>
      </div>
    </div>
  );
};

export default ChatList;
