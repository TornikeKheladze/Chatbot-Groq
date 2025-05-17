import { View, Text, StyleSheet, ListRenderItemInfo } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../storage/store";
import { Message } from "../../../../types/common";

const MessageItem: React.FC<{ item: ListRenderItemInfo<Message> }> = ({
  item,
}) => {
  const { theme } = useSelector((store: RootState) => store.theme);
  const messageContainerStyle = [
    styles.message,
    ,
    item.item.sender === "user"
      ? { ...styles.userMessage, backgroundColor: theme.bg.message }
      : styles.aiMessage,
  ];
  const textStyle = [
    { color: theme.text.primary },
    item.item.sender === "user" ? styles.userMessageText : styles.messageText,
  ];
  const timeStampStyle = [
    styles.timestamp,
    item.item.sender === "user" ? styles.userTimeStamp : styles.aiTimeStamp,
    { color: theme.text.secondary },
  ];

  return (
    <View style={messageContainerStyle}>
      <Text style={textStyle}>{item.item.text}</Text>
      {item.item.timestamp && (
        <Text style={timeStampStyle}>
          {new Date(item.item.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  userMessage: {
    alignSelf: "flex-end",
    borderBottomRightRadius: 0,
  },
  aiMessage: {
    alignSelf: "flex-start",
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
  },
  aiTimeStamp: { alignSelf: "flex-start" },
  userTimeStamp: { alignSelf: "flex-end" },
});

export default MessageItem;
