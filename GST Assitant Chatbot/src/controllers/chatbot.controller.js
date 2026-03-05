const ChatMessage = require("../models/ChatMessage");
const { getAIResponse } = require("../services/chatbot.service");

exports.handleMessage = async (req, res) => {
  try {
    const { prompt: userPrompt, history } = req.body;

    if (!userPrompt) {
      return res.status(400).send("Please provide a prompt!");
    }

    // Call Gemini AI Service
    const aiResponse = await getAIResponse(userPrompt, history || []);

    // Save to DB
    const chat = new ChatMessage({
      user: "user",
      message: userPrompt,
      response: aiResponse,
    });
    await chat.save();

    res.send({ response: aiResponse });
  } catch (error) {
    console.error("❌ Error in chatbot.controller:", error);
    res.status(500).send("Something went wrong with the AI!");
  }
};
