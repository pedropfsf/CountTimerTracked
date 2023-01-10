// Modules
import { useMemo } from "react";
import moment from "moment";

// Elements
import { 
  Container, 
  TextProgressTrack, 
  ExtraTimeIndicator, 
  TextMain,
  ExtraTimeIndicatorProps,
  BoxDate
} from "./styles";

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
    const listFormatted = list.map(item => {
      const month = Number(item.date.split("/")[1]);
      const day = Number(item.date.split("/")[0]);
      const year = Number(item.date.split("/")[2]);

      return moment({ year, day, month })
    })


    // console.log(listFormatted);
    // console.log(listFormatted[2].get("month"));
    // console.log(moment())
    // console.log(moment().get("month"));


    // const listFilteredPerCurrentMonth = listFormatted.filter(item => {
    //   return (
    //     moment(item).get("month") == moment().get("month")
    //     &&
    //     moment(item).get("year") == moment().get("year")
    //   )
    // })

    // const dataFirst = listFilteredPerCurrentMonth.sort((a, b) => {
    //   if (a.get("day") > b.get("day")) {
    //     return 1;
    //   }

    //   if (a.get("day") < b.get("day")) {
    //     return -1;
    //   }

    //   return 0;
    // })[0];

    // // Get track total
    // const listMomentTrack = list
    //   .map(({ timer }) => {
    //     const hours = Number(timer.split(":")[0]);
    //     const minutes = Number(timer.split(":")[1]);
    //     const seconds = Number(timer.split(":")[2]);

    //     return Timer.convertTimerInSeconds({ hours, minutes, seconds })
    //   })



    return {
      dateInitial: moment()
    }
  }, [list]);

  return (
    <Container>
      <BoxDate>
        <TextProgressTrack>
          {dataFormatted.dateInitial?.format("L") ?? "**/**/****"}
        </TextProgressTrack>
        <TextProgressTrack style={{ color: colors.primary_level_5 }}>
          Até
        </TextProgressTrack>
        <TextProgressTrack>
          {moment().format("L")}
        </TextProgressTrack>
      </BoxDate>
      <TextMain>32:12:32</TextMain>
      <ExtraTimeIndicator colorStatus="more">
        +02:12:00
      </ExtraTimeIndicator>
    </Container>
  )
}