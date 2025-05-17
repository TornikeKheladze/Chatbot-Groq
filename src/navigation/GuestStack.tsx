import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "../screens/guestScreens/LandingScreen/LandingScreen";
import LoginScreen from "../screens/guestScreens/LoginScreen/LoginScreen";
import RegisterScreen from "../screens/guestScreens/RegisterScreen/RegisterScreen";

export type GuestStackParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
};

export const Stack = createNativeStackNavigator<GuestStackParamList>();

const GuestStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{ title: "Welcome" }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Login" }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Register" }}
      />
    </Stack.Navigator>
  );
};

export default GuestStack;
