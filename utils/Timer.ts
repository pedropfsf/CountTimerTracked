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
};

export default Timer;