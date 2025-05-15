import Groq from "groq-sdk";
import Constants from "expo-constants";
import { GroqMessage, Message } from "../types/common";

const { GROQ_API_KEY } = Constants.expoConfig?.extra as {
  GROQ_API_KEY: string;
};

export const groq = new Groq({
  apiKey: GROQ_API_KEY,
});

export const sendMessageToGroq = async (prevMessages: Message[]) => {
  const groqMessages: GroqMessage[] = [
    {
      role: "system",
      content: "You are a helpful assistant. Keep responses concise.",
    },
    ...prevMessages.map(
      (msg): GroqMessage => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      })
    ),
  ];

  const chatCompletion = await groq.chat.completions.create({
    messages: groqMessages,
    model: "llama-3.3-70b-versatile",
  });

  const aiMessage: Message = {
    text:
      chatCompletion.choices[0]?.message?.content ||
      "Sorry, I could not process that.",
    sender: "ai",
    timestamp: Date.now(),
  };
  return [...prevMessages, aiMessage];
};
