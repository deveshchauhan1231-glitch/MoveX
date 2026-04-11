import express from "express";
import asyncHandler from "express-async-handler";
import authMiddleware from "../middleware/authMiddleware.js";
import { Groq } from "groq-sdk";
import multer from "multer";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 4 * 1024 * 1024
  }
});

router.post(
  "/calorie-counter",
  authMiddleware,
  upload.single("message"),
  asyncHandler(async (req, res) => {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY?.trim()
    });

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    try {
      const base64Image = req.file.buffer.toString("base64");
      const mimeType = req.file.mimetype;

      const completion = await groq.chat.completions.create({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          {
            role: "system",
            content:
              "Analyze this food image and return nutrition estimates, based on the food items and their quantity and nutritional insight only in the required JSON schema."
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Return only JSON with total_cal, protein, fats, carbs, based on the food and its quantity and only nutrition based insights and the food name."
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:${mimeType};base64,${base64Image}`
                }
              }
            ]
          }
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "food_nutrition_response",
            strict: false,
            schema: {
              type: "object",
              properties: {
                total_cal: { type: "number" },
                protein: { type: "number" },
                fats: { type: "number" },
                carbs: { type: "number" },
                insights: { type: "string" }
              },
              required: ["total_cal", "protein", "fats", "carbs", "insights"],
              additionalProperties: false
            }
          }
        },
        temperature: 0.2,
        max_completion_tokens: 200,
        top_p: 1
      });

      const reply = completion.choices[0]?.message?.content || "{}";
      const parsedReply = JSON.parse(reply);

      res.json(parsedReply);
    } catch (err) {
      res.status(500).json({
        error: err.message || "Groq API error"
      });
    }
  })
);

export default router;