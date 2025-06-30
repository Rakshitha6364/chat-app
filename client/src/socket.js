import { io } from "socket.io-client";
const socket = io("https://chat-app-2-efnv.onrender.com");

// const socket = io("http://localhost:5000"); // Make sure your backend is running on this port
export default socket;
