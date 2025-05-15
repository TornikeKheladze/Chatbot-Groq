import ChatScreen from "./src/screens/Chat/Chat";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const queryClient = new QueryClient();

export type RootStackParamList = {
  Home: undefined;
  Chat: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Chat" component={ChatScreen} />
          {/* <Stack.Screen name="Chat" component={PexelsVideos} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
