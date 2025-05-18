import { useEffect } from "react";
import { Dimensions } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../storage/store";
import { toggleTheme } from "../../storage/themeSlice";
import { logout } from "../../storage/userSlice";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { AuthStackParamList } from "../../navigation/AuthStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChatType } from "../../types/common";

const { width } = Dimensions.get("window");
const SIDEBAR_WIDTH = width * 0.8;

export const useSidebar = (isOpen: boolean, onClose: () => void) => {
  const dispatch = useDispatch<AppDispatch>();
  const { params } = useRoute<RouteProp<AuthStackParamList>>();

  const { theme } = useSelector((store: RootState) => store.theme);
  const { chats } = useSelector((store: RootState) => store.chat);
  const { authorizedUser } = useSelector((store: RootState) => store.users);

  const { navigate } =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const userChats = chats.filter((c) => c.userEmail === authorizedUser?.email);

  const translateX = useSharedValue(-SIDEBAR_WIDTH);

  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(isOpen ? 0 : -SIDEBAR_WIDTH, {
      duration: 300,
    });
    backdropOpacity.value = withTiming(isOpen ? 1 : 0, { duration: 300 });
  }, [isOpen]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
    display: backdropOpacity.value === 0 ? "none" : "flex",
  }));

  const toggle = () => {
    dispatch(toggleTheme());
  };

  const onChatPress = (chat: ChatType | undefined) => {
    navigate("Chat", { chat });
    onClose();
  };

  return {
    backdropStyle,
    animatedStyle,
    theme,
    toggle,
    dispatch,
    logout,
    onChatPress,
    userChats,
  };
};
