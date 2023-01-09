// Modules
import { StatusBar } from 'expo-status-bar';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import {  } from "@react-navigation/native-stack";

// Elements
import ContainerScreen from '../elements/ContainerScreen';

// Components
import ButtonCreateTrack from '../components/ButtonCreateTrack';
import ModalForm from '../components/Form';

// Types
import { InitialRouteNativeStack } from '../App';

type HomeNavigationProp = NavigationProp<InitialRouteNativeStack, "home">;

export default function Home() {
  const navigation = useNavigation<HomeNavigationProp>();

  return (
    <ContainerScreen>
      <StatusBar style="light" />
      <ButtonCreateTrack
        onPress={() => navigation.navigate("registerTrack")}
      />
    </ContainerScreen>
  );
}

