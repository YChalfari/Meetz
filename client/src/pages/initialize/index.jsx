import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import CharSelect from "./components/char-select";

const Initialize = () => {
  const [selectedChar, setSelectedChar] = useState(null);
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user.token && !window.localStorage.getItem("token")) navigate("/");
  });
  const handleSubmit = (val) => {
    console.log(user);
    navigate(`/${val.room}`, { state: { ...val, selectedChar } });
  };
  return (
    <div className="initialize-page">
      <CharSelect
        handleSubmit={handleSubmit}
        setSelectedChar={setSelectedChar}
        selectedChar={selectedChar}
      />
    </div>
  );
};

export default Initialize;
