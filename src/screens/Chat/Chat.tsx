import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MMKV } from "react-native-mmkv";
import { Message } from "../../types/common";
import { sendMessageToGroq } from "../../helpers/groq";
import { getSavedMessages, saveMessages } from "../../storage/storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMutation } from "@tanstack/react-query";
import { AuthStackParamList } from "../../navigation/AuthStack";
import { useSelector } from "react-redux";
import { RootState } from "../../storage/store";
import MessageItem from "./MessageItem";
import AntDesign from "@expo/vector-icons/AntDesign";

const storage = new MMKV();

type ChatScreenProps = NativeStackScreenProps<AuthStackParamList, "Chat">;

const ChatScreen: React.FC<ChatScreenProps> = () => {
  const { theme } = useSelector((store: RootState) => store.theme);
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

  return (
    <View style={[styles.container, { backgroundColor: theme.bg.primary }]}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(message) => <MessageItem item={message} />}
        contentContainerStyle={styles.messagesContainer}
        inverted={messages.length > 0}
      />
      <View
        style={[styles.inputContainer, { backgroundColor: theme.bg.secondary }]}
      >
        <TextInput
          style={[styles.input, { color: theme.text.primary }]}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask anything..."
          onSubmitEditing={handleSend}
          returnKeyType="send"
          editable={!isPending}
          placeholderTextColor="#999"
          textAlignVertical="top"
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity
          style={[
            { backgroundColor: theme.text.primary },
            styles.sendButton,
            (isPending || !inputText.trim()) && styles.disabledButton,
          ]}
          onPress={handleSend}
          disabled={isPending || !inputText.trim()}
        >
          <AntDesign name="arrowup" size={24} color={theme.bg.primary} />
        </TouchableOpacity>
      </View>
      {/* {messages.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={clearHistory}>
          <Text style={styles.clearButtonText}>Clear History</Text>
        </TouchableOpacity>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
  },
  messagesContainer: {
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    marginRight: 15,
    marginLeft: 15,
    borderRadius: 20,
    height: 100,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    marginRight: 10,
    fontSize: 16,
    height: 80,
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 5,
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
