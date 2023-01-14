// Modules
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import InitialListRecordedTimes from "../screens/InitialListRecordedTimes";
import EditTrack from "../screens/EditTrack";

export type ListRecordedInitialRouteNativeStack = {
  initialListRecordedTimesRoutes: undefined;
  editTrack: {
    id: string;
  };
}

const NativeStack = createNativeStackNavigator<ListRecordedInitialRouteNativeStack>();

export default function ListRecordedTimesRoutes() {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <NativeStack.Screen name="initialListRecordedTimesRoutes" component={InitialListRecordedTimes}/>
      <NativeStack.Screen name="editTrack" component={EditTrack}/>
    </NativeStack.Navigator>
  );
}

