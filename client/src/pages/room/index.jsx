import React, { useState, useRef, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initSocketListeners } from "../../utils/socket.utils";
import { UserContext } from "../../App";
import { movePlayer } from "../../utils/map.utils";
import Map from "../../components/map";
const Room = () => {
  const { user, socket, players, setPlayers } = useContext(UserContext);
  const playerRef = useRef();
  const location = useLocation();
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    const initUser = {
      ...location.state,
      id: user.token,
      position: { x: 16, y: 5 },
      isFacingForward: true,
    };
    playerRef.current = initUser;
    initSocketListeners(playerRef.current, setPlayers);
    const movePlayerFunc = (e) => {
      movePlayer(e, playerRef.current);
      socket.emit("movePlayer", playerRef.current);
    };
    window.addEventListener("keydown", movePlayerFunc);

    return () => {
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
