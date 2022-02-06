import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { matrixGenerator, movePlayer } from "../../utils/map.utils";
import { UserContext } from "../../App";
import Tile from "../tile";
import "./map.css";
import Player from "../player";

const socket = io.connect("127.0.0.1:3001");
const Map = () => {
  const { user, setUser, players, setPlayers } = useContext(UserContext);
  const playerss = [];
  const [playerPosition, setPlayerPosition] = useState({
    x: 1,
    y: 1,
    isFacingForward: true,
  });

  // const [isFacingForward,setIsFacingForward] = useState(true)

  const world = [];

  const defaultPlayer = (user, position) => {
    const newUser = { ...user };
    newUser.position = position;
    newUser.isFacingForward = true;
    newUser.sID = socket.id;
    setUser(newUser);
    playerss.push(newUser);
    // setPlayers((prev) => prev.concat(newUser));
  };

  useEffect(() => {
    socket.on("connect", () => {
      defaultPlayer(user, { x: 1, y: 1 });
    });
    socket.emit("join", {
      position: playerPosition.x,
      displayName: "David",
      id: socket.id,
      isFacingForward: playerPosition.isFacingForward,
    });
    socket.on("join", ({ position, displayName, isFacingForward, id }) => {
      console.log(position);
    });
    socket.on("movePlayer", ({ id, position }) => {
      //this is logging 22 times on each movement
      console.log(id, position);
    });
    const movePlayerFunc = (e) => {
      movePlayer(e, setPlayerPosition);
      socket.emit("movePlayer", { id: socket.id, position: playerPosition.x });
    };
    window.addEventListener("keydown", movePlayerFunc);
    // console.log(isFacingForward));
    return () => {
      window.removeEventListener("keydown", movePlayerFunc);
    };
  }, []);
  console.log(user, players);

  matrixGenerator(world, 20, 20, "d");

  const renderMap = () => {
    return world.map((row, i) =>
      row.map((col, j) => {
        return i === playerPosition.x && j === playerPosition.y ? (
          <Tile
            className="tile"
            player={true}
            isFacingForward={playerPosition.isFacingForward}
          />
        ) : (
          <Tile className="tile" player={false} />
        );
      })
    );
  };
  // console.log(playerPosition.isFacingForward);
  const renderPlayers = () => {
    return playerss.map((player) => (
      <Player
        position={player.position}
        isFacingForward={player.isFacingForward}
      />
    ));
  };
  // {renderPlayers()}
  //
  return <div className="game-board">{renderMap()}</div>;
};

export default Map;
