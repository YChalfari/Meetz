import React from "react";
import Player from "../player";
import "./tile.css";
const Tile = ({ className, player }) => {
  return <div className={className}>{player && <Player />}</div>;
};

export default Tile;
