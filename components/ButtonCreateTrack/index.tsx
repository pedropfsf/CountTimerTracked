// Modules
import { TouchableOpacityProps } from "react-native";

// Elements
import { ButtonArea, AreaPress } from "./styles";

// Icons
import { Entypo } from '@expo/vector-icons';

// Styles
import colors from "../../styles/colors";

export default function ButtonCreateTrack({...props}: TouchableOpacityProps) {
  return (
    <AreaPress {...props}>
      <ButtonArea>
        <Entypo 
          name="plus" 
          size={48} 
          color={colors.white} 
        />
      </ButtonArea>
    </AreaPress>
  )
}