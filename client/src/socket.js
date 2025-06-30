const io = socketIo(server, {
  cors: {
    origin: [
      "https://chat-2fl6ibc3q-rakshuck-8476s-projects.vercel.app",
      "http://localhost:3000"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});
