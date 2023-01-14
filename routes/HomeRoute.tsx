// Modules
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import InitialHome from "../screens/InitialHome";
import RegisterTrack from "../screens/RegisterTrack";

export type HomeInitialRouteNativeStack = {
  initialHome: undefined;
  registerTrack: undefined;
}

const NativeStack = createNativeStackNavigator<HomeInitialRouteNativeStack>();

export default function App() {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <NativeStack.Screen name="initialHome" component={InitialHome}/>
      <NativeStack.Screen name="registerTrack" component={RegisterTrack}/>
    </NativeStack.Navigator>
  );
}

