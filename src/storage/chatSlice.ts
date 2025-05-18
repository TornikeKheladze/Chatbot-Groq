import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatType } from "../types/common";

const initialState: { chats: ChatType[] } = {
  chats: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    editChat(state, action: PayloadAction<ChatType>) {
      const { payload } = action;
      const chatIndex = state.chats.findIndex(
        (item) => item.chatId === payload.chatId
      );
      if (chatIndex !== -1) {
        state.chats[chatIndex] = payload;
      } else {
        state.chats = [...state.chats, action.payload];
      }
    },
    deleteChat(state, action: PayloadAction<ChatType>) {
      state.chats = state.chats.filter(
        (c) => c.chatId !== action.payload.chatId
      );
    },
  },
});

export const { editChat, deleteChat } = chatSlice.actions;
export default chatSlice.reducer;
