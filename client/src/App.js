import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Map from "./components/map";
import VideoPlayer from "./components/video-player";
import Landing from "./pages/landing";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/room" element={<Map />} />
        {/* <VideoPlayer/>
      <Map />
      <Landing /> */}
      </Routes>
    </div>
  );
}

export default App;
