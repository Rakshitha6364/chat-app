import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // your backend port

const ChatApp = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  // Listen for messages from server
  useEffect(() => {
    socket.on("message", (msg) => {
      setChat((prevChat) => [...prevChat, msg]);
    });

    // Cleanup on unmount
    return () => {
      socket.off("message");
    };
  }, []);

  // Send message to server
  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      socket.emit("message", { message });
      setMessage(""); // Clear input
    }
  };

  return (
    <div>
      <h2>Welcome,</h2>
      <div
        style={{
          border: "1px solid gray",
          padding: "10px",
          height: "300px",
          overflowY: "scroll",
          marginBottom: "10px",
        }}
      >
        {/* ✅ Show Chat Messages Here */}
        {chat.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>

      {/* ✅ Message Input and Send Button */}
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
