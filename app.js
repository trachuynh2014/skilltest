// Load environment variables from a .env file if present
require("dotenv").config();

// Import required modules
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const http = require("http");
const server = http.createServer(app);
const apiRouter = require("./api"); // Import the API router

const PORT = process.env.PORT || 3000;

const mongoString = process.env.DATABASE_URL;

// Connect to MongoDB
mongoose.connect(mongoString);

const db = mongoose.connection;

// Event handlers for MongoDB connection
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Middleware to parse JSON requests
app.use(express.json());
// Mount the API router at the "/api" path
app.use("/api", apiRouter);
// Serve static files from the "public" directory as a client for sending and
// receiving messages from socket.io
app.use(express.static(path.resolve(__dirname, "public")));

// Start the HTTP server on the specified port
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
