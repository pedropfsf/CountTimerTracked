// Modules
import styled from "styled-components/native";

// Styles
import colors from "../../styles/colors";

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 8px;
`;

export const TextItem = styled.Text`
  color: ${colors.primary_level_8};

  font-size: 20px;
`;