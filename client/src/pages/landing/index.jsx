import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import usersAPI from "../../apis/usersAPI";
import { validateRegister } from "../../utils/validateForm";
import Initialize from "../initialize";
import "./landing.css";
import Form from "../../components/Form";
const LandingPage = () => {
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const handleRegister = async (form) => {
    setError("");
    try {
      validateRegister(form);
      const { data } = await usersAPI.post("/users", form);
      setUser({ data: data });
      navigate("/room");
    } catch (e) {
      setError(e.message);
    }
  };
  const handleLogin = async (form) => {
    try {
      const { data } = await usersAPI.post("/users/login", form);
      setUser({ data: data });
      navigate("/room");
    } catch (e) {
      setError(e.message);
    }
  };
  const toggleRegister = () => {
    setIsRegister((prev) => !prev);
  };
  return (
    <div className="landing-page">
      <div className="landing-page__content">
        <Initialize />
      </div>
      <div className="landing-page__form">
        {!isRegister ? (
          <Form
            error={error}
            handleSubmit={handleLogin}
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
            error={error}
            handleSubmit={handleRegister}
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
