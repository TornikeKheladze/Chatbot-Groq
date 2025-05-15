import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ListRenderItem,
} from "react-native";
import { MMKV } from "react-native-mmkv";
import { Message } from "../../types/common";
import { sendMessageToGroq } from "../../helpers/groq";
import { getSavedMessages, saveMessages } from "../../storage/storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import { useMutation } from "@tanstack/react-query";

const storage = new MMKV();

type ChatScreenProps = NativeStackScreenProps<RootStackParamList, "Chat">;

const ChatScreen: React.FC<ChatScreenProps> = () => {
  const [inputText, setInputText] = useState<string>("");

  const {
    mutate,
    isPending,
    data: messages = getSavedMessages(),
  } = useMutation({
    mutationFn: sendMessageToGroq,
    onSuccess: (updatedMessages) => saveMessages(updatedMessages),
  });

  const handleSend = async (): Promise<void> => {
    if (!inputText.trim()) return;
    const userMessage: Message = {
      text: inputText,
      sender: "user",
      timestamp: Date.now(),
    };
    const updatedMessages = [...messages, userMessage];
    setInputText("");
    mutate(updatedMessages);
  };

  const clearHistory = (): void => {
    storage.set("chatHistory", "[]");
  };

  const renderMessage: ListRenderItem<Message> = ({ item }) => (
    <View
      style={[
        styles.message,
        item.sender === "user" ? styles.userMessage : styles.aiMessage,
      ]}
    >
      <Text
        style={
          item.sender === "user" ? styles.userMessageText : styles.messageText
        }
      >
        {item.text}
      </Text>
      {item.timestamp && (
        <Text style={styles.timestamp}>
          {new Date(item.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesContainer}
        inverted={messages.length > 0}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
          onSubmitEditing={handleSend}
          returnKeyType="send"
          editable={!isPending}
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            (isPending || !inputText.trim()) && styles.disabledButton,
          ]}
          onPress={handleSend}
          disabled={isPending || !inputText.trim()}
        >
          <Text style={styles.sendButtonText}>
            {isPending ? "..." : "Send"}
          </Text>
        </TouchableOpacity>
      </View>
      {messages.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={clearHistory}>
          <Text style={styles.clearButtonText}>Clear History</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    width: "100%",
  },
  messagesContainer: {
    padding: 10,
  },
  message: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
    borderBottomRightRadius: 0,
  },
  aiMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5EA",
    borderBottomLeftRadius: 0,
  },
  messageText: {
    color: "#000",
    fontSize: 16,
  },
  userMessageText: {
    color: "#fff",
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: "rgba(0,0,0,0.5)",
    marginTop: 4,
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
    color: "#000",
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007AFF",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 40,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  clearButton: {
    alignSelf: "center",
    marginBottom: 10,
    padding: 10,
  },
  clearButtonText: {
    color: "#007AFF",
    fontSize: 16,
  },
});

export default ChatScreen;
