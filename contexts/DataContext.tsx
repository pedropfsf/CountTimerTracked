// Modules
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export type TimerPerMonth = {
  id: string;
  date: string;
  timer: string;
}

type DataTimerPerMonth = Pick<TimerPerMonth, "date" | "timer">;

type DataContextProps = {
  listTimerPerMonth: TimerPerMonth[];
  addTimerTrack: (value: TimerPerMonth) => void;
  editTimerTrack: (id: string, value: DataTimerPerMonth) => void;
  getTimerTrackById: (id: string) => TimerPerMonth | undefined;
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
  }, [listTimerPerMonth]);

  const editTimerTrack = useCallback((id: string, value: DataTimerPerMonth) => {
    const item = listTimerPerMonth.find(item => item.id === id);
    
    if (item) {
      setListTimerPerMonth(listTimerPerMonth.map(oldItem => {
        if (item.id === oldItem.id) {
          return item;
        }

        return oldItem;
      }));
      AsyncStorage.setItem("@data", JSON.stringify(listTimerPerMonth));
    }
  }, [listTimerPerMonth]);
  
  const getTimerTrackById = useCallback((id: string) => {
    return listTimerPerMonth.find(item => item.id === id);
  }, [listTimerPerMonth]);
  
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
      addTimerTrack,
      editTimerTrack,
      getTimerTrackById
    }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  return useContext(DataContext);
}