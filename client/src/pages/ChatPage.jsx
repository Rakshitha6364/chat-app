import React, { useState, useEffect } from "react";
import socket from "../socket";
import "./ChatPage.css"; // Make sure CSS is imported

function ChatPage({ username }) {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => socket.off("message");
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMsg.trim()) {
      socket.emit("message", { user: username, text: newMsg });
      setNewMsg("");
    }
  };

  return (
    <div className="chat-container">
      <h2>Welcome, {username}</h2>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong className={msg.user === "Bot" ? "bot" : ""}>
              {msg.user}:
            </strong>{" "}
            {msg.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatPage;
