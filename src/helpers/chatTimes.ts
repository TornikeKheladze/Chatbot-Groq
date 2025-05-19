import { ChatType } from "../types/common";

export function getChatDateCategory(
  chatId: number
): "Today" | "Yesterday" | "Previous 7 Days" | "Previous 30 Days" | "Older" {
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).getTime();

  const startOfYesterday = startOfToday - 24 * 60 * 60 * 1000;
  const startOf7DaysAgo = startOfToday - 7 * 24 * 60 * 60 * 1000;
  const startOf30DaysAgo = startOfToday - 30 * 24 * 60 * 60 * 1000;

  if (chatId >= startOfToday) return "Today";
  if (chatId >= startOfYesterday) return "Yesterday";
  if (chatId >= startOf7DaysAgo) return "Previous 7 Days";
  if (chatId >= startOf30DaysAgo) return "Previous 30 Days";
  return "Older";
}

export const sortChatsAddTiming = (chats: ChatType[]) => {
  const renderedLabels = new Set<string>();

  const sortedChats = chats.sort((a, b) => b.chatId - a.chatId);

  return sortedChats.map((chat) => {
    const dateCategory = getChatDateCategory(chat.chatId);
    const showLabel = !renderedLabels.has(dateCategory);

    if (showLabel) {
      renderedLabels.add(dateCategory);
    }

    if (showLabel) {
      return {
        ...chat,
        dateCategory,
      };
    } else {
      return chat;
    }
  });
};
