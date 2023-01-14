// Modules
import { useMemo } from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";

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
import moment from "moment";

type ListRecordedTimesNavigationProp = NavigationProp<InitialRouteBottomTab, "listRecordedTimes">;

export default function ListRecordedTimes() {
  const { listTimerPerMonth } = useData();
  const navigation = useNavigation<ListRecordedTimesNavigationProp>();

  const dataFormatted = useMemo(() => {
    let data = [];
    let currentMonthLoop: any;
    let oldMonthLoop: any;
    let currentYearLoop: any;
    let oldYearLoop: any;
    
    for(const index in listTimerPerMonth) {
      const item = listTimerPerMonth[index];

      currentMonthLoop = moment(item.date, "DD/MM/YYYY").month();
      currentYearLoop = moment(item.date, "DD/MM/YYYY").year();

      const isRepeat = (
        currentMonthLoop === oldMonthLoop 
        &&
        currentYearLoop === oldYearLoop 
      )

      if (isRepeat) {
        break;
      }

      const listTimerPerSection = listTimerPerMonth
        .filter(({ date }) => moment(date, "DD/MM/YYYY").month() === currentMonthLoop)
        .map(item => ({
          day: item.date.split("/")[0].replace(/0/, ""),
          timer: item.timer
        }))

        const titleSectionDate = moment(item.date, "DD/MM/YYYY").format("MM/YYYY");

        data.push({
          titleSectionDate,
          listTrack: listTimerPerSection
        });

        oldMonthLoop = currentMonthLoop;
        oldYearLoop = currentYearLoop;
    }

    return data;
  }, [listTimerPerMonth]);

  console.log(listTimerPerMonth);

  return (
    <ContainerScreen>
      <Scroll>
        {
          dataFormatted.map(({ titleSectionDate, listTrack }) => (
            <SectionDate dateLabel={titleSectionDate} key={titleSectionDate}>
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

