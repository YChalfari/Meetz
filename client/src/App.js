import "./App.css";

import React, { useState, useEffect, createContext } from "react";
import {
  useNavigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import usersAPI from "./apis/usersAPI";
import Map from "./components/map";
import Room from "./pages/room";
import VideoPlayer from "./components/video-player";
import Landing from "./pages/landing";
import Loading from "./components/Loading";
import { ThreeDots } from "react-loader-spinner";
import Initialize from "./pages/initialize";

export const UserContext = createContext();
function App() {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // const getUser = async (token) => {
    //   const res = await usersApi.get();
    // };
    if (token) {
      setUser({ token });
      navigate("/initialize");
    }
  }, []);
  return (
    <div className="App">
      <UserContext.Provider
        value={{ user, setUser, players, setPlayers, isLoading, setIsLoading }}
      >
        {isLoading && (
          <Loading
            spinner={
              <ThreeDots
                type="ThreeDots"
                color="#00BFFF"
                height={80}
                width={80}
              />
            }
          />
        )}

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
