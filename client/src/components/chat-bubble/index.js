import React from "react";
import "./chat-bubble.css";
const ChatBubble = (props) => {
  const { text, timestamp } = props.m;
  // const className = senderID === "me" ? "chat-bubble me" : "chat-bubble";
  console.log(text);
  return <div className={"chat-bubble"}>{text}</div>;
};

export default ChatBubble;
