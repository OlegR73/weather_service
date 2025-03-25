import { apiKey } from "./apiKey.js";
import axios from "axios";


const messages = [];
export default async function askQuestion(input) {
  const question = input;
  
  messages.push({ role: "user", content: question });

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: messages,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const answer = response.data.choices[0].message.content;
    messages.splice(messages.length - 1, 0, {
      role: "assistant",
      content: answer,
    });
    
    console.log(messages);
    return [...messages];

  } catch (error) {
    console.error(error);
    return "Request error.";
  }
}
