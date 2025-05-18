import React from "react";
import {
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";
import { ChatType } from "../../../types/common";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../../navigation/AuthStack";
import MessageItem from "./components/MessageItem";
import { useChat } from "./useChatScreen";
import ChatInput from "./components/ChatInput";
import TypeWriter from "react-native-typewriter";

type ChatScreenProps = NativeStackScreenProps<AuthStackParamList, "Chat">;

const ChatScreen: React.FC<ChatScreenProps> = ({ route }) => {
  const chat = route.params?.chat;
  return <Chat key={`chat-${chat?.chatId}`} chat={chat} />;
};

const Chat: React.FC<{ chat: ChatType | undefined }> = ({ chat }) => {
  const {
    theme,
    messages,
    inputText,
    setInputText,
    handleSend,
    isPending,
    isSuccess,
    flatListRef,
  } = useChat(chat);

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.bg.primary }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item, index) => index.toString() + item.timestamp}
        renderItem={(message) => (
          <MessageItem
            isLast={message.index === messages.length - 1 && isSuccess}
            item={message}
          />
        )}
        contentContainerStyle={styles.messagesContainer}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      {messages.length === 0 && (
        <View style={styles.typewriterContainer}>
          <TypeWriter
            style={[styles.typewriter, { color: theme.text.primary }]}
            maxDelay={10}
            typing={1}
          >
            Hello, how can i help you?
          </TypeWriter>
        </View>
      )}

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
  typewriterContainer: { flex: 1, alignItems: "center" },
  typewriter: {
    transform: [{ translateY: "-50%" }],
    fontSize: 30,
    flexWrap: "wrap",
    width: "70%",
    textAlign: "center",
  },
});

export default ChatScreen;
