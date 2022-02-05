import "./App.css";
import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Map from "./components/map";
import VideoPlayer from "./components/video-player";
import Landing from "./pages/landing";
export const UserContext = createContext();
function App() {
  const [user, setUser] = useState();
  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/room" element={<Map />} />
          {/* <VideoPlayer/>
      <Map />
    <Landing /> */}
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
