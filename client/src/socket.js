// src/socket.js

import { io } from "socket.io-client";

// ✅ Use your Render backend URL here (NO trailing slash)
const BACKEND_URL = "https://chat-app-2-efnv.onrender.com"; // <-- your Render server

const socket = io(BACKEND_URL, {
  transports: ["websocket"], // helps with CORS and modern deploys
  withCredentials: true
});

export default socket;
