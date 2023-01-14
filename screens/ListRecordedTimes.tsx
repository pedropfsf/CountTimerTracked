// Modules
import { useNavigation, NavigationProp } from "@react-navigation/native";

// Components
import SectionDate from '../components/SectionDate';
import ItemDate from "../components/ItemDate";

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
      <SectionDate dateLabel="10/2010">
        <ItemDate
          day={2}
          timer="12:23:12"
        />
        <ItemDate
          day={3}
          timer="15:23:12"
        />
      </SectionDate>
    </ContainerScreen>
  );
}

