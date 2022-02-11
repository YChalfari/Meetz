import React, { useContext } from "react";
import MessageContext from "../../../../pages/room";
import ChatBubble from "../../../chat-bubble";
import "./global-chat.css";
const GlobalChat = ({ messages, playerRef }) => {
  // const { messages } = useContext(MessageContext);

  const renderChatBubbles = () => {
    if (messages) {
      return messages.map((m, i) => (
        <ChatBubble key={i} m={m} id={playerRef.current.id} />
      ));
    }
  };
  return <div className="global-chat">{renderChatBubbles()}</div>;
};

export default GlobalChat;
