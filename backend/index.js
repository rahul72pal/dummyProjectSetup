const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
// const dealRoutes = require("./routes/dealRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request body
app.use(cors()); // Enable CORS

// API Routes
app.use("/api/auth", authRoutes);
// app.use("/api/deals", dealRoutes);

// Define a root route
app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Create HTTP server and integrate with Socket.io
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

// Socket.io Logic for real-time chat and notifications
io.on("connection", (socket) => {
    console.log("New WebSocket connection:", socket.id);

    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);
    });

    socket.on("sendMessage", ({ roomId, message }) => {
        io.to(roomId).emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Define the PORT
const PORT = process.env.PORT || 5000;

// Start Server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
