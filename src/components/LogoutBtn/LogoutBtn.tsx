import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { logout } from "../../storage/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../storage/store";

const LogoutBtn = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <TouchableOpacity
      style={styles.logoutButton}
      onPress={() => dispatch(logout())}
    >
      <SimpleLineIcons name="logout" size={20} color="red" />
      <Text>Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 16,
    gap: 8,
  },
});

export default LogoutBtn;
