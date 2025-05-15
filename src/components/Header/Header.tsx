import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "../../storage/store";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme } = useSelector((store: RootState) => store.theme);

  const containerStyle = {
    backgroundColor: theme.bg.primary,
    borderBottomColor: theme.border.default,
  };

  return (
    <View style={[styles.headerContainer, containerStyle]}>
      <TouchableOpacity
        onPress={() => setSidebarOpen(!sidebarOpen)}
        style={styles.menuButton}
      >
        <Ionicons name="menu" size={35} color={theme.text.primary} />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: theme.text.primary }]}>
        Chat
      </Text>

      <Sidebar onClose={() => setSidebarOpen(false)} isOpen={sidebarOpen} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 100,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  menuButton: {
    position: "absolute",
    left: 10,
    bottom: 10,
  },
});

export default Header;
