import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useSelector } from "react-redux";
import { RootState } from "../../../storage/store";

const UserInfoItem = () => {
  const { theme } = useSelector((store: RootState) => store.theme);
  const { authorizedUser } = useSelector((store: RootState) => store.users);

  const textColor = theme.text.primary;

  return (
    <View style={[styles.container]}>
      <SimpleLineIcons
        style={[styles.icon, { backgroundColor: textColor }]}
        name="user"
        size={24}
        color={theme.bg.primary}
      />
      <View>
        <View style={styles.userName}>
          <Text style={[styles.text, { color: textColor }]}>
            {authorizedUser?.firstName}
          </Text>
          <Text style={[styles.text, { color: textColor }]}>
            {authorizedUser?.lastName}
          </Text>
        </View>
        <Text style={[styles.email, { color: textColor }]}>
          {authorizedUser?.email}
        </Text>
      </View>
    </View>
  );
};

export default UserInfoItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  text: {
    fontSize: 16,
  },
  email: {
    fontSize: 12,
  },
  icon: {
    padding: 10,
    borderRadius: 10,
  },
  userName: { flexDirection: "row", gap: 10 },
});
