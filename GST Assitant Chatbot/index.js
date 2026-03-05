const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const chatbotRoutes = require("./src/routes/chatbot.routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/chatbot", chatbotRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🤖 Server running at http://localhost:${PORT}`);
});
