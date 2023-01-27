// Modules
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens
import HomeRoute from "./routes/HomeRoute";
import ListRecordedTimesRoutes from "./routes/ListRecordedTimesRoutes";

// Contexts
import { DataProvider } from "./contexts/DataContext";

// Styles
import colors from "./styles/colors";

// Icons
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export type InitialRouteBottomTab = {
  home: undefined;
  listRecordedTimes: undefined;
}

const BottomTab = createBottomTabNavigator<InitialRouteBottomTab>();

export default function App() {

  return (
    <NavigationContainer>
      <DataProvider>
        <BottomTab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: colors.primary_level_2,
              position: "absolute",
              bottom: 24,
              left: 24,
              right: 24,
              borderRadius: 8,
              borderTopWidth: 0,
            },
            tabBarShowLabel: false
          }}
        >
          <BottomTab.Screen 
            name="home" 
            component={HomeRoute}
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons 
                  name="md-home" 
                  size={32} 
                  color={focused 
                    ? 
                    colors.primary_level_3 
                    : 
                    colors.primary_level_1
                  }
                />
              ),
            }}
          />
          <BottomTab.Screen 
            name="listRecordedTimes" 
            component={ListRecordedTimesRoutes}
            options={{
              tabBarIcon: ({ focused }) => (
                <MaterialIcons 
                  name="view-list" 
                  size={32} 
                  color={focused 
                    ? 
                    colors.primary_level_3 
                    : 
                    colors.primary_level_1
                  }
                />
              ),
            }}
          />
        </BottomTab.Navigator>
      </DataProvider>
    </NavigationContainer>
  );
}

