import React, { useEffect, useState } from "react";
import io from "socket.io-client";

// ✅ Use your Render backend URL — NOT localhost!
const socket = io("https://chat-app-2-efw.onrender.com");

const ChatApp = () => {
  const [username, setUsername] = useState("");
  const [inputName, setInputName] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  // ✅ Join page to get username
  const handleJoin = (e) => {
    e.preventDefault();
    const trimmed = inputNam
