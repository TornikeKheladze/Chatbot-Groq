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

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ChatHistory {
  id: string;
  messages: Message[];
}

export interface ChatHistories {
  [userId: string]: {
    [chatId: string]: ChatHistory;
  };
}

export interface AppStorage {
  users: User[];
  authorizedUser: User;
  chatHistories: ChatHistories;
}
