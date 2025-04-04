require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const OpenAI = require('openai');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, '../dist')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: 'org-w9p8rhkAvl9JcwRikM9wPO0g'
});

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  try {
    const chatCompletion = await openai.chat.completions.create({
      //model: "gpt-3.5-ft:gpt-3.5-turbo-0125:personal:pharmacy:BIBVYS1J",
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.7,
    });
    res.json(chatCompletion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend listening at http://localhost:${PORT}`);
});


