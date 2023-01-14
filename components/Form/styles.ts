// Modules
import styled from "styled-components/native";
import MaskInput from "react-native-mask-input";

// Styles
import colors from "../../styles/colors";

export const ContentContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  
  width: 100%;

  margin-bottom: 64px;
`;

export const PressButton = styled.TouchableOpacity`
  width: 100%;
`;

export const ButtonArea = styled.View`
  background-color: ${colors.primary_level_5};

  padding: 16px;

  border-radius: 16px;

  width: 100%;

  justify-content: center;
  align-items: center;
`;

export const ButtonTitle = styled.Text`
  color: ${colors.black};
  
  font-size: 24px;
  font-weight: bold;
`;

export const Fields = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  
  width: 100%;
`;

export const ContainerField = styled.View`
  padding: 12px;

  border-width: 2px;

  border-radius: 16px;

  width: 100%;

  position: relative;
`;

export const Field = styled(MaskInput)`
  font-size: 24px;

  color: ${colors.white};
`;

export const Label = styled.Text`
  color: ${colors.primary_level_5};
  background-color: ${colors.primary_level_1};
  
  padding: 8px;

  border-radius: 16px;

  font-weight: bold;

  position: absolute;
  top: -60%;
  left: 16px;
`;

export const ActionForm = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

export const Space = styled.View`
  width: 1px;
  height: 24px;
`;

export const IconArea = styled.View`
  padding-right: 16px;
  padding-left: 16px;
`;