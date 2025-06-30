const io = socketIo(server, {
  cors: {
    origin: [
      "https://YOUR-VERCEL-URL.vercel.app", // replace with your deployed frontend URL
    ],
    methods: ["GET", "POST"],
  },
});

