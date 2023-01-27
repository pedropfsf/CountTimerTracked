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

// Contexts
import { useData } from '../contexts/DataContext';

// Utils
import AppScreen from "../utils/AppScreen";

export default function InitialListRecordedTimes() {
  const { listTimerPerMonth } = useData();
  
  const dataFormatted = useMemo(() => {
    let data = [];
    const listSet = new Set();
    
    for(const index in listTimerPerMonth) {
      const item = listTimerPerMonth[index];
      
      const titleSectionDate = moment(item.date, "DD/MM/YYYY").format("MM/YYYY");
      const currentMonthLoop = moment(item.date, "DD/MM/YYYY").month();
      const currentYearLoop = moment(item.date, "DD/MM/YYYY").year();

      const isDuplicated = listSet.has(titleSectionDate);
      listSet.add(titleSectionDate);
      
      if (isDuplicated) {
        continue;
      }

      const listTimerPerSection = listTimerPerMonth
        .filter(({ date }) => (
          moment(date, "DD/MM/YYYY").month() === currentMonthLoop
          &&
          moment(date, "DD/MM/YYYY").year() === currentYearLoop
        ))
        .map(item => ({
          id: item.id,
          day: item.date.split("/")[0],
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
            <SectionDate 
              dateLabel={titleSectionDate} 
              key={index}
            >
              {
                listTrack.map(({ id, day, timer }) => (
                  <ItemDate
                    id={id}
                    day={Number(day)}
                    timer={timer}
                    key={id}
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

