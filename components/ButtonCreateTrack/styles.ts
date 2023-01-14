// Modules
import styled from "styled-components/native";

// Styles
import colors from "../../styles/colors";

// Utils
import AppScreen from "../../utils/AppScreen";

export const AreaPress = styled.TouchableOpacity`
  position: absolute;
  bottom: 84px;
  left: ${(AppScreen.getSizeDimensions("width") / 2) / 1.2}px
`;

export const ButtonArea = styled.View`
  padding: 8px;

  border-radius: 24px;

  background-color: ${colors.primary_level_5};
`;