import express from "express";
import asyncHandler from "express-async-handler";
import authMiddleware from "../middleware/authMiddleware.js";
import { Groq } from "groq-sdk";

const router = express.Router();


router.post(
  "/fitness-chat",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY?.trim()
    });
    const { message } = req.body;

    if (!message || message.length > 500) {
      return res
        .status(400)
        .json({ error: "Message required (max 500 chars)" });
    }

    try {
      const completion = await groq.chat.completions.create({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          {
            role: "system",
            content:
              "You are SAHAY a fitness coach, your parent platform is MoveX.Only respond to physical wellbeing topics. Otherwise refuse.Answer in 30-35 words max, be polite to greetings"
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.2,
        max_completion_tokens: 60,
        top_p: 1
      });

      const reply = completion.choices[0]?.message?.content || "";

      res.json({ reply });
    } catch (err) {
      res.status(500).json({
        error: err.message || "Groq API error"
      });
    }
  })
);

export default router;