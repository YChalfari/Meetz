import React, { useState, useEffect } from "react";
import "./input.css";
const Input = ({
  type,
  name,
  onChange,
  defaultValue,
  placeholder,
  required,
  label,
}) => {
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    onChange(name, value);
  }, [value]);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className="input-wrap">
      <label htmlFor={name.toLowerCase()}>{label}</label>
      <input
        className="login-input"
        onChange={handleChange}
        type={type}
        minLength={type === "password" ? "6" : ""}
        name={name.toLowerCase()}
        value={value}
        placeholder={placeholder}
        required={required ? true : false}
      />
    </div>
  );
};

export default Input;
