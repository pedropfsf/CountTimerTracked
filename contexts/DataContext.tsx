// Modules
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export type TimerPerMonth = {
  id: string;
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
    AsyncStorage.setItem("@data", JSON.stringify(listTimerPerMonth));
  }, [listTimerPerMonth])
  
  const getDataStorage = useCallback(async () => {
    const dataJson = await AsyncStorage.getItem("@data");

    if (dataJson) {
      setListTimerPerMonth(JSON.parse(dataJson));
    }
  }, []);

  useEffect(() => {
    getDataStorage();
  }, []);

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