import { useState } from "react";
import { ChatType, Message } from "../../../types/common";
import { sendMessageToGroq } from "../../../helpers/groq";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../storage/store";
import { saveChatMessage } from "../../../storage/chatSlice";

export const useChat = (chat: ChatType | undefined) => {
  const dispatch = useDispatch<AppDispatch>();

  const { theme } = useSelector((store: RootState) => store.theme);
  const { authorizedUser } = useSelector((store: RootState) => store.users);
  const { chats } = useSelector((store: RootState) => store.chat);

  const [inputText, setInputText] = useState<string>("");
  const [currentChat, setCurrentChat] = useState<ChatType | undefined>(chat);

  const initialMessages =
    chats.find((c) => c.chatId === currentChat?.chatId)?.messages || [];

  const {
    mutate,
    isPending,
    data: messages = initialMessages,
  } = useMutation({
    mutationFn: sendMessageToGroq,
    onSuccess: (updatedMessages) => {
      dispatch(
        saveChatMessage({
          chatId: currentChat?.chatId!,
          chatName: currentChat?.chatName!,
          messages: updatedMessages,
          userEmail: authorizedUser?.email!,
        })
      );
    },
  });

  const handleSend = async (): Promise<void> => {
    if (!inputText.trim()) return;
    const timestamp = Date.now();
    const userMessage: Message = {
      text: inputText,
      sender: "user",
      timestamp,
    };
    const updatedMessages = [...messages, userMessage];

    if (!currentChat) {
      setCurrentChat({
        chatId: timestamp,
        chatName: inputText,
        messages: [],
        userEmail: authorizedUser?.email!,
      });
    }

    dispatch(
      saveChatMessage({
        chatId: currentChat ? currentChat.chatId : timestamp,
        chatName: inputText,
        messages: updatedMessages,
        userEmail: authorizedUser?.email!,
      })
    );
    setInputText("");
    mutate(updatedMessages);
  };

  return { theme, messages, inputText, setInputText, handleSend, isPending };
};
