// Modules
import { useState, useEffect, useCallback } from "react";
import colors from "../../styles/colors";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { Keyboard } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

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

// Contexts
import { useData } from "../../contexts/DataContext";

// Types
import { InitialRouteNativeStack } from "../../App";

const ContainerFieldAnimation = Animated.createAnimatedComponent(ContainerField);

const initialData = {
  monthText: "",
  date: "",
  timer: "",
};

const initialFieldsActive = ["month", "date", "timer"];

type RegisterTrackNavigationProp = NavigationProp<InitialRouteNativeStack, "registerTrack">;

export default function Form() {
  const navigation = useNavigation<RegisterTrackNavigationProp>();

  const [fieldData, setFieldData] = useState(initialData);
  const [fieldsActive, setFieldsActive] = useState(initialFieldsActive);
  const { addTimerTrack } = useData();

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

  useEffect(() => {
    const eventHiddenKeyboard = Keyboard.addListener("keyboardDidHide", () => {
      setFieldsActive(initialFieldsActive);
    });

    return () => {
      eventHiddenKeyboard.remove()
    }
  }, []);

  const registerTimerTrack = useCallback(() => {
    addTimerTrack({
      monthOfTimer: {
        month: fieldData.monthText.split("/")[0],
        year: fieldData.monthText.split("/")[1],
      },
      date: fieldData.date,
      timer: fieldData.timer,
    });

    navigation.navigate("home");
  }, [fieldData]);

  return (
    <ContentContainer>
      <Fields>
        {
          fieldsActive.includes("month")
          &&
          <ContainerFieldAnimation style={stylesFieldMonth}>
            <Label>Mês desse registro de tempo</Label>
            <Field
              onFocus={() => {
                setFieldsActive(fieldsActive.filter(field => field === "month"));
                focusFieldMonth.value = colors.white;
              }}
              onBlur={() => {
                setFieldsActive(initialFieldsActive);
                focusFieldMonth.value = `${colors.white}50`;
              }}
              value={fieldData.monthText}
            />
          </ContainerFieldAnimation>
        }
        <Space/>
        {
          fieldsActive.includes("date")
          &&
          <ContainerFieldAnimation style={stylesFieldDate}>
            <Label>Data</Label>
            <Field
              onFocus={() => {
                setFieldsActive(fieldsActive.filter(field => field === "date"));
                focusFieldDate.value = colors.white
              }}
              onBlur={() => {
                setFieldsActive(initialFieldsActive);
                focusFieldDate.value = `${colors.white}50`
              }}
            />
          </ContainerFieldAnimation>
        }
        <Space/>
        {
          fieldsActive.includes("timer")
          &&
          <ContainerFieldAnimation style={stylesFieldTimer}>
            <Label>Tempo registrado</Label>
            <Field
              onFocus={() => {
                setFieldsActive(fieldsActive.filter(field => field === "timer"));
                focusFieldTimer.value = colors.white
              }}
              onBlur={() => {
                setFieldsActive(initialFieldsActive);
                focusFieldTimer.value = `${colors.white}50`
              }}
            />
          </ContainerFieldAnimation>
        }
      </Fields>
      <ActionForm>
        <PressButton onPress={registerTimerTrack}>
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