import React, { useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
import Input from "../Input";
import "./form.css";

const Form = ({ inputs, type, text, handleSubmit, link, error }) => {
  const [form, setForm] = useState({});
  // let navigate = useNavigate();
  const onChange = (name, value) => {
    const formCopy = { ...form };
    formCopy[name] = value;
    setForm(formCopy);
  };
  const onSubmit = () => {
    handleSubmit(form);
    // return navigate("/freestyle");
  };
  const renderInputs = () => {
    return inputs.map((input) => (
      <Input
        key={input.name}
        dbkey={input.dbkey}
        type={input.type}
        name={input.name}
        defaultValue={input.defaultValue}
        onChange={onChange}
        required={input.required}
        placeholder={input.placeholder}
      />
    ));
  };

  return (
    <div className="form">
      <h2>{text}</h2>
      {renderInputs()}
      {/* <Input type="text" name={"Username"} onChange={onChange} />
      <Input type="password" name={"Password"} onChange={onChange} /> */}
      <button className="btn" type="submit" onClick={onSubmit}>
        Submit
      </button>
      {link && link}
      {error && <h4 className="error-message">{error}</h4>}
    </div>
  );
};

export default Form;
