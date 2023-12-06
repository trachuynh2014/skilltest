const socketIO = require("socket.io");

module.exports = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "*", // Allow connections from any origin for this example (you might want to restrict this in a production environment)
    },
  });

  // Socket.io connection event
  io.on("connection", (socket) => {
    console.log("A user connected");

    // Handle chat messages
    socket.on("chat message", (msg) => {
      console.log("Message from client:", msg);
      // Broadcast the message to all connected clients
      io.emit("chat message", msg);
    });

    // Disconnect event
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  return io;
};
