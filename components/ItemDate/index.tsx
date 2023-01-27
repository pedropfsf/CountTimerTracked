// Modules
import { useCallback } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";

// Components
import { 
  Container, 
  TextItem, 
  Buttons 
} from "./styles";
import { TouchableOpacity } from "react-native";

// Contexts
import { useData } from "../../contexts/DataContext";

// Icons
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

// Styles
import colors from "../../styles/colors";

// Types
import { ListRecordedInitialRouteNativeStack } from "../../routes/ListRecordedTimesRoutes";

type ListRecoredNavigationProp = NavigationProp<ListRecordedInitialRouteNativeStack, "initialListRecordedTimesRoutes">;

type ItemDateProps = {
  id: string;
  day: number;
  timer: string;
};

export default function ItemDate({ id, day, timer }: ItemDateProps) {
  const { deleteTimerTrack } = useData();
  
  const navigation = useNavigation<ListRecoredNavigationProp>();

  const handleEdit = useCallback(() => {
    navigation.navigate("editTrack", { id })
  }, [
    id,
    navigation,
  ]);

  const handleDelete = useCallback(() => {
    deleteTimerTrack(id);
  }, [
    id,
    deleteTimerTrack,
  ]);

  return (
    <Container>
      <TextItem>Dia {day}</TextItem>
      <TextItem>{timer}</TextItem>
      <Buttons>
        <TouchableOpacity 
          onPress={handleEdit} 
          style={{ marginRight: 8 }}
        >
          <Feather 
            name="edit-2" 
            size={32} 
            color={colors.primary_level_7} 
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete}>
          <MaterialIcons 
            name="delete-outline" 
            size={32} 
            color={colors.danger} 
          />
        </TouchableOpacity>
      </Buttons>
    </Container>
  )
} 