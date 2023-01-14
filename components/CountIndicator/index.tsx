// Modules
import { useMemo } from "react";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Elements
import { 
  Container, 
  TextProgressTrack, 
  ExtraTimeIndicator, 
  TextMain,
  ExtraTimeIndicatorProps,
  BoxDate
} from "./styles";
import { Button } from "react-native";

// Types
import { TimerPerMonth } from "../../contexts/DataContext";

// Utils
import colors from "../../styles/colors";
import Timer from "../../utils/Timer";

type CountIndicatorProps = {
  list: TimerPerMonth[];
}

export default function CountIndicator({ list }: CountIndicatorProps) {
  // console.log(new Date().);

  const dataFormatted = useMemo(() => {
    // Get the first recorded date
    // const listFormatted = list.map(item => {
    //   const month = Number(item.date.split("/")[1]);
    //   const day = Number(item.date.split("/")[0]);
    //   const year = Number(item.date.split("/")[2]);

    //   return moment(`${month}-${day}-${year}`, "MM-DD-YYYY");
    // })

    // const listFilteredPerCurrentMonth = listFormatted.filter(item => {
    //   return (
    //     moment(item).get("month") == moment().get("month")
    //     &&
    //     moment(item).get("year") == moment().get("year")
    //   )
    // })

    // const dataFirst = listFilteredPerCurrentMonth
    //   .sort((a, b) => {
    //     if (a.get("day") > b.get("day")) {
    //       return 1;
    //     }

    //     if (a.get("day") < b.get("day")) {
    //       return -1;
    //     }

    //     return 0;
    //   })[0]

    // // Get track total
    const listTimers = list
      .filter(timer => (
        moment(timer.date).get("month") == moment().get("month")
        &&
        moment(timer.date).get("year") == moment().get("year")
      ))
      .map(({ timer }) => {
        const hours = Number(timer.split(":")[0]);
        const minutes = Number(timer.split(":")[1]);
        const seconds = Number(timer.split(":")[2]);

        return Timer.convertTimerInSeconds({ hours, minutes, seconds })
      })
    
    // for(const count in listTimers) {
    //   console.log(count + 1, listTimers[count])
    // }

    const totalTimerCurrent = listTimers.length && listTimers
      .reduce((previousValue, currentValue) => (previousValue ?? 0) + (currentValue ?? 0));
    const totalCreatePerDay = (listTimers.length * 8) * 3600;
    const necessaryTimer = totalTimerCurrent - totalCreatePerDay;

    // console.log("total que tem que fazer no mês atualmente", Timer.convertSecondsInTimer(totalCreatePerDay));
    // console.log("O que você fez no mês", Timer.convertSecondsInTimer(totalTimerCurrent));
    // console.log("O que sobrou", Timer.convertSecondsInTimer(necessaryTimer))
    // console.log(listTimers);
    // console.log("total que tem que fazer no mês atualmente", totalCreatePerDay);
    // console.log("O que você fez no mês", totalTimerCurrent);
    // console.log("O que sobrou" , necessaryTimer)

    return {
      currentDate: moment().format("MM/YYYY"),
      totalCurrent: Timer.convertSecondsInTimer(totalTimerCurrent),
      necessaryTimer,
    }
  }, [list]);

  console.log("fora", dataFormatted.necessaryTimer)

  return (
    <Container>
      <BoxDate>
        <TextProgressTrack>
          {dataFormatted.currentDate ?? "MM/YYYY"}
        </TextProgressTrack>
      </BoxDate>
      <TextMain>{dataFormatted.totalCurrent ?? "00:00:00"}</TextMain>
      <ExtraTimeIndicator colorStatus={dataFormatted.necessaryTimer > 0 ? "more" : "less"}>
        {Timer.convertSecondsInTimer(dataFormatted.necessaryTimer, true)}
      </ExtraTimeIndicator>
      <Button
        title="Limpar"
        onPress={() => AsyncStorage.clear()}
      />
    </Container>
  )
}