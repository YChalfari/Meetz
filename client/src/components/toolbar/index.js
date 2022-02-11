import React, { useState, useContext } from "react";
import GlobalChat from "./components/global-chat";
import { RoomContext } from "../../pages/room";
import "./toolbar.css";
const Toolbar = ({ playerRef, sendMessage, messages, sendPM }) => {
  const [userInput, setUserInput] = useState("");
  // const { sendMessage, messages, setMessages } = useContext(RoomContext);

  return (
    <div className="toolbar">
      <GlobalChat messages={messages} playerRef={playerRef} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(playerRef.current, userInput);
          setUserInput("");
        }}
      >
        <input
          className="message-input"
          onChange={(e) => setUserInput(e.target.value)}
          type="text"
          value={userInput}
          placeholder="Type a message and press enter"
        />
        {/* <button onClick={() => sendMessage(playerRef.current, userInput)}>
        Send
      </button> */}
      </form>
    </div>
  );
};

export default Toolbar;
