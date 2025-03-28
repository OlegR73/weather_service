require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const OpenAI = require('openai');
const PORT = process.env.PORT || 5000;
const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());



app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', port: PORT });
  });


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/chat', async (req, res) => {
    const { messages } = req.body;
  try {
   
    const chatCompletion = await openai.chat.completions.create({
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

app.use(express.static(path.join(__dirname, '../dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Backend listening at ${PORT}`);
});

