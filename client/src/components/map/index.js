import React, { useState, useEffect, useContext, useRef } from "react";
import io from "socket.io-client";
import { matrixGenerator, movePlayer } from "../../utils/map.utils";
import { UserContext } from "../../App";
import Tile from "../tile";
import "./map.css";
import Player from "../player";
import { maps } from "../../utils/map.utils";
import office from "../../images/maps/office/office.png";
const socket = io.connect("127.0.0.1:3001");
const Map = () => {
  const me = useRef({});
  const { user, setUser, players, setPlayers } = useContext(UserContext);
  const [playerPosition, setPlayerPosition] = useState({
    x: 1,
    y: 1,
    isFacingForward: true,
  });

  const world = [];

  const defaultPlayer = () => {
    console.log(user);
    me.current.position = { x: 4, y: 3 };
    me.current.isFacingForward = true;
    me.current.id = socket.id;
    me.current.username = user.user.displayName;
  };

  useEffect(() => {
    socket.on("connect", () => {
      defaultPlayer();
      console.log("connected");
    });
    setTimeout(() => {
      socket.emit("join", me.current);
      console.log(me);
    }, 5000);

    socket.on("join", (users) => {
      console.log(users);
      if (users) setPlayers(users.users);
    });
    socket.on("movePlayer", (users) => {
      setPlayers(users.users);
    });
    const movePlayerFunc = (e) => {
      movePlayer(e, me.current);
      socket.emit("movePlayer", me.current);
    };
    window.addEventListener("keydown", movePlayerFunc);

    return () => {
      window.removeEventListener("keydown", movePlayerFunc);
    };
  }, []);

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

  const renderPlayers = () => {
    return players.map((player) => (
      <Player
        key={socket.id}
        position={player.position}
        isFacingForward={player.isFacingForward}
      />
    ));
  };
  // {renderPlayers()}
  //{renderMap()}

  return (
    <div
      className="game-board"
      style={{
        background: `url(${office}) center center / cover no-repeat`,
      }}
    >
      {renderPlayers()}
      {/* <Player position={{ x: 5, y: 5 }} /> */}
    </div>
  );
};

export default Map;
