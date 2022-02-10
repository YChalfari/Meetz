import React from "react";
import "./chat-bubble.css";
const ChatBubble = (props) => {
  const { message, timestamp, senderID } = props.m;
  const className = senderID === "me" ? "chat-bubble me" : "chat-bubble";
  // console.log(message);
  return <div className={className}>{message}</div>;
};

export default ChatBubble;
