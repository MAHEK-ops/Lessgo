const http = require("http");
const app = require("./app");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 8000;

// Create HTTP server (required for socket.io)
const server = http.createServer(app);

// Attach Socket.io to the server
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Socket.io events
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinTripRoom", (tripId) => {
    socket.join(`trip_${tripId}`);
  });

  socket.on("sendMessage", ({ tripId, message, user }) => {
    io.to(`trip_${tripId}`).emit("receiveMessage", {
      user,
      message,
      createdAt: new Date(),
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


server.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
