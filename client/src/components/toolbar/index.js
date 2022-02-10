import React, { useState, useContext } from "react";
import GlobalChat from "./components/global-chat";
import { RoomContext } from "../../pages/room";
import "./toolbar.css";
const Toolbar = ({ playerRef, sendMessage, messages }) => {
  const [userInput, setUserInput] = useState("");
  // const { sendMessage, messages, setMessages } = useContext(RoomContext);

  return (
    <div className="toolbar">
      <GlobalChat messages={messages} />
      <input
        onChange={(e) => setUserInput(e.target.value)}
        type="text"
        value={userInput}
      />
      <button onClick={() => sendMessage(playerRef, userInput)}>Send</button>
    </div>
  );
};

export default Toolbar;
