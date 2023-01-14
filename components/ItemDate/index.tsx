// Modules
import { Container, TextItem } from "./styles";

// Components
import { TouchableOpacity } from "react-native";

// Icons
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

// Styles
import colors from "../../styles/colors";

type ItemDateProps = {
  day: number;
  timer: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function ItemDate({ day, timer, onEdit, onDelete }: ItemDateProps) {
  return (
    <Container>
      <TextItem>Dia {day}</TextItem>
      <TextItem>{timer}</TextItem>
      <TouchableOpacity onPress={onEdit}>
        <Feather 
          name="edit-2" 
          size={32} 
          color={colors.primary_level_5} 
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        <MaterialIcons 
          name="delete-outline" 
          size={32} 
          color={colors.danger} 
        />
      </TouchableOpacity>
    </Container>
  )
} 