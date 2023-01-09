// Modules
import styled from "styled-components/native";

// Utils
import AppScreen from "../utils/AppScreen";

// Styles
import colors from "../styles/colors";

const ContainerScreen = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;

  padding-top: ${AppScreen.getHeightStatusBar() + 24}px;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 24px;

  background-color: ${colors.primary_level_1};
`;

export default ContainerScreen;