import React from "react";

import "./map.css";
import Jukebox from "./components/jukebox";
import Player from "../player";
import office from "../../images/maps/office/office.png";

const Map = ({ players }) => {
  const renderPlayers = () => {
    if (players.length > 0)
      return players.map((player) => (
        <Player
          key={player.id}
          player={player}
          position={player.position}
          isFacingForward={player.isFacingForward}
        />
      ));
  };

  return (
    <div
      className="game-board"
      style={{
        background: `url(${office}) center center / cover no-repeat`,
      }}
    >
      <Jukebox />
      {players && renderPlayers()}
      {/* <Player position={{ x: 5, y: 5 }} /> */}
    </div>
  );
};

export default Map;
