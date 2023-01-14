// Modules
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import Initial from "../screens/Initial";
import RegisterTrack from "../screens/RegisterTrack";

export type InitialRouteNativeStack = {
  initial: undefined;
  registerTrack: undefined;
}

const NativeStack = createNativeStackNavigator<InitialRouteNativeStack>();

export default function App() {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <NativeStack.Screen name="initial" component={Initial}/>
      <NativeStack.Screen name="registerTrack" component={RegisterTrack}/>
    </NativeStack.Navigator>
  );
}

