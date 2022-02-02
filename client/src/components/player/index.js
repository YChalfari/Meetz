import React, { useState } from "react";
import wraith from "../../images/characters/wraith/Wraith_resized.png";
import "./player.css";
const Player = () => {
  const [selectedChar, setSelectedChar] = useState("wraith");
  return (
    <div className="player">
      <img src={wraith} alt="character" />
    </div>
  );
};

export default Player;
