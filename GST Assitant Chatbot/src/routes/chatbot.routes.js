const express = require("express");
const { handleMessage } = require("../controllers/chatbot.controller");

const router = express.Router();

router.post("/chat", handleMessage);

module.exports = router;
