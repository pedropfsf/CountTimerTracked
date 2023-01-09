import { createContext, useContext, useState, useCallback } from "react";

export type TimerPerMonth = {
  monthOfTimer: {
    month: string;
    year: string;
  };
  date: string;
  timer: string;
}

type DataContextProps = {
  listTimerPerMonth: TimerPerMonth[];
  addTimerTrack: (value: TimerPerMonth) => void;
};

const DataContext = createContext({} as DataContextProps);

type DataProviderProps = {
  children: JSX.Element | JSX.Element;
}

export function DataProvider({ children }: DataProviderProps) {
  const [listTimerPerMonth, setListTimerPerMonth] = useState([] as TimerPerMonth[]);
  
  const addTimerTrack = useCallback((value: TimerPerMonth) => {
    setListTimerPerMonth([...listTimerPerMonth, value]);
  }, [listTimerPerMonth])

  return (
    <DataContext.Provider value={{
      listTimerPerMonth,
      addTimerTrack
    }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  return useContext(DataContext);
}