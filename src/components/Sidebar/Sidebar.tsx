import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Switch,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Animated from "react-native-reanimated";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Entypo from "@expo/vector-icons/Entypo";

import { useSidebar } from "./useSidebar";
import ChatListItem from "./components/ChatListItem/ChatListItem";
import UserInfoItem from "./components/UserInfoItem";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const { width, height } = Dimensions.get("window");
const SIDEBAR_WIDTH = width * 0.8;

const Sidebar: React.FC<Props> = ({ isOpen, onClose }) => {
  const {
    backdropStyle,
    animatedStyle,
    theme,
    toggle,
    dispatch,
    logout,
    onChatPress,
    chatsToRender,
  } = useSidebar(isOpen, onClose);

  const textColor = theme.text.primary;

  return (
    <>
      <Animated.View
        style={[StyleSheet.absoluteFill, styles.backdrop, backdropStyle]}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      <Animated.View
        style={[
          styles.container,
          animatedStyle,
          { backgroundColor: theme.bg.primary },
        ]}
      >
        <TouchableOpacity style={styles.switch} onPress={toggle}>
          <Text style={{ color: textColor }}>
            {theme.mode === "light" ? "Dark Mode" : "Light Mode"}
          </Text>
          <Switch
            value={theme.mode === "dark" ? true : false}
            onValueChange={toggle}
          />
        </TouchableOpacity>
        <UserInfoItem />
        <TouchableOpacity
          style={styles.newChatBtn}
          onPress={() => onChatPress(undefined)}
        >
          <Text style={[styles.text, { color: textColor }]}>New Chat</Text>
          <Entypo name="new-message" size={20} color={textColor} />
        </TouchableOpacity>

        <FlatList
          data={chatsToRender}
          keyExtractor={(item, index) => index.toString() + item.chatId}
          renderItem={(item) => (
            <ChatListItem chat={item.item} onChatPress={onChatPress} />
          )}
          contentContainerStyle={styles.chatListContainer}
        />

        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: theme.bg.secondary }]}
          onPress={() => dispatch(logout())}
        >
          <SimpleLineIcons name="logout" size={20} color="red" />
          <Text style={[styles.text, { color: textColor }]}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 100,
    paddingBottom: 30,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    zIndex: 20,
    height,
    gap: 20,
  },
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 10,
    height,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "50%",
    padding: 12,
    borderRadius: 16,
    gap: 8,
  },
  chatListContainer: {
    gap: 5,
  },
  text: {
    fontSize: 20,
  },
  switch: {
    position: "absolute",
    right: 20,
    top: 60,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  newChatBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});
