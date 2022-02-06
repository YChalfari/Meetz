import React from "react";
import "./slider.css";
const Slider = ({ counter, selectedChar }) => {
  return (
    <div className="selected-char">
      <span
        className="slider-btn"
        onClick={() => counter({ type: "decrement" })}
      >
        <i className="fas fa-chevron-circle-left fa-3x"></i>
      </span>
      <img src={selectedChar} alt="selected character" />
      <span
        className="slider-btn"
        onClick={() => counter({ type: "increment" })}
      >
        <i className="fas fa-chevron-circle-right fa-3x"></i>
      </span>
    </div>
  );
};

export default Slider;
