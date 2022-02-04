import React, { useState } from "react";
import { characters } from "../../utils/character.utils.js";
import wraith1 from "../../images/characters/wraith/Wraith_resized.png";
import "./player.css";
const Player = ({ isFacingForward, character }) => {
  const [selectedChar, setSelectedChar] = useState("wraith");
  const { wraith, minotaur } = characters;
  return (
    <div
      className="player"
      style={{ transform: isFacingForward ? "scaleX(1)" : "scaleX(-1)" }}
    >
      <img src={wraith1} alt="character" />
    </div>
  );
};

export default Player;
