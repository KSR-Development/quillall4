import dotenv from "dotenv";
import OpenAI from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

// Use CORS middleware to allow requests from different origins
app.use(cors());
app.use(bodyParser.json());

app.post("/api/update_content", async (req, res) => {
  try {
    const { content } = req.body;

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an inquisitive and novel expert business consultant.
          You will, in 50 words, clearly explain the business idea as given by the user
          to prepare it for further model analysis and elaboration.`,
        },
        {
          role: "user",
          content: content,
        },
      ],
    });

    const responseMessage = chatCompletion.choices[0].message.content;
    res.status(200).send({ answer: responseMessage });
  } catch (error) {
    console.error("Error updating content:", error);
    res.status(500).send({ error: "Failed to update content" });
  }
});

// New API endpoint for node click
app.post("/api/node_click", async (req, res) => {
  try {
    const { content } = req.body;

    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an inquisitive and novel expert business consultant.
          Starting from almost scratch. Help the entrepreneur realistically make it a reality step by step.
          Provide two options as a response in max 45 words, taking the immediate clear and valuable
          next step for the idea as given in the input. If needed, give useful advice as to which tools to use.
          Preface one with 'Option 1:' and the other
          with 'Option 2:'. One should be a novel idea/approach, the other the next actionable step
          for implementing the input (do not repeat what steps are given in the input, instead move forward).
          Assume prior logical steps have been taken. Describe the respective strategies with one or two words in caps.
          If needed, suggest specific tools, frameworks, or methodologies the entrepreneur can use.
          Additionally, take into account industry context, and propose approaches that account for **localized advice**, recognizing geographic, cultural, or economic differences in strategy execution.`,
        },
        {
          role: "user",
          content: content,
        },
      ],
    });

    const responseMessage = chatCompletion.choices[0].message.content;
    res.status(200).send({ answer: responseMessage });
  } catch (error) {
    console.error("Error processing node click:", error);
    res.status(500).send({ error: "Failed to process node click" });
  }
});

// Handle React routing, return all requests to React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
