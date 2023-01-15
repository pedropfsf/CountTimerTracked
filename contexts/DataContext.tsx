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
  deleteTimerTrack: (id: string) => void;
};

const DataContext = createContext({} as DataContextProps);

type DataProviderProps = {
  children: JSX.Element | JSX.Element;
}

export function DataProvider({ children }: DataProviderProps) {
  const [listTimerPerMonth, setListTimerPerMonth] = useState([] as TimerPerMonth[]);
  
  const getTimerTrackById = useCallback((id: string) => {
    return listTimerPerMonth.find(item => item.id === id);
  }, [listTimerPerMonth]);

  const addTimerTrack = useCallback((value: TimerPerMonth) => {
    const newData = [...listTimerPerMonth, value];

    setListTimerPerMonth(newData);
    AsyncStorage.setItem("@data", JSON.stringify(newData));
  }, [listTimerPerMonth]);

  const editTimerTrack = useCallback((id: string, value: DataTimerPerMonth) => {
    const newData = listTimerPerMonth.map(oldItem => {
      if (id === oldItem.id) {
        return {
          ...oldItem,
          ...value
        };
      }

      return oldItem;
    });

    setListTimerPerMonth(newData);
    AsyncStorage.setItem("@data", JSON.stringify(newData));
  }, [listTimerPerMonth]);
  
  const deleteTimerTrack = useCallback((id: string) => {
    const newData = listTimerPerMonth.filter(item => item.id !== id);

    setListTimerPerMonth(newData);
    AsyncStorage.setItem("@data", JSON.stringify(newData));
  }, [listTimerPerMonth]);

  const getDataStorage = useCallback(async () => {
    const dataJson = await AsyncStorage.getItem("@data");

    if (dataJson) {
      setListTimerPerMonth(JSON.parse(dataJson));
    }
  }, []);

  console.log(listTimerPerMonth);

  useEffect(() => {
    getDataStorage();
  }, []);

  return (
    <DataContext.Provider value={{
      listTimerPerMonth,
      getTimerTrackById,
      addTimerTrack,
      editTimerTrack,
      deleteTimerTrack,
    }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  return useContext(DataContext);
}