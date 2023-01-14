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
  BoxDate
} from "./styles";
import { Button } from "react-native";

// Types 
import { TimerPerMonth } from "../../contexts/DataContext";

// Utils
import Timer from "../../utils/Timer";

type CountIndicatorProps = {
  list: TimerPerMonth[];
}

export default function CountIndicator({ list }: CountIndicatorProps) {
  const dataFormatted = useMemo(() => {
    const listTimers = list
      .filter(timer => (
        moment(timer.date, "DD/MM/YYYY").get("month") == moment().get("month")
        &&
        moment(timer.date, "DD/MM/YYYY").get("year") == moment().get("year")
      ))
      .map(({ timer }) => {
        const hours = Number(timer.split(":")[0]);
        const minutes = Number(timer.split(":")[1]);
        const seconds = Number(timer.split(":")[2]);

        return Timer.convertTimerInSeconds({ hours, minutes, seconds })
      })
  

    const totalTimerCurrent = listTimers.length && listTimers
      .reduce((previousValue, currentValue) => (previousValue ?? 0) + (currentValue ?? 0));
    const totalCreatePerDay = (listTimers.length * 8) * 3600;
    const necessaryTimer = totalTimerCurrent - totalCreatePerDay;

    return {
      currentDate: moment().format("MM/YYYY"),
      totalCurrent: Timer.convertSecondsInTimer(totalTimerCurrent),
      necessaryTimer,
    }
  }, [list]);

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
      {/* <Button
        title="Limpar"
        onPress={() => AsyncStorage.clear()}
      /> */}
    </Container>
  )
}