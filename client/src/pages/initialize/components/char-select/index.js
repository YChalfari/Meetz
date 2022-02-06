import React, { useState, useReducer, useEffect, useCallback } from "react";
import Slider from "../slider";
// import Slider from "react-slick";
import { characters } from "../../../../utils/character.utils";
import "./char-select.css";

const initialState = { counter: 0 };

const reducer = (state, action) => {
  let newState;
  switch (action.type) {
    case "increment":
      if (state.counter === Object.keys(characters).length - 1) {
        newState = { counter: 0 };
      } else {
        newState = { counter: state.counter + 1 };
      }
      break;
    case "decrement":
      if (state.counter === 0) {
        newState = { counter: Object.keys(characters).length - 1 };
      } else {
        newState = { counter: state.counter - 1 };
      }
      break;
    default:
      console.log(Object.keys(characters).length - 1, state);
  }
  return newState;
};

const CharSelect = ({ setSelectedChar, selectedChar }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const chars = Object.entries(characters);
  const prevChar = () => {
    setSelectedChar(chars[state.counter][1].idle);
  };
  const setChar = useCallback(() => {
    prevChar();
  });
  useEffect(() => {
    setChar();
  }, [state.counter]);
  return (
    <div className="char-select">
      <h2 className="init-title player2-font">Select a Character</h2>
      <Slider counter={dispatch} selectedChar={selectedChar} />
      {/* <Slider {...settings}>{renderChars()}</Slider> */}
    </div>
  );
};

export default CharSelect;
