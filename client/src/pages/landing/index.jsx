import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import usersAPI from "../../apis/usersAPI";
import { validateRegister } from "../../utils/validateForm";
import "./landing.css";
import Logo from "../../images/Logo.png";
import BG from "../../images/landing-bg-kishkush.png";
import BG2 from "../../images/landing-bg.png";

import Form from "../../components/Form";
const LandingPage = () => {
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const { user, setUser, setIsLoading } = useContext(UserContext);
  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      console.log("initialize navigate");
      navigate("/initialize");
    }
  });
  const handleRegister = async (form) => {
    setError("");
    try {
      setIsLoading(true);
      validateRegister(form);
      const { data } = await usersAPI.post("/users", form);
      setUser(data);
      window.localStorage.setItem("token", data.token);
      setIsLoading(false);
      navigate("/initialize");
    } catch (e) {
      setIsLoading(false);
      setError(e.response.message);
    }
  };
  const handleLogin = async (form) => {
    try {
      setIsLoading(true);
      const { data } = await usersAPI.post("/users/login", form);
      setUser(data);
      window.localStorage.setItem("token", data.token);
      setIsLoading(false);
      navigate("/initialize");
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      setError(e.response.message);
    }
  };
  const toggleRegister = () => {
    setIsRegister((prev) => !prev);
  };
  return (
    <div className="landing-page" style={{ backgroundImage: `url(${BG2})` }}>
      <div className="landing-page__content">
        <div className="content-head">
          <img src={Logo} alt="" />
          <h2 className="landing-title meetz">MeeTz</h2>
        </div>
        <div className="content-body">
          <p className="c-body__phrase">It's kinda like zoom...</p>
          <p className="c-body__end">only better</p>
        </div>
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
                label: "Email",
                name: "email",
                defaultValue: "",
                type: "email",
                required: true,
                placeholder: "Enter your email",
              },
              {
                label: "Password",
                name: "password",
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
                label: "Name",
                name: "name",
                defaultValue: "",
                type: "text",
                required: true,
                placeholder: "Enter your name",
              },
              {
                label: "Email",
                name: "email",
                defaultValue: "",
                type: "email",
                required: true,
                placeholder: "Enter your email",
              },
              {
                label: "Password",
                name: "password",
                defaultValue: "",
                type: "password",
                required: true,
                placeholder: "Enter your password",
              },
              {
                label: "Display Name",
                name: "displayName",
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
