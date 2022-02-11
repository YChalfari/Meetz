import React from "react";
import moment from "moment";
import "./chat-bubble.css";
const ChatBubble = (props) => {
  const { text, createdAt, senderID, username } = props.m;
  const { id } = props;
  const className = senderID === id ? "chat-bubble me" : "chat-bubble";
  return (
    <div className="message-container">
      <p className="sender">
        {username}
        <span className="timestamp">{moment(createdAt).format("h:mm a")}</span>
      </p>
      <div className={className}>{text}</div>
    </div>
  );
};

export default ChatBubble;
