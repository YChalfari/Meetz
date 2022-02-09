import React, { useState, useRef, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { initSocketListeners } from "../../utils/socket.utils";
import { UserContext } from "../../App";
import { movePlayer } from "../../utils/map.utils";
import Map from "../../components/map";
import socketio from "socket.io-client";

const Room = () => {
  const { user, players, setPlayers } = useContext(UserContext);
  const playerRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(user);
    if (!user.token) {
      return navigate("/");
    }
    const socket = socketio.connect("127.0.0.1:3001");
    socket.on("connection", () => {
      console.log("connected");
    });
    const initUser = {
      ...location.state,
      id: user.token,
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
    <div className="room">
      <Map players={players} />
    </div>
  );
};

export default Room;
