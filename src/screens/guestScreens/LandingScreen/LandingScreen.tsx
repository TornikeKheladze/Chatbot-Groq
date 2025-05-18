import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GuestStackParamList } from "../../../navigation/GuestStack";
import { useSelector } from "react-redux";
import { RootState } from "../../../storage/store";

type LandingScreenProps = NativeStackScreenProps<
  GuestStackParamList,
  "Landing"
>;

const LandingScreen: React.FC<LandingScreenProps> = ({ navigation }) => {
  const { theme } = useSelector((store: RootState) => store.theme);
  const btnStyles = [styles.button, { backgroundColor: theme.text.primary }];
  const textStyles = [styles.buttonText, { color: theme.bg.primary }];
  return (
    <View style={[styles.container, { backgroundColor: theme.bg.primary }]}>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={btnStyles}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={textStyles}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={btnStyles}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={textStyles}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 32,
    alignItems: "center",
    paddingTop: "40%",
  },
  buttonWrapper: {
    width: "50%",
  },
  button: {
    width: "100%",
    padding: 16,
    borderRadius: 24,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
  },
});
