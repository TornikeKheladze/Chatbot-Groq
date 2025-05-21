import { useMemo, useState } from "react";
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

  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useDebounce(searchTerm, 500);

  const { navigate } =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const onChatPress = (chat: ChatType | undefined) => {
    navigate("Chat", { chat });
    onClose();
  };

  const chatsToRender = useMemo(() => {
    const filtered = userChats.filter((chat) =>
      chat.chatName.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
    return sortChatsAddTiming(filtered);
  }, [userChats, debouncedSearch]);

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
