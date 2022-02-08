import "./App.css";

import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Map from "./components/map";
import Room from "./pages/room";
import VideoPlayer from "./components/video-player";
import Landing from "./pages/landing";
import Initialize from "./pages/initialize";

export const UserContext = createContext();
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [user, setUser] = useState({});
  const [players, setPlayers] = useState([]);
  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser, players, setPlayers }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/initialize" element={<Initialize />} />
          <Route path="/:room" element={<Room />} />
          {/* <VideoPlayer/>
      <Map />
    <Landing /> */}
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
