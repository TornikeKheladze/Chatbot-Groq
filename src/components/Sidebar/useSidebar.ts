import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppDispatch, RootState } from "../../storage/store";
import { logout } from "../../storage/userSlice";
import { AuthStackParamList } from "../../navigation/AuthStack";
import { ChatType } from "../../types/common";
import { sortChatsAddTiming } from "../../helpers/chatTimes";
import { useDebounce } from "../../hooks/useDebounce";

export const useSidebar = (onClose: () => void) => {
  const dispatch = useDispatch<AppDispatch>();

  const { theme } = useSelector((store: RootState) => store.theme);
  const { chats } = useSelector((store: RootState) => store.chat);
  const { authorizedUser } = useSelector((store: RootState) => store.users);

  const userChats = chats.filter((c) => c.userEmail === authorizedUser?.email);

  const [searchedChats, setSearchedChats] = useState(userChats);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    setSearchedChats(
      userChats.filter((chat) =>
        chat.chatName
          .toLocaleLowerCase()
          .includes(debouncedSearch.toLocaleLowerCase())
      )
    );
  }, [debouncedSearch]);

  const { navigate } =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const onChatPress = (chat: ChatType | undefined) => {
    navigate("Chat", { chat });
    onClose();
  };

  const chatsToRender = sortChatsAddTiming(searchedChats);

  return {
    theme,
    dispatch,
    logout,
    onChatPress,
    chatsToRender,
    searchTerm,
    setSearchTerm,
  };
};
