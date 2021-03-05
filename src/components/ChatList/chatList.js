import React from "react";
import moment from "moment";

const ChatList = ({
  profileIcon,
  user,
  lastMessage,
  timer,
  onChatListClick,
}) => {
  return (
    <div className="chat" onClick={onChatListClick}>
      <div style={{ display: "flex" }}>
        <div className="avatar">
          <img src={profileIcon} className="profileImg" alt="profile-icon" />
        </div>
        <div className="chat-message">
          <p className="header">{user}</p>
          <p className="last-message">{lastMessage}</p>
        </div>
      </div>

      <div className="chat-timer">
        <p className={[timer.isOnline && "online"]}>
          {timer.isOnline
            ? "online"
            : moment(timer.createdAt.toDate()).fromNow()}
        </p>
      </div>
    </div>
  );
};

export default ChatList;
