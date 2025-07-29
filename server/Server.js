
require("dotenv").config();
// const apiKey = process.env.b15a868129a456f072d01708de240082;
const apiKey = process.env.WEATHER_API_KEY;

// const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

const Message = require("./models/Message");

const app = express();
app.use(cors());

// ✅ MongoDB connection
mongoose
  // .connect("mongodb://127.0.0.1:27017/chat-app")
  mongoose.connect(process.env.MONGO_URI)

  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: [
  "https://chat-2fl6ibc3q-rakshuck-8476s-projects.vercel.app",
  "http://localhost:3000" // keep this for local dev too
],

    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  },
});
function extractCityFromText(text) {
  const match = text.match(/(?:in|at|of)?\s*([a-zA-Z\s]+)$/i);
  if (match && match[1]) {
    return match[1].trim();
  }
  return null;
}

// ✅ Make this function async
async function generateReply(userText) 
 {
  const text = userText.toLowerCase().trim();

  if (["hi", "hello", "hey"].includes(text)) {
    return "Hello! 👋 How can I help you today?";
  } else if (text === "how are you") {
    return "I'm doing great! Thanks for asking 😊";
  } else if (text === "bye") {
    return "Goodbye! Have a nice day! 👋";
  } else if (text.includes("help")) {
    return "Sure! You can ask me about our features, pricing, or just say hi!";
  } else if (text.includes("your name")) {
    return "I'm ChatBot 🤖 — your virtual assistant!";
  } else if (text.includes("what can you do")) {
    return "I can chat with you, help you learn, or even guide you in projects!";
  } else if (text.includes("who created you")) {
    return "I was created by Rakshitha 👩‍💻 as a cool project!";
  } else if (text.includes("thank")) {
    return "You're welcome! 😊 Let me know if you need anything else.";
  }else if (text.includes("Test")){
    return "This is a test condition";
  }else if (text.includes("what is your purpose")) {
    return "I'm here to assist you with your queries and make your day better!";
  } else if (text.includes("tell me a fact")) {
    return "Did you know? The first computer programmer was Ada Lovelace.";
  } else if (text.includes("tell me a quote")) {
    return "‘The only way to do great work is to love what you do.’ – Steve Jobs";
  } else if (text.includes("tell me a riddle")) {
    return "What has keys but can't open locks? A piano! 🎹";
  } else if (text.includes("tell me a trivia")) {
    return "Trivia: Honey never spoils. 3000-year-old honey is still edible!";
  } else if (text.includes("tell me a fun fact")) {
    return "Bananas are berries, but strawberries aren’t! 🍌🍓";
  } else if (text.includes("tell me a tongue twister")) {
    return "She sells seashells by the seashore 🌊. Try saying that fast!";
  } 
  else if (text.includes("tell me a joke")) {
    return "Why did the scarecrow win an award? Because he was outstanding in his field! 😂";
  } else if (text.includes("tell me a story")) {
    return "Once upon a time, in a land far away, there lived a brave knight who fought dragons and saved kingdoms. 🏰🐉";
  } else if (text.includes("tell me a poem")) {
    return "Roses are red, violets are blue, I’m just a chatbot, but I’m here for you! 🌹";
  } else if (text.includes("tell me a song")) {
    return "🎶 'Imagine' by John Lennon is a timeless classic!";
  } else if (text.includes("tell me a movie")) {
    return "Have you seen 'Inception'? It's mind-bending! 🎬";
  } else if (text.includes("tell me a book")) {
    return "‘To Kill a Mockingbird’ is a must-read classic! 📚";
  } else if (text.includes("tell me about yourself")) {
    return "I’m ChatBot 🤖, created to assist and entertain you!";
  } else if (text.includes("what is your favorite color")) {
    return "I love all colors equally! 🌈";
  } else if (text.includes("what is your favorite food")) {
    return "I don’t eat, but I hear pizza is amazing! 🍕";
  }else if (text.includes("who are you")) {
  return "I’m Rakshitha, a frontend developer passionate about React.js and building real-time apps.";
}

else if (text.includes("tell me about your background")) {
  return "I have experience building web apps using React, Node.js, and MongoDB, and completed a Python internship.";
}

else if (text.includes("what technologies do you know")) {
  return "I work with React.js, JavaScript (ES6+), HTML, CSS, Tailwind, Node.js, Express, MongoDB, and Git.";
}

else if (text.includes("what projects have you worked on")) {
  return "I’ve built a real-time chat app, a plant disease prediction system, portfolio websites, and more.";
}

else if (text.includes("tell me about your chat app")) {
  return "It’s a full-stack real-time app using React, Node.js, Socket.IO, MongoDB, and includes chatbot + weather features.";
}

else if (text.includes("what is your github")) {
  return "Here’s my GitHub: https://github.com/rakshitha6364";
}

else if (text.includes("how can I contact you")) {
  return "Use the contact form in this portfolio or email me at rakshitha@example.com.";
}

else if (text.includes("do you use tailwind")) {
  return "Yes! I love using Tailwind CSS for fast and responsive UI design.";
}

else if (text.includes("are you available for jobs")) {
  return "Yes, I'm open to frontend roles and freelance opportunities. Let’s connect!";
}

else if (text.includes("what is your favorite food")) {
  return "I don’t eat, but I hear pizza is amazing! 🍕";
}

else if (text.includes("what is your strongest skill")) {
  return "React.js is my strongest skill, especially building dynamic UIs with hooks and reusable components.";
}

else if (text.includes("what is your leaf disease project")) {
  return "It’s a machine learning project that detects plant leaf diseases and recommends suitable pesticides.";
}

else if (text.includes("do you know manual testing")) {
  return "Yes, I’ve studied manual testing concepts like test cases, bug lifecycle, and functional testing.";
}

else if (text.includes("what database do you use")) {
  return "I primarily use MongoDB for real-time apps, but I also know SQL for structured data projects.";
}

else if (text.includes("how do you host your projects")) {
  return "I use Vercel for frontend deployment and Render for backend APIs with MongoDB Atlas for the database.";
}

else if (text.includes("do you know restful api")) {
  return "Yes, I’ve built RESTful APIs using Express.js for features like chat, weather, and user authentication.";
}

else if (text.includes("tell me about your portfolio")) {
  return "My portfolio is built using React, Tailwind CSS, and Vite. It features all my projects and contact info.";
}

else if (text.includes("do you know framer motion")) {
  return "Yes, I use Framer Motion for smooth scroll animations and UI transitions in React apps.";
}

else if (text.includes("what is vite")) {
  return "Vite is a fast frontend build tool I use to create optimized React projects with great performance.";
}

else if (text.includes("how do you style your projects")) {
  return "I use Tailwind CSS, plain CSS, and sometimes SCSS depending on project needs. Tailwind is my favorite.";
}

else if (text.includes("what editor do you use")) {
  return "I use Visual Studio Code (VS Code) with helpful extensions for React, Tailwind, and Git integration.";
} else if (text.includes("what is your favorite animal")) {
    return "Cats are adorable! 🐱";
  } else if (text.includes("what is your favorite hobby")) {
    return "I love chatting with you! 💬";
  } else if (text.includes("what is your favorite sport")) {
    return "I enjoy watching soccer! ⚽️";
  } else if (text.includes("what is your favorite music genre")) {
    return "I like all kinds of music! 🎵";
  } else if (text.includes("what is your favorite movie genre")) {
    return "I enjoy action movies! 🎥";
  } else if (text.includes("what is your favorite book genre")) {
    return "I love fantasy books! 📖";
      }
else if(text.incldes("tell me one joke ")){
return "The Road to React" by Robin Wieruch",
  "Learning React" by Alex Banks & Eve Porcello",
  "React Design Patterns and Best Practices" by Michele Bertoli";
  } else if (text.includes("what is your favorite game")) {
    return "Chess is a great game of strategy!";
  }else if (text.includes("time")) {
  const now = new Date();
  const istTime = now.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
  return `🕒 Current time (IST) is: ${istTime}`;

  } else if (text.includes("date")) {
    const now = new Date();
    return `📅 Today's date is: ${now.toDateString()}`;
  } if (text.includes("weather")) {
    try {
      const match = text.match(/weather (in|at|of)?\s*(.+)/);
      const city = match && match[2] ? match[2] : "Bangalore";

      // const apiKey = "b15a868129a456f072d01708de240082"; // 🔑 Your OpenWeather API key
      const apiKey = process.env.WEATHER_API_KEY;

      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      const weather = res.data.weather[0].description;
      const temp = res.data.main.temp;
      return `🌤 The weather in ${city} is ${weather} with temperature ${temp}°C.`;
    } catch (err) {
      return "❌ Could not fetch weather. Make sure the city name is valid.";
    }
  }
  return `You said: "${userText}"`;
}

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("message", async (data) => {
    console.log("Received message:", data);

    // Save user's message
    const userMessage = await Message.create({
      user: data.user,
      text: data.text,
    });

    io.emit("message", userMessage);

    // ✅ Wait for the bot reply
    const replyText = await generateReply(data.text);

    const botMessage = await Message.create({
      user: "Bot",
      text: replyText,
    });

    io.emit("message", botMessage);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
app.get("/", (req, res) => {
  res.send("🚀 Chat App Backend is running");
});


// server.listen(5000, () => {
//   console.log("🚀 Server running on http://localhost:5000");
// });

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
