// Modules
import styled from "styled-components/native";

// Styles
import colors from "../../styles/colors";

export const Container = styled.View`
  border: 1px solid ${colors.white};

  justify-content: center;

  border-radius: 24px;

  padding-bottom: 24px;
`;

export const TextProgressTrack = styled.Text`
  text-align: center;
  
  font-size: 24px;

  color: ${colors.white};
`;

export const TextMain = styled.Text`
  text-align: center;
  
  font-size: 32px;
  
  color: ${colors.primary_level_5};

  margin-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
`;

export type ExtraTimeIndicatorProps = {
  colorStatus?: "more" | "less" | "none";
}

export const ExtraTimeIndicator = styled.Text<ExtraTimeIndicatorProps>`
  text-align: center;
  
  color: ${props => {
    if (props.colorStatus === "more") {
      return "green";

    } else if (props.colorStatus === "less") {
      return "red";

    } else {
      return colors.white;
    }
  }};
`;

export const BoxDate = styled.View`
  padding: 24px;

  border-bottom-color: ${colors.white};
  border-bottom-width: 2px;
`;