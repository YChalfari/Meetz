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
  sendPM,
  emitMovePlayer,
  disconnectSocket,
} from "../../utils/socket.utils";
import VideoPlayer from "../../components/video-player/VideoPlayer";
import { UserContext } from "../../App";
import { movePlayer } from "../../utils/map.utils";
import Map from "../../components/map";
import ToolBar from "../../components/toolbar";

import "./room.css";
// export const RoomContext = createContext();
const Room = () => {
  const { user, players, setPlayers } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [nearbyPlayers, setNearbyPlayers] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState();
  const [privateMessage, setPrivateMessage] = useState();
  const playersRef = useRef(players);
  const playerRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    playersRef.current = players;
  }, [players]);
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
      let nb = movePlayer(e, playerRef.current, playersRef.current);
      emitMovePlayer(playerRef.current);
      setNearbyPlayers(nb);
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
      <VideoPlayer nearbyPlayers={nearbyPlayers} />
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
