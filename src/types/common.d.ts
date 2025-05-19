export type Message = {
  text: string;
  sender: "user" | "ai";
  timestamp: number;
};

export type GroqMessageRole = "system" | "user" | "assistant";

export type GroqMessage = {
  role: GroqMessageRole;
  content: string;
};

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AppStorage {
  users: User[];
  authorizedUser: User;
  chatHistories: ChatHistories;
}

export type ChatType = {
  userEmail: string;
  chatName: string;
  messages: Message[];
  chatId: number;
  nameChangedByAi?: boolean;
  dateCategory?: string;
};
