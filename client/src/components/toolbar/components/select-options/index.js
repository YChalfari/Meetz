import React, { useState, useEffect, useRef } from "react";
import "./select-input.css";
const SelectInput = ({ list, handleSelect, text }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(text);
  const listRef = useRef(list);
  useEffect(() => {
    listRef.current = [...list];
    const hasGlobal = listRef.current.find((item) => item.id === "global");
    if (!hasGlobal)
      listRef.current.push({ displayName: "global", id: "global" });
  }, [list]);
  const handleListClick = (e) => {
    let value = e.currentTarget.innerText;
    setSelected(value);
    if (value !== "global") {
      value = list.find((player) => player.displayName === value).sID;
    }
    setIsOpen((isOpen) => !isOpen);
    handleSelect(value);
  };
  const renderOptions = () => {
    return (
      listRef &&
      listRef.current.map((recipient) => (
        <li
          key={recipient.id}
          className="dropdown-item"
          onClick={handleListClick}
        >
          {recipient.displayName}
        </li>
      ))
    );
  };
  return (
    <div className="dropdown-container">
      <div
        className="dropdown-item"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        {selected}
      </div>
      {/* (
          <li className="dropdown-item" onClick={handleListClick}>
            Global
          </li>
      ) */}
      <ul className="dropdown-list">{isOpen && renderOptions()}</ul>
    </div>
  );
};

export default SelectInput;
