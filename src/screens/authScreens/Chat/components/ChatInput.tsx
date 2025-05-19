import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useSelector } from "react-redux";
import { RootState } from "../../../../storage/store";

type ChatInputProps = {
  inputText: string;
  setInputText: Dispatch<SetStateAction<string>>;
  handleSend: () => Promise<void>;
  isPending: boolean;
};

const ChatInput: React.FC<ChatInputProps> = ({
  inputText,
  setInputText,
  handleSend,
  isPending,
}) => {
  const { theme } = useSelector((store: RootState) => store.theme);

  return (
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
        {isPending ? (
          <ActivityIndicator />
        ) : (
          <AntDesign name="arrowup" size={24} color={theme.bg.primary} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    marginRight: 15,
    marginLeft: 15,
    borderRadius: 20,
    height: 100,
    marginBottom: 40,
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
});
