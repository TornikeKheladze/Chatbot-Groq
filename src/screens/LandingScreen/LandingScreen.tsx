import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

type LandingScreenProps = NativeStackScreenProps<RootStackParamList, "Landing">;

const LandingScreen: React.FC<LandingScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    gap: 32, // 8 * 4 (gap-8)
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
    backgroundColor: "#1A1A1A",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 24,
  },
});
