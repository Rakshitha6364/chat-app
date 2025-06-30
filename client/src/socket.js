const io = socketIo(server, {
  cors: {
    origin: [
      "https://YOUR-VERCEL-FRONTEND.vercel.app",
      "http://localhost:3000"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});
