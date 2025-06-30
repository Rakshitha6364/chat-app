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
    const trimmed = inputName.trim();
    if (trimmed.length >= 2) {
      setUsername(trimmed);
    } else {
      alert("Please enter at least 2 characters for your name.");
    }
  };

  // ✅ Listen for messages
  useEffect(() => {
    socket.on("message", (msg) => {
      console.log("Received:", msg);
      setChat((prevChat) => [...prevChat, msg]);
    });

    return () => socket.off("message");
  }, []);

  // ✅ Send message
  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      socket.emit("message", { user: username, text: message });
      setMessage(""); // Clear input
    }
  };

  // ✅ If no username, show Join page
  if (!username) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Join Chat</h2>
        <form onSubmit={handleJoin}>
          <input
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            placeholder="Enter your name"
            style={{ padding: 8, marginRight: 8 }}
          />
          <button type="submit">Join</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Welcome, {username}!</h2>
      <div
        style={{
          border: "1px solid gray",
          padding: "10px",
          height: "300px",
          overflowY: "scroll",
          marginBottom: "10px",
        }}
      >
        {chat.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user || msg.sender}:</strong> {msg.text || msg.message}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={{ width: "80%" }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatApp;
