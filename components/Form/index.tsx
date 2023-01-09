// Modules
import { useState } from "react";
import colors from "../../styles/colors";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

// Elements
import { 
  ButtonArea,
  ButtonTitle, 
  ContainerField, 
  Field, 
  Label,
  ActionForm,
  ContentContainer,
  Fields,
  Space,
  PressButton
} from "./styles";

const ContainerFieldAnimation = Animated.createAnimatedComponent(ContainerField);

const initialData = {
  monthText: "",
  date: "",
  timer: "",
};

export default function Form() {
  const [fieldData, setFieldData] = useState(initialData);

  const focusFieldMonth = useSharedValue(`${colors.white}50`);
  const focusFieldDate = useSharedValue(`${colors.white}50`);
  const focusFieldTimer = useSharedValue(`${colors.white}50`);

  const stylesFieldMonth = useAnimatedStyle(() => ({  
    borderColor: withTiming(focusFieldMonth.value),
  }), [focusFieldDate]);

  const stylesFieldDate = useAnimatedStyle(() => ({  
    borderColor: withTiming(focusFieldDate.value),
  }), [focusFieldDate]);
  
  const stylesFieldTimer = useAnimatedStyle(() => ({  
    borderColor: withTiming(focusFieldTimer.value),
  }), [focusFieldTimer]);

  return (
    <ContentContainer>
      <Fields>
        <ContainerFieldAnimation style={stylesFieldMonth}>
          <Label>Mês desse registro de tempo</Label>
          <Field
            onFocus={() => focusFieldMonth.value = colors.white}
            onBlur={() => focusFieldMonth.value = `${colors.white}50`}
            value={fieldData.monthText}
          />
        </ContainerFieldAnimation>
        <Space/>
        <ContainerFieldAnimation style={stylesFieldDate}>
          <Label>Data</Label>
          <Field
            onFocus={() => focusFieldDate.value = colors.white}
            onBlur={() => focusFieldDate.value = `${colors.white}50`}
          />
        </ContainerFieldAnimation>
        <Space/>
        <ContainerFieldAnimation style={stylesFieldTimer}>
          <Label>Tempo registrado</Label>
          <Field
          onFocus={() => focusFieldTimer.value = colors.white}
          onBlur={() => focusFieldTimer.value = `${colors.white}50`}
          />
        </ContainerFieldAnimation>
      </Fields>
      <ActionForm>
        <PressButton>
          <ButtonArea>
            <ButtonTitle>
              Cadastrar
            </ButtonTitle>
          </ButtonArea>
        </PressButton>
      </ActionForm>
    </ContentContainer>
  )
}