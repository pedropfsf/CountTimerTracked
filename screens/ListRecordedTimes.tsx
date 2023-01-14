// Modules
import { useMemo } from "react";
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
import moment from "moment";

type ListRecordedTimesNavigationProp = NavigationProp<InitialRouteBottomTab, "listRecordedTimes">;

export default function ListRecordedTimes() {
  const { listTimerPerMonth } = useData();
  const navigation = useNavigation<ListRecordedTimesNavigationProp>();

  const dataFormatted = useMemo(() => {
    let data = [];
    let currentMonthLoop: any;
    
    for(const index in listTimerPerMonth) {
      const item = listTimerPerMonth[index];

      currentMonthLoop = moment(item.date, "DD/MM/YYYY").month();

      const listTimerOfMonth = listTimerPerMonth
        .filter(({ date }) => moment(date, "DD/MM/YYYY").month() === currentMonthLoop)
        .map(item => ({
          day: item.date.split("/")[0].replace(/0/, ""),
          timer: item.timer
        }))
    }

  }, [listTimerPerMonth]);

  console.log(listTimerPerMonth);

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

