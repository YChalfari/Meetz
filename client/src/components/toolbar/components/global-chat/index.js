import React, { useContext } from "react";
import MessageContext from "../../../../pages/room";
import ChatBubble from "../../../chat-bubble";
import "./global-chat.css";
const GlobalChat = () => {
  // const { messages } = useContext(MessageContext);
  const m = [
    { message: "Hello", timestamp: "10:30", senderID: "me" },
    { message: "Hello", timestamp: "10:30", senderID: "not me" },
  ];
  const renderChatBubbles = () => {
    return m.map((m, i) => <ChatBubble key={i} m={m} />);
  };
  return <div className="global-chat">{renderChatBubbles()}</div>;
};

export default GlobalChat;
