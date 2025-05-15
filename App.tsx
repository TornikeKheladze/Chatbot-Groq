import ChatScreen from "./src/screens/Chat/Chat";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "./src/storage/store";
import RegisterScreen from "./src/screens/RegisterScreen/RegisterScreen";
import LoginScreen from "./src/screens/LoginScreen/LoginScreen";
import LandingScreen from "./src/screens/LandingScreen/LandingScreen";

const queryClient = new QueryClient();

export type RootStackParamList = {
  Home: undefined;
  Chat: undefined;
  Register: undefined;
  Login: undefined;
  Landing: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Landing" component={LandingScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Chat" component={ChatScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
