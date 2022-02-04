import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./landing.css";
import Form from "../../components/Form";
const LandingPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (form) => {};
  const toggleRegister = () => {
    setIsRegister((prev) => !prev);
  };
  return (
    <div className="landing-page">
      <div className="landing-page__content"></div>
      <div className="landing-page__form">
        {!isRegister ? (
          <Form
            link={
              <p className="form-toggle" onClick={toggleRegister}>
                Don't have an account? Register now!
              </p>
            }
            text="Sign-in"
            inputs={[
              {
                name: "Email",
                defaultValue: "",
                type: "email",
                required: true,
                placeholder: "Enter your email",
              },
              {
                name: "Password",
                defaultValue: "",
                type: "password",
                required: true,
                placeholder: "Enter your password",
              },
            ]}
          />
        ) : (
          <Form
            link={
              <p className="form-toggle" onClick={toggleRegister}>
                Already have an account? Sign-in and Meetz
              </p>
            }
            text="Register"
            inputs={[
              {
                name: "Name",
                defaultValue: "",
                type: "text",
                required: true,
                placeholder: "Enter your name",
              },
              {
                name: "Email",
                defaultValue: "",
                type: "email",
                required: true,
                placeholder: "Enter your email",
              },
              {
                name: "Password",
                defaultValue: "",
                type: "password",
                required: true,
                placeholder: "Enter your password",
              },
              {
                name: "Display Name",
                defaultValue: "",
                type: "text",
                required: true,
                placeholder: "Choose a display name",
              },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default LandingPage;