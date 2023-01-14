// Modules
import { useMemo } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import moment from "moment";

// Components
import SectionDate from '../components/SectionDate';
import ItemDate from "../components/ItemDate";

// Elements
import ContainerScreen from '../elements/ContainerScreen';
import Scroll from '../elements/Scroll';

// Types
import { InitialRouteBottomTab } from '../App';

// Contexts
import { useData } from '../contexts/DataContext';

// Utils
import AppScreen from "../utils/AppScreen";

type ListRecordedTimesNavigationProp = NavigationProp<InitialRouteBottomTab, "listRecordedTimes">;

export default function ListRecordedTimes() {
  const { listTimerPerMonth } = useData();
  const navigation = useNavigation<ListRecordedTimesNavigationProp>();
  
  const dataFormatted = useMemo(() => {
    let data = [];
    const listSet = new Set();
    
    for(const index in listTimerPerMonth) {
      const item = listTimerPerMonth[index];
      
      const titleSectionDate = moment(item.date, "DD/MM/YYYY").format("MM/YYYY");
      const currentMonthLoop = moment(item.date, "DD/MM/YYYY").month();

      const isDuplicated = listSet.has(titleSectionDate);
      listSet.add(titleSectionDate);
      
      if (isDuplicated) {
        continue;
      }

      const listTimerPerSection = listTimerPerMonth
        .filter(({ date }) => moment(date, "DD/MM/YYYY").month() === currentMonthLoop)
        .map(item => ({
          day: item.date.split("/")[0].replace(/0/, ""),
          timer: item.timer
        }))

      data.push({
        titleSectionDate,
        listTrack: listTimerPerSection
      });
    }

    return data;
  }, [listTimerPerMonth]);

  return (
    <ContainerScreen 
      style={{ 
        paddingTop: AppScreen.getHeightStatusBar(),
        paddingLeft: 0, 
        paddingRight: 0, 
        paddingBottom: 84 
      }}
    >
      <Scroll showsVerticalScrollIndicator={false}>
        {
          dataFormatted.map(({ titleSectionDate, listTrack }, index) => (
            <SectionDate dateLabel={titleSectionDate} key={index}>
              {
                listTrack.map(({ day, timer }, index) => (
                  <ItemDate
                    day={Number(day)}
                    timer={timer}
                    key={index}
                  />
                ))
              }
            </SectionDate>
          ))
        }
      </Scroll>
    </ContainerScreen>
  );
}

