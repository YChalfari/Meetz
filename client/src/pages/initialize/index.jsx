import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
import CharSelect from "./components/char-select";
const Initialize = () => {
  const [selectedChar, setSelectedChar] = useState(null);
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="initialize-page">
      <CharSelect
        setSelectedChar={setSelectedChar}
        selectedChar={selectedChar}
      />
    </div>
  );
};

export default Initialize;
