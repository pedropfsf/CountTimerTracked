import { createContext, useContext, useState } from "react";

type DataContext = {

}

const DataContext = createContext({});

export type TimerPerMonth = {
  monthOfTimer: {
    month: string;
    year: string;
  };
  date: string;
  timer: string;
}

type DataProviderProps = {
  children: JSX.Element | JSX.Element;
}

export function DataProvider({ children }: DataProviderProps) {
  const [listTimerPerMonth, setListTimerPerMonth] = useState([] as TimerPerMonth[]);
  

  return (
    <DataContext.Provider value={{}}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  return useContext(DataContext);
}