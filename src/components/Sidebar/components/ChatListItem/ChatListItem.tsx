import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ChatType } from "../../../../types/common";
import AntDesign from "@expo/vector-icons/AntDesign";
import ChatPopover from "../ChatPopover";
import { useChatListItem } from "./useChatListItem";

type ChatListItemProps = {
  chat: ChatType;
  onChatPress: (chat: ChatType | undefined) => void;
};

const ChatListItem: React.FC<ChatListItemProps> = ({ chat, onChatPress }) => {
  const {
    onCancelEdit,
    onDeletePress,
    onEditPress,
    onSubmitEdit,
    theme,
    chatIsActive,
    isEditing,
    input,
    setInput,
    showPopover,
    setShowpopover,
  } = useChatListItem(chat);

  const containerStyle = {
    borderColor: theme.border.default,
    backgroundColor: chatIsActive ? theme.bg.secondary : theme.bg.primary,
  };
  const textColor = theme.text.primary;

  const inputStyle = [
    {
      color: textColor,
      borderColor: theme.border.default,
    },
    styles.input,
  ];

  return (
    <>
      {chat.dateCategory && (
        <Text
          style={[styles.dateCategory, { color: theme.text.status.warning }]}
        >
          {chat.dateCategory}
        </Text>
      )}
      <TouchableOpacity
        style={[styles.container, containerStyle]}
        onPress={() => onChatPress(chat)}
      >
        {isEditing ? (
          <View style={styles.inputContainer}>
            <TextInput
              style={inputStyle}
              value={input}
              onChangeText={(e) => setInput(e)}
            />
            <View style={styles.inputIcons}>
              <TouchableOpacity onPress={onSubmitEdit}>
                <AntDesign name="checkcircleo" size={20} color="green" />
              </TouchableOpacity>
              <TouchableOpacity onPress={onCancelEdit}>
                <AntDesign name="closecircleo" size={20} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Text style={[{ color: textColor }]}>{chat.chatName}</Text>
        )}
        <ChatPopover
          showPopover={showPopover}
          setShowpopover={setShowpopover}
          onEditPress={onEditPress}
          onDeletePress={onDeletePress}
          isEditing={isEditing}
        />
      </TouchableOpacity>
    </>
  );
};

export default ChatListItem;

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    height: 40,
  },
  inputIcons: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  input: {
    borderRadius: 8,
    flex: 1,
    borderWidth: 1,
  },
  dateCategory: {
    marginBottom: 10,
    marginTop: 5,
  },
});
