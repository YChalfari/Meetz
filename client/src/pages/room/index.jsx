import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  createContext,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { initSocketListeners } from "../../utils/socket.utils";
import { UserContext } from "../../App";
import { movePlayer } from "../../utils/map.utils";
import Map from "../../components/map";
import ToolBar from "../../components/toolbar";
import socketio from "socket.io-client";
import "./room.css";
export const RoomContext = createContext();
const Room = () => {
  const { user, players, setPlayers } = useContext(UserContext);
  const [messages, setMessages] = useState();
  const [proxyMessage, setProxyMessage] = useState();
  const playerRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const socket = socketio.connect("127.0.0.1:3001");
  useEffect(() => {
    if (!user.token && !localStorage.getItem("token")) {
      return navigate("/");
    }
    socket.on("connection", () => {
      console.log("connected");
    });
    const initUser = {
      ...location.state,
      id: user.token || localStorage.getItem("token"),
      position: { x: 16, y: 5 },
      isFacingForward: true,
      sID: socket.id,
    };
    playerRef.current = initUser;
    initSocketListeners(playerRef.current, setPlayers, socket);

    const movePlayerFunc = (e) => {
      movePlayer(e, playerRef.current);
      socket.emit("movePlayer", playerRef.current);
    };
    window.addEventListener("keydown", movePlayerFunc);

    return () => {
      socket.disconnect();
      window.removeEventListener("keydown", movePlayerFunc);
    };
  }, []);
  return (
    <RoomContext.Provider value={(socket, messages, setMessages, playerRef)}>
      <div className="room">
        <Map players={players} />
        <ToolBar />
      </div>
    </RoomContext.Provider>
  );
};

export default Room;
