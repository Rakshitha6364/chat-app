import React, { useState, useEffect } from "react";
import socket from "../socket";

function ChatPage({ username }) {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => socket.off("message");
  }, []);

  const handleSend = () => {
  if (newMsg.trim()) {
    socket.emit("message", { user: username, text: newMsg });
    setNewMsg("");
  }
};
  return (
    <div style={{ padding: 20 }}>
      <h2>Welcome, {username}</h2>
      {/* --- Place the code here --- */}
      <div style={{ height: 300, overflowY: "auto", border: "1px solid #ccc", padding: 10 }}>
        {messages.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.user}</strong>: {msg.text}
          </div>
        ))}
      </div>
      {/* --- End of message list --- */}
      <input
        value={newMsg}
        onChange={(e) => setNewMsg(e.target.value)}
        placeholder="Type your message..."
        onKeyDown={e => e.key === "Enter" && handleSend()}
        style={{ width: "80%", marginRight: 10 }}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default ChatPage;