import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLoginScreen } from "./useLoginScreen";
import { GuestStackParamList } from "../../../navigation/GuestStack";
import Input from "../../../components/Input/Input";

type LoginScreenProps = NativeStackScreenProps<GuestStackParamList, "Login">;

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const { control, handleSubmit, errors, onSubmit, theme } = useLoginScreen();

  return (
    <View style={[styles.container, { backgroundColor: theme.bg.primary }]}>
      <Input
        fieldName="email"
        displayName={"Email"}
        control={control}
        error={errors.email}
      />
      <Input
        fieldName="password"
        displayName={"Password"}
        control={control}
        error={errors.password}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.text.primary }]}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={[styles.buttonText, { color: theme.bg.primary }]}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: "30%",
    paddingHorizontal: 16,
    gap: 16,
  },
  buttonContainer: {
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
