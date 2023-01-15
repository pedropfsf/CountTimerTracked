// Modules
import { StatusBar } from 'expo-status-bar';
import { useNavigation, NavigationProp } from "@react-navigation/native";

// Elements
import ContainerScreen from '../elements/ContainerScreen';

// Components
import ButtonCreateTrack from '../components/ButtonCreateTrack';
import CountIndicator from '../components/CountIndicator';

// Types
import { HomeInitialRouteNativeStack } from '../routes/HomeRoute';

// Contexts
import { useData } from '../contexts/DataContext';

type HomeNavigationProp = NavigationProp<HomeInitialRouteNativeStack, "initialHome">;

export default function InitialHome() {
  const navigation = useNavigation<HomeNavigationProp>();
  const { listTimerPerMonth } = useData();

  return (
    <ContainerScreen>
      <StatusBar style="light"/>
      <ButtonCreateTrack
        onPress={() => navigation.navigate("registerTrack")}
      />
      <CountIndicator
        list={listTimerPerMonth}
      />
    </ContainerScreen>
  );
}

