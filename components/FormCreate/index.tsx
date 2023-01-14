// Modules
import { 
  useState, 
  useEffect, 
  useCallback, 
  useRef 
} from "react";

import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming 
} from "react-native-reanimated";

import { 
  Alert, 
  Keyboard, 
  Pressable 
} from "react-native";

import { 
  useNavigation, 
  NavigationProp 
} from "@react-navigation/native";

import moment from "moment";

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
import { HomeInitialRouteNativeStack } from "../../routes/HomeRoute";

// Utils
import ID from "../../utils/ID";

// Styles
import colors from "../../styles/colors";

const ContainerFieldAnimation = Animated.createAnimatedComponent(ContainerField);

const initialData = {
  monthText: "",
  date: "",
  timer: "",
};

const initialFieldsActive = ["month", "date", "timer"];

type RegisterTrackNavigationProp = NavigationProp<HomeInitialRouteNativeStack, "registerTrack">;

export default function FormCreate() {
  const navigation = useNavigation<RegisterTrackNavigationProp>();

  const [fieldData, setFieldData] = useState(initialData);
  const [fieldsActive, setFieldsActive] = useState(initialFieldsActive);

  const fieldDateRef = useRef<any>();
  const fieldTimerRef = useRef<any>();

  const { addTimerTrack } = useData();

  const focusFieldDate = useSharedValue(`${colors.white}50`);
  const focusFieldTimer = useSharedValue(`${colors.white}50`);

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
    if (!fieldData.date.length) {
      return Alert.alert("Preencha o campo de data!!!");
    }

    if (!fieldData.timer.length) {
      return Alert.alert("Preencha o campo de tempo!!!");
    }

    if (!moment(fieldData.date).isValid()) {
      return Alert.alert("Digite uma data válida");
    }

    addTimerTrack({
      id: ID.gerenate(),
      date: fieldData.date,
      timer: fieldData.timer,
    });

    navigation.navigate("initialHome");
  }, [fieldData]);

  const MONTH_DATE_MASK = [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/];
  const MONTH_TIMER_MASK = [/\d/, /\d/, ":", /\d/, /\d/, ":", /\d/, /\d/];

  return (
    <ContentContainer>
      <Fields>
        {
          fieldsActive.includes("date")
          &&
          <Pressable 
            style={{ width: "100%" }}
            onPress={() => {
              if (fieldDateRef.current) {
                fieldDateRef.current.focus();
              }
            }}
          >
            <ContainerFieldAnimation style={stylesFieldDate}>
              <Label>Data (dia/mês/ano)</Label>
              <Field
                ref={fieldDateRef}
                onFocus={() => {
                  setFieldsActive(fieldsActive.filter(field => field === "date"));
                  focusFieldDate.value = colors.white
                }}
                onBlur={() => {
                  setFieldsActive(initialFieldsActive);
                  focusFieldDate.value = `${colors.white}50`
                }}
                mask={MONTH_DATE_MASK}
                value={fieldData.date}
                onChangeText={text => setFieldData({ ...fieldData, date: text })}
                placeholderTextColor={`${colors.white}90`}
                keyboardType="numeric"
              />
            </ContainerFieldAnimation>
          </Pressable>
        }
        <Space/>
        {
          fieldsActive.includes("timer")
          &&
          <Pressable 
            style={{ width: "100%" }}
            onPress={() => {
              if (fieldTimerRef.current) {
                fieldTimerRef.current.focus();
              }
            }}
          >
            <ContainerFieldAnimation style={stylesFieldTimer}>
              <Label>Tempo registrado</Label>
              <Field
                ref={fieldTimerRef}
                onFocus={() => {
                  setFieldsActive(fieldsActive.filter(field => field === "timer"));
                  focusFieldTimer.value = colors.white
                }}
                onBlur={() => {
                  setFieldsActive(initialFieldsActive);
                  focusFieldTimer.value = `${colors.white}50`
                }}
                mask={MONTH_TIMER_MASK}
                value={fieldData.timer}
                onChangeText={text => setFieldData({ ...fieldData, timer: text })}
                placeholderTextColor={`${colors.white}90`}
                keyboardType="numeric"
              />
            </ContainerFieldAnimation>
          </Pressable>
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