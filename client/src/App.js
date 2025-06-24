import React, { useState } from "react";
import ChatPage from "./pages/ChatPage";

function App() {
  const [username, setUsername] = useState("");
  const [inputName, setInputName] = useState("");

  const handleJoin = (e) => {
    e.preventDefault();
    const trimmed = inputName.trim();
    if (trimmed.length >= 2) {
      setUsername(trimmed);
    } else {
      alert("Please enter at least 2 characters for your name.");
    }
  };

  if (!username) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Join Chat</h2>
        <form onSubmit={handleJoin}>
          <input
            value={inputName}
            onChange={e => setInputName(e.target.value)}
            placeholder="Enter your name"
            style={{ padding: 8, marginRight: 8 }}
          />
          <button type="submit">Join</button>
        </form>
      </div>
    );
  }

  return <ChatPage username={username} />;
}

export default App;