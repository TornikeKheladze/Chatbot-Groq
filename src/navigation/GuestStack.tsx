import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "../screens/guestScreens/LandingScreen/LandingScreen";
import LoginScreen from "../screens/guestScreens/LoginScreen/LoginScreen";
import RegisterScreen from "../screens/guestScreens/RegisterScreen/RegisterScreen";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../storage/store";
import { Switch, TouchableOpacity } from "react-native";
import { toggleTheme } from "../storage/themeSlice";

export type GuestStackParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
};

export const Stack = createNativeStackNavigator<GuestStackParamList>();

const GuestStack = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((store: RootState) => store.theme);
  const toggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: theme.text.primary,
        headerStyle: {
          backgroundColor: theme.bg.secondary,
        },
        headerTitleStyle: {
          color: theme.text.primary,
        },
        headerRight: () => (
          <TouchableOpacity onPress={toggle}>
            <Switch
              value={theme.mode === "dark" ? true : false}
              onValueChange={toggle}
            />
          </TouchableOpacity>
        ),
      }}
    >
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
