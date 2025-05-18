import { Alert } from "react-native";
import { useState } from "react";
import { ChatType } from "../../../../types/common";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../storage/store";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AuthStackParamList } from "../../../../navigation/AuthStack";
import { deleteChat, editChat } from "../../../../storage/chatSlice";

export const useChatListItem = (chat: ChatType) => {
  const { theme } = useSelector((store: RootState) => store.theme);
  const { params } = useRoute<RouteProp<AuthStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();

  const chatIsActive = params?.chat?.chatId === chat.chatId;

  const [showPopover, setShowpopover] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [input, setInput] = useState(chat.chatName);

  const onDeletePress = () => {
    Alert.alert("Chat Delete", "Are You Sure?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Submit",
        onPress: () => dispatch(deleteChat(chat)),
        style: "destructive",
      },
    ]);
  };
  const onEditPress = () => {
    setShowpopover(false);
    setIsEditing(true);
  };
  const onCancelEdit = () => {
    setInput(chat.chatName);
    setIsEditing(false);
  };
  const onSubmitEdit = () => {
    dispatch(
      editChat({
        ...chat,
        chatName: input,
      })
    );
    setIsEditing(false);
  };

  return {
    onEditPress,
    onCancelEdit,
    onSubmitEdit,
    onDeletePress,
    theme,
    chatIsActive,
    isEditing,
    input,
    setInput,
    showPopover,
    setShowpopover,
  };
};
