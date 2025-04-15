const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
 
});

exports.summaryController = async (req, res) => {

  
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or gpt-4 if allowed
      messages: [
        { role: "system", content: "You are a helpful assistant that summarizes text." },
        { role: "user", content: `Summarize this: ${text}` },
      ],
    });

    const summary = completion.choices[0]?.message?.content?.trim();

    res.status(200).json({ summary });
  } catch (error) {
    console.error("OpenAI Error:", error);

    if (error.code === "insufficient_quota") {
      return res.status(429).json({
        error: "Quota exceeded. Please check your OpenAI plan or try again later.",
      });
    }

    res.status(500).json({
      error: "An error occurred while generating the summary",
      details: error.message,
    });
  }
};
