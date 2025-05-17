import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../components/Header/Header";
import { ChatType } from "../types/common";
import ChatScreen from "../screens/authScreens/Chat/ChatScreen";

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
