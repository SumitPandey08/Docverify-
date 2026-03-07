import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv";

dotenv.config();

const models = [
  "gemini-1.5-flash",
  "gemini-1.5-pro",
  "gemini-1.0-pro",
  "gemini-pro",
];

async function testModels() {
  for (const model of models) {
    try {
      console.log(`Testing model: ${model}...`);
      const chat = new ChatGoogleGenerativeAI({
        model: model,
        apiKey: process.env.GOOGLE_API_KEY,
        temperature: 0,
      });
      const response = await chat.invoke("Hello, how are you?");
      console.log(`Success with ${model}: ${response.content.slice(0, 50)}...`);
      return;
    } catch (error: any) {
      console.error(`Failed with ${model}: ${error.message}`);
    }
  }
}

testModels();
