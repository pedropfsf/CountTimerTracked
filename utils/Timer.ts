type ConvertTimerInSecondsProps = {
  hours: number;
  minutes: number;
  seconds: number;
};

class Timer {
  static convertTimerInSeconds({
    hours,
    minutes,
    seconds
  }: ConvertTimerInSecondsProps): number {
    const hoursConvertted = 60 * 60 * hours;
    const minutesConvertted = 60 * minutes;

    return hoursConvertted + minutesConvertted + seconds;
  }

  static convertSecondsInTimer(value: number, isSignal: boolean = false) {
    const typeSignal = value > 0 ? "+" : "-";
    const totalSeconds = Math.abs(value);
    const hour = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - (hour * 3600)) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    function increment0(value: number) {
        return value > 9 ? value : `0${value}`;
    }

    return `${isSignal ? typeSignal : ""}${increment0(hour)}:${increment0(minutes)}:${increment0(seconds)}`;
  }
};

export default Timer;