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
};

export default function ItemDate({ day, timer }: ItemDateProps) {
  return (
    <Container>
      <TextItem>Dia {day}</TextItem>
      <TextItem>{timer}</TextItem>
      <TouchableOpacity>
        <Feather 
          name="edit-2" 
          size={32} 
          color={colors.primary_level_5} 
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <MaterialIcons 
          name="delete-outline" 
          size={32} 
          color={colors.danger} 
        />
      </TouchableOpacity>
    </Container>
  )
} 