export type Message = {
  text: string;
  sender: "user" | "ai";
  timestamp?: number;
};

export type GroqMessageRole = "system" | "user" | "assistant";

export type GroqMessage = {
  role: GroqMessageRole;
  content: string;
};
