// Modules
import { useMemo } from "react";
import moment from "moment";

// Elements
import { 
  Container, 
  TextProgressTrack, 
  ExtraTimeIndicator, 
  TextMain,
  BoxDate,
  ExtraTimeIndicatorProps
} from "./styles";

// Types 
import { TimerPerMonth } from "../../contexts/DataContext";

// Utils
import Timer from "../../utils/Timer";

type CountIndicatorProps = {
  list: TimerPerMonth[];
}

export default function CountIndicator({ list }: CountIndicatorProps) {
  const dataFormatted = useMemo(() => {
    const listCurrentMonth = list
    .filter(timer => (
      moment(timer.date, "DD/MM/YYYY").get("month") == moment().get("month")
      &&
      moment(timer.date, "DD/MM/YYYY").get("year") == moment().get("year")
    ));

    const listCurrentMonthSet = new Set();    
    for(const item of listCurrentMonth) {
      const day = moment(item.date, "DD/MM/YYYY").date();
      listCurrentMonthSet.add(day);
    }

    const listTimers = listCurrentMonth
      .map(({ timer }) => {
        const hours = Number(timer.split(":")[0]);
        const minutes = Number(timer.split(":")[1]);
        const seconds = Number(timer.split(":")[2]);

        return Timer.convertTimerInSeconds({ hours, minutes, seconds })
      });

    const totalTimerCurrent = listTimers.length && listTimers
      .reduce((previousValue, currentValue) => (previousValue ?? 0) + (currentValue ?? 0));
    const totalCreatePerDay = (listCurrentMonthSet.size * 8) * 3600;
    const necessaryTimer = totalTimerCurrent - totalCreatePerDay;

    return {
      currentDate: moment().format("MM/YYYY"),
      totalCurrent: Timer.convertSecondsInTimer(totalTimerCurrent),
      necessaryTimer,
    }
  }, [list]);

  const colorNecessaryTimer: ExtraTimeIndicatorProps["colorStatus"] = useMemo(() => {
    if (dataFormatted.necessaryTimer > 0) {
      return "more";
    } 
   
    if (dataFormatted.necessaryTimer < 0) {
      return "less";
    } 

    if (dataFormatted.necessaryTimer === 0) {
      return "none";
    }

    return undefined;
  }, [dataFormatted]);

  return (
    <Container>
      <BoxDate>
        <TextProgressTrack>
          {dataFormatted.currentDate ?? "MM/YYYY"}
        </TextProgressTrack>
      </BoxDate>
      <TextMain>{dataFormatted.totalCurrent ?? "00:00:00"}</TextMain>
      <ExtraTimeIndicator colorStatus={colorNecessaryTimer}>
        {Timer.convertSecondsInTimer(dataFormatted.necessaryTimer, colorNecessaryTimer !== "none")}
      </ExtraTimeIndicator>
    </Container>
  )
}