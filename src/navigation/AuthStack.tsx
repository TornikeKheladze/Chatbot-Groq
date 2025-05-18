import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ChatType } from "../types/common";
import ChatScreen from "../screens/authScreens/Chat/ChatScreen";
import Header from "../components/Header/Header";

export type AuthStackParamList = {
  Chat: { chat: ChatType | undefined };
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
