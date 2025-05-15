import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatScreen from "../screens/Chat/Chat";
import Header from "../components/Header/Header";

export type AuthStackParamList = {
  Chat: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          header: () => <Header />,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
