import axios from "axios";

const isLocalhost = window.location.hostname === 'localhost';
const API_URL = isLocalhost ? 'http://localhost:5000' : 'https://weather-service-c2pe.onrender.com';
const messages = [];

export default async function askQuestion(input) {
  const question = input;
  
  
  // if (messages.length === 0) {
  //   messages.push({
  //     role: "system",
  //     content: "You are a helpful pharmacy assistant who knows the product range and prices. The pharmacy is called 'Our pharmacy'."
  //   });
  // }

  if (messages.length === 0) {
    messages.push({
      role: "system",
      content: "You are a helpful weather assistant who knows the everything about climate. You can inform about climate features in area you asked, not about current weather."
    });
  }

  messages.push({ role: "user", content: question });

  try {
    const response = await axios.post(`${API_URL}/api/chat`, {
      messages: messages,
    });

    const answer = response.data.choices[0].message.content;
    
    messages.splice(messages.length - 1, 0, {
      role: "assistant",
      content: answer,
    });
    
    
    return [...messages];

  } catch (error) {
    console.error(error);
    messages.splice(messages.length - 1, 0, {
      role: "assistant",
      content: "Connection error !",
      isError: true,
    });

    return [...messages];
  }
}
