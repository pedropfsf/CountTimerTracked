// Modules
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import Home from "./screens/Home";
import RegisterTrack from "./screens/RegisterTrack";

export type InitialRouteNativeStack = {
  home: undefined;
  registerTrack: undefined;
}

const NativeStack = createNativeStackNavigator<InitialRouteNativeStack>();

export default function App() {
  return (
    <NavigationContainer>
      <NativeStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <NativeStack.Screen name="home" component={Home}/>
        <NativeStack.Screen name="registerTrack" component={RegisterTrack}/>
      </NativeStack.Navigator>
    </NavigationContainer>
  );
}

