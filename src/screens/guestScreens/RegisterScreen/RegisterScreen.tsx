import { View, TouchableOpacity, Switch, Text, StyleSheet } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRegisterScreen } from "./useRegisterScreen";
import { GuestStackParamList } from "../../../navigation/GuestStack";
import Input from "../../../components/Input/Input";

type RegisterScreenProps = NativeStackScreenProps<
  GuestStackParamList,
  "Register"
>;

const RegisterScreen: React.FC<RegisterScreenProps> = () => {
  const { handleSubmit, control, errors, onSubmit, theme } =
    useRegisterScreen();

  return (
    <View style={[styles.container, { backgroundColor: theme.bg.primary }]}>
      <View style={styles.row}>
        <View style={styles.flexItem}>
          <Input
            fieldName="firstName"
            displayName={"First Name"}
            control={control}
            error={errors.firstName}
          />
        </View>
        <View style={styles.flexItem}>
          <Input
            fieldName="lastName"
            displayName={"Last Name"}
            control={control}
            error={errors.lastName}
          />
        </View>
      </View>

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
      <Input
        fieldName="passwordConfirmation"
        displayName={"Confirm Password"}
        control={control}
        error={errors.passwordConfirmation}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.text.primary }]}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={[styles.buttonText, { color: theme.bg.primary }]}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    paddingTop: "30%",
    paddingHorizontal: 16,
    gap: 16,
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  flexItem: {
    flex: 1,
  },
  buttonContainer: {
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
