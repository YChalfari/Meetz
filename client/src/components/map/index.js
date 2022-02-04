import React, { useState, useEffect } from "react";
import { matrixGenerator, movePlayer } from "../../utils/map.utils";
import Tile from "../tile";
import "./map.css";
import Player from "../player";
const Map = () => {
  // const players = [{ id:'fadsfd',x: 1, y: 1 ,isFacingForward:true}]
  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 ,isFacingForward:true});

  // const [isFacingForward,setIsFacingForward] = useState(true)

  const world = [];

  useEffect(() => {
    const movePlayerFunc = (e) => {
       movePlayer(e, setPlayerPosition)
       }
    window.addEventListener("keydown",movePlayerFunc)
    // console.log(isFacingForward));
    return () => {
      window.removeEventListener("keydown",movePlayerFunc)
    }
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
  return <div className="game-board">{renderMap()} <Player position={""} isFacingForward={playerPosition.isFacingForward}/></div>;
};

export default Map;
