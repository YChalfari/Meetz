// import React, { useState, useEffect, useRef } from "react";
// import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
// import TextField from "@material-ui/core/TextField";
// import AssignmentIcon from "@material-ui/icons/Assignment";
// import PhoneIcon from "@material-ui/icons/Phone";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import Peer from "simple-peer";
// import io from "socket.io-client";
// import "./videoplayer.css";

// const socket = io.connect("127.0.0.1:3001")

// const VideoPlayer = () => {
//   const [me, setMe] = useState();
//   const [stream, setStream] = useState();
//   const [receivingCall, setReceivingCall] = useState(false);
//   const [caller, setCaller] = useState();
//   const [callerSignal, setCallerSignal] = useState();
//   const [callAccepted, setCallAccepted] = useState(false);
//   const [idToCall, setIdToCall] = useState("");
//   const [callEnded, setCallEnded] = useState(false);
//   const [name, setName] = useState("");

//   const myVideo = useRef();
//   const userVideo = useRef();
//   const connectionRef = useRef();

//   useEffect(() => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         setStream(stream);
//         myVideo.current.srcObject = stream;
//       });
//     //pass socket id
//     socket.on("me", (id) => {
//       setMe(id);
//       console.log(id);
//     });

//     socket.on("callUser", (data) => {
//       setReceivingCall(true);
//       setCaller(data.from);
//       setName(data.name);
//       setCallerSignal(data.signal);
//     });
//   }, []);
//   //create a new peer
//   const callUser = (id) => {
//     const peer = new Peer({
//       initiator: true,
//       trickle: false,
//       stream: stream,
//     });
//     peer.on("signal", (data) => {
//       socket.emit("callUser", {
//         userToCall: id,
//         signalData: data,
//         from: me,
//         name: name,
//       });
//     });

//     peer.on("stream", (stream) => {
//       userVideo.current.srcObject = stream;
//     });

//     socket.on("callAccepted", (signal) => {
//       setCallAccepted(true);
//       peer.signal(signal);
//     });

//     connectionRef.current = peer;
//   };

//   const answerCall = () => {
//     setCallAccepted(true);
//     const peer = new Peer({
//       initiator: false,
//       trickle: false,
//       stream: stream,
//     });

//     peer.on("signal", (data) => {
//       socket.emit("answerCall", { signal: data, to: caller });
//     });
//     peer.on("stream", (stream) => {
//       userVideo.current.srcObject = stream;
//     });

//     peer.signal(callerSignal);
//     connectionRef.current = peer;
//   };
//   const leaveCall = () => {
//     setCallEnded(true);
//     connectionRef.current.destroy();
//   };

//   return (
//     <>
//       <div className="video-container">
//         <div className="video">
//           {stream && (
//             <video
//               playsInline
//               muted
//               ref={myVideo}
//               autoPlay
//               style={{ width: "300px", height: "200px" }}
//             />
//           )}
//         </div>
//         <div className="video">
//           {callAccepted && !callEnded ? (
//             <video
//               playsInline
//               ref={userVideo}
//               autoPlay
//               style={{ width: "300px", height: "200px" }}
//             />
//           ) : null}
//         </div>
//       </div>
//       <div className="myId">
//         <TextField
//           id="filled-basic"
//           label="Name"
//           variant="filled"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           style={{ marginBottom: "10px" }}
//         />
//         <CopyToClipboard text={me} style={{ marginBottom: "10px" }}>
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<AssignmentIcon fontSize="large" />}
//           >
//             Copy ID
//           </Button>
//         </CopyToClipboard>
//         <TextField
//           id="filled-basic"
//           label="ID to call"
//           variant="filled"
//           value={idToCall}
//           onChange={(e) => setIdToCall(e.target.value)}
//         />
//         <div className="call-button">
//           {callAccepted && !callEnded ? (
//             <Button variant="contained" color="secondary" onClick={leaveCall}>
//               End Call
//             </Button>
//           ) : (
//             <IconButton
//               color="primary"
//               aria-label="call"
//               onClick={() => callUser(idToCall)}
//             >
//               <PhoneIcon fontSize="large" />
//             </IconButton>
//           )}
//           {idToCall}
//         </div>
//       </div>
//       <div>
//         {receivingCall && !callAccepted ? (
//           <div className="caller">
//             <h1> {name} is calling ...</h1>
//             <Button variant="contained" color="primary" onClick={answerCall}>
//               Answer
//             </Button>
//           </div>
//         ) : null}
//       </div>
//     </>
//   );
// };

// export default VideoPlayer;
