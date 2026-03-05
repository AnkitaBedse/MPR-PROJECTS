const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyCvujaUwMc1_1VcdatZh9FAAYZDc4CGP84");

exports.getAIResponse = async (userPrompt, history) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-05-20" });

  const formattedHistory = history
    .map(
      (msg) => `${msg.sender === "user" ? "User" : "Chatbot"}: ${msg.text}`
    )
    .join("\n");

  const finalPrompt = `You are ChatpataTax, an expert on India's Goods and Services Tax (GST) system. Do NOT introduce yourself in every response. Engage in a natural conversation. Use the provided conversation history to maintain context and answer the new user question based on that history.

---CONVERSATION HISTORY---
${formattedHistory}
--------------------------

New User Question: "${userPrompt}"`;

  const result = await model.generateContent(finalPrompt);
  const responseText = result.response.text();

  return responseText.replace(/\*/g, "");
};
