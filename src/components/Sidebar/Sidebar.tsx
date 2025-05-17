import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Switch,
  Button,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Animated from "react-native-reanimated";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

import { useSidebar } from "./useSidebar";

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
    userChats,
  } = useSidebar(isOpen, onClose);

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
        <Button title="theme change " onPress={toggle} />
        <Switch
          value={theme.mode === "dark" ? true : false}
          onValueChange={toggle}
        />
        <TouchableOpacity
          style={styles.newChatBtn}
          onPress={() => onChatPress(undefined)}
        >
          <Text>New Chat</Text>
        </TouchableOpacity>
        <View>
          <Text>test</Text>
        </View>
        <FlatList
          data={userChats}
          keyExtractor={(item, index) => index.toString() + item.chatId}
          renderItem={(chat) => (
            <TouchableOpacity onPress={() => onChatPress(chat.item)}>
              <Text>{chat.item.chatName}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.chatListContainer}
        />

        <View>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => dispatch(logout())}
          >
            <SimpleLineIcons name="logout" size={20} color="red" />
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 100,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    zIndex: 20,
    height,
    justifyContent: "center",
  },
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 10,
    height,
  },
  bottomContainer: {},
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 16,
    gap: 8,
  },
  chatListContainer: {
    backgroundColor: "red",
  },
  newChatBtn: {
    backgroundColor: "blue",
  },
});
