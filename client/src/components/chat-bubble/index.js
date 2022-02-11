import React from "react";
import moment from "moment";
import "./chat-bubble.css";
const ChatBubble = (props) => {
  const { text, createdAt, senderID, username, type } = props.m;
  const { id } = props;
  let className = senderID === id ? "chat-bubble me" : "chat-bubble";
  let pm = type === "private" ? "chat-bubble private" : className;
  return (
    <div className="message-container">
      <p className="sender">
        {username}
        <span className="timestamp">{moment(createdAt).format("h:mm a")}</span>
      </p>
      <div className={pm}>{text}</div>
    </div>
  );
};

export default ChatBubble;
