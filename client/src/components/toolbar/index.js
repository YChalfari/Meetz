import React, { useState, useContext } from "react";
import GlobalChat from "./components/global-chat";
import SelectInput from "./components/select-options";
import { RoomContext } from "../../pages/room";
import "./toolbar.css";
const Toolbar = ({
  playerRef,
  sendMessage,
  messages,
  players,
  recipient,
  setRecipient,
}) => {
  const [userInput, setUserInput] = useState("");
  const [isSelecting, setIsSelecting] = useState(false);
  // const { sendMessage, messages, setMessages } = useContext(RoomContext);
  const handleSelect = (value) => {
    setRecipient(value);
  };
  return (
    <div className="toolbar">
      <GlobalChat messages={messages} playerRef={playerRef} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(playerRef.current, recipient, userInput);
          setUserInput("");
        }}
      >
        <div className="message-inputs-container">
          <input
            className="message-input"
            onChange={(e) => setUserInput(e.target.value)}
            type="text"
            value={userInput}
            placeholder="Type a message and press enter"
          />
          <SelectInput
            text="global"
            list={players}
            handleSelect={handleSelect}
          />
        </div>
        {/* <button onClick={() => sendMessage(playerRef.current, userInput)}>
        Send
      </button> */}
      </form>
    </div>
  );
};

export default Toolbar;
