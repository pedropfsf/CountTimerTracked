// Modules
import { 
  createContext, 
  useContext, 
  useState, 
  useCallback, 
  useEffect,
  useMemo
} from "react";
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
  const [listTimerPerMonth, setListTimerPerMonth] = useState<TimerPerMonth[]>([]);
  
  const dataJson = useMemo(() => 
    JSON.stringify(listTimerPerMonth), 
  [listTimerPerMonth]);

  const getTimerTrackById = useCallback((id: string) => {
    return listTimerPerMonth.find(item => item.id === id);
  }, [listTimerPerMonth]);

  const addTimerTrack = useCallback((value: TimerPerMonth) => {
    const newData = [...listTimerPerMonth, value];

    setListTimerPerMonth(newData);
  }, [
    listTimerPerMonth,
    setListTimerPerMonth
  ]);

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
  }, [
    listTimerPerMonth,
    setListTimerPerMonth
  ]);
  
  const deleteTimerTrack = useCallback((id: string) => {
    const newData = [ ...listTimerPerMonth ];
    const dataFiltered = [];

    for(const item of newData) {
      if (item.id !== id) {
        dataFiltered.push(item);
      } else {
        continue
      }
    }

    setListTimerPerMonth(dataFiltered);
  }, [
    listTimerPerMonth, 
    setListTimerPerMonth
  ]);

  const getDataStorage = useCallback(async () => {
    const dataJson = await AsyncStorage.getItem("@data");

    if (dataJson) {
      setListTimerPerMonth(JSON.parse(dataJson));
    }
  }, [setListTimerPerMonth]);

  useEffect(() => {
    getDataStorage();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("@data", dataJson);
  }, [listTimerPerMonth.length]);

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