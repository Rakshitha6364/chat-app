import { io } from "socket.io-client";
const socket = io("http://localhost:5000"); // Make sure your backend is running on this port
export default socket;