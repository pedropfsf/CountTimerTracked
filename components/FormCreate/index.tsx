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
  Pressable,
  TouchableOpacity,
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
  PressButton,
  Box,
  ButtonSecondary
} from "./styles";
import Title from "../../elements/Title";

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

const initialFieldsActive = ["date", "timer"];

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

  const removeFocusFields = useCallback(() => {
    setFieldsActive(initialFieldsActive);
    focusFieldDate.value = `${colors.white}50`;
    focusFieldTimer.value = `${colors.white}50`;
  }, [
    initialFieldsActive,
    focusFieldDate,
    focusFieldTimer,
    colors
  ]);

  useEffect(() => {
    const eventHiddenKeyboard = Keyboard.addListener("keyboardDidHide", removeFocusFields);

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

    if (!moment(fieldData.date, "DD/MM/YYYY").isValid()) {
      return Alert.alert("Digite uma data válida");
    }

    if (!moment(fieldData.timer, "kk:mm:ss").isValid()) {
      return Alert.alert("Digite um registro de tempo válido");
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

  console.log(fieldsActive);

  return (
    <ContentContainer>
      {
        fieldsActive.length === 2
        &&
        <Title>Cadastrar registro de tempo</Title>
      }
      <Fields>
        {
          fieldsActive.includes("date")
          &&
          <>
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
                  onPressIn={() => {
                    setFieldsActive(fieldsActive.filter(field => field === "date"));
                    focusFieldDate.value = colors.white
                  }}
                  mask={MONTH_DATE_MASK}
                  value={fieldData.date}
                  onChangeText={text => setFieldData({ ...fieldData, date: text })}
                  placeholderTextColor={`${colors.white}90`}
                  keyboardType="numeric"
                />
              </ContainerFieldAnimation>
            </Pressable>
            <Space height={10}/>
            <Box>
              <TouchableOpacity
                onPress={() => {
                  setFieldData({
                    ...fieldData,
                    date: moment().format("DD/MM/YYYY")
                  });
                  
                  setFieldsActive(fieldsActive.filter(field => field === "date"));
                  
                  focusFieldDate.value = colors.white
                  
                  if (fieldDateRef.current) {
                    fieldDateRef.current.focus();
                  }
                }}
              >
                <ButtonSecondary>
                  Usar data atual
                </ButtonSecondary>
              </TouchableOpacity>
            </Box>
          </>
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
                onPressIn={() => {
                  setFieldsActive(fieldsActive.filter(field => field === "timer"));
                  focusFieldTimer.value = colors.white
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
      {
        fieldsActive.length === 2
        ?
        <PressButton onPress={registerTimerTrack}>
          <ButtonArea>
            <ButtonTitle>
              Cadastrar
            </ButtonTitle>
          </ButtonArea>
        </PressButton>
        :
        <PressButton onPress={() => {
          removeFocusFields();
          Keyboard.dismiss()
        }}>
          <ButtonArea backgroundColor={colors.primary_level_8}>
            <ButtonTitle>
              Mostrar todos os campos
            </ButtonTitle>
          </ButtonArea>
        </PressButton>
      }
      </ActionForm>
    </ContentContainer>
  )
}