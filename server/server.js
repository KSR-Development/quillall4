const path = require('path');
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const { PORT = 3000 } = process.env;

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("API key is missing. Please set the OPENAI_API_KEY environment variable.");
}

const openai = new OpenAI({
  apiKey: apiKey,
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(cors());

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

// // for future api routes if needed
// app.get('/api/test', (req, res) => {
//   res.json({ message: 'API is working' });
// });

// catch all remaining routes and return the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})