import React, { useState, useEffect } from "react";
import { matrixGenerator, movePlayer } from "../../utils/map.utils";
import Tile from "../tile";
import "./map.css";
import Player from "../player";
const Map = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });
  const world = [];

  useEffect(() => {
    window.addEventListener("keydown", (e) => movePlayer(e, setPlayerPosition));
  }, []);

  matrixGenerator(world, 20, 20, "d");

  const renderMap = () => {
    return world.map((row, i) =>
      row.map((col, j) => {
        return i === playerPosition.x && j === playerPosition.y ? (
          <Tile className="tile" player={true} />
        ) : (
          <Tile className="tile" player={false} />
        );
      })
    );
  };
  return <div className="game-board">{renderMap()}</div>;
};

export default Map;
