// Modules
import { StatusBar } from 'expo-status-bar';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import {  } from "@react-navigation/native-stack";

// Elements
import ContainerScreen from '../elements/ContainerScreen';

// Types
import { InitialRouteBottomTab } from '../App';

// Contexts
import { useData } from '../contexts/DataContext';

type ListRecordedTimesNavigationProp = NavigationProp<InitialRouteBottomTab, "listRecordedTimes">;

export default function ListRecordedTimes() {
  const { listTimerPerMonth } = useData();
  const navigation = useNavigation<ListRecordedTimesNavigationProp>();

  return (
    <ContainerScreen>


    </ContainerScreen>
  );
}

