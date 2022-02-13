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

const keys = ["a", "w", "s", "d"];
// export const RoomContext = createContext();
const Room = () => {
  const { user, players, setPlayers } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [nearbyPlayers, setNearbyPlayers] = useState([]);
  const [recipient, setRecipient] = useState("global");
  const [caller, setCaller] = useState();
  const [isReceiving, setIsReceiving] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
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
    initSocketListeners(
      playerRef.current,
      setPlayers,
      setMessages,
      setIsInCall,
      setCaller,
      setIsReceiving,
      setNearbyPlayers
    );

    const movePlayerFunc = (e) => {
      if (keys.includes(e.key)) {
        let nb = movePlayer(e, playerRef.current, playersRef.current);
        emitMovePlayer(playerRef.current);
        setNearbyPlayers(nb);
      }
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
      <VideoPlayer
        nearbyPlayers={nearbyPlayers}
        setIsInCall={setIsInCall}
        isInCall={isInCall}
      />
      <Map players={players} />
      <ToolBar
        recipient={recipient}
        setRecipient={setRecipient}
        playerRef={playerRef}
        sendMessage={sendMessage}
        messages={messages}
        players={players}
      />
      {/* </RoomContext.Provider> */}
    </div>
  );
};

export default Room;
