// Modules
import styled from "styled-components/native";

// Styles
import colors from "../../styles/colors";

export const Container = styled.View`
  width: 100%;
`;

export const Title = styled.Text`
  color: ${colors.primary_level_5};
  
  font-size: 24px;
  font-weight: bold;
`;

export const Content = styled.View`
  overflow: hidden;

  padding-top: 8px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 8px;

  border: 1px solid ${colors.primary_level_7};
  border-radius: 10px;
`;