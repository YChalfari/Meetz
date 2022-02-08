import "./App.css";
import socketio from "socket.io-client";
import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Map from "./components/map";
import Room from "./pages/room";
import VideoPlayer from "./components/video-player";
import Landing from "./pages/landing";
import Initialize from "./pages/initialize";
export const socket = socketio.connect("127.0.0.1:3001");

export const UserContext = createContext();
function App() {
  const [user, setUser] = useState({});
  const [players, setPlayers] = useState([]);
  return (
    <div className="App">
      <UserContext.Provider
        value={{ user, setUser, players, setPlayers, socket }}
      >
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
