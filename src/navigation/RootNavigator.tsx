import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../storage/store";
import GuestStack from "./GuestStack";
import AuthStack from "./AuthStack";

const RootNavigator = () => {
  const { authorizedUser } = useSelector((store: RootState) => store.users);

  return (
    <NavigationContainer>
      {authorizedUser ? <AuthStack /> : <GuestStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
