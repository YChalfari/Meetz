import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  createContext,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  initSocketListeners,
  sendMessage,
  emitMovePlayer,
  disconnectSocket,
} from "../../utils/socket.utils";
import { UserContext } from "../../App";
import { movePlayer } from "../../utils/map.utils";
import Map from "../../components/map";
import ToolBar from "../../components/toolbar";

import "./room.css";
// export const RoomContext = createContext();
const Room = () => {
  const { user, players, setPlayers } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [proxyMessage, setProxyMessage] = useState();
  const playerRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.token && !localStorage.getItem("token")) {
      return navigate("/");
    }
    const initUser = {
      ...location.state,
      id: user.token || localStorage.getItem("token"),
      position: { x: 16, y: 5 },
      isFacingForward: true,
    };
    playerRef.current = initUser;
    initSocketListeners(playerRef.current, setPlayers, setMessages);

    const movePlayerFunc = (e) => {
      movePlayer(e, playerRef.current);
      emitMovePlayer(playerRef.current);
    };
    window.addEventListener("keydown", movePlayerFunc);

    return () => {
      disconnectSocket();
      window.removeEventListener("keydown", movePlayerFunc);
    };
  }, []);

  return (
    <div className="room">
      {/* <RoomContext.Provider
        value={(sendMessage, messages, setMessages, playerRef)}
      > */}
      <Map players={players} />
      <ToolBar
        playerRef={playerRef}
        sendMessage={sendMessage}
        messages={messages}
      />
      {/* </RoomContext.Provider> */}
    </div>
  );
};

export default Room;
