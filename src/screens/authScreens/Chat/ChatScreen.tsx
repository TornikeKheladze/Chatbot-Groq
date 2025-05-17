import React from "react";
import {
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ChatType } from "../../../types/common";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../../navigation/AuthStack";
import MessageItem from "./components/MessageItem";
import { useChat } from "./useChatScreen";
import ChatInput from "./components/ChatInput";

type ChatScreenProps = NativeStackScreenProps<AuthStackParamList, "Chat">;

const ChatScreen: React.FC<ChatScreenProps> = ({ route }) => {
  const chat = route.params?.chat;
  return <Chat key={`chat-${chat?.chatId}`} chat={chat} />;
};

const Chat: React.FC<{ chat: ChatType | undefined }> = ({ chat }) => {
  const { theme, messages, inputText, setInputText, handleSend, isPending } =
    useChat(chat);

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.bg.primary }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString() + item.timestamp}
        renderItem={(message) => <MessageItem item={message} />}
        contentContainerStyle={styles.messagesContainer}
        inverted={messages.length > 0}
      />
      <ChatInput
        inputText={inputText}
        setInputText={setInputText}
        handleSend={handleSend}
        isPending={isPending}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesContainer: {
    padding: 10,
  },
});

export default ChatScreen;
