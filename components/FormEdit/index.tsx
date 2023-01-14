// Modules
import { useState, useEffect, useCallback } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { Alert, Keyboard } from "react-native";
import { useNavigation, useRoute, NavigationProp, RouteProp  } from "@react-navigation/native";
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
import { ListRecordedInitialRouteNativeStack } from "../../routes/ListRecordedTimesRoutes";

// Utils
import ID from "../../utils/ID";

// Styles
import colors from "../../styles/colors";

const ContainerFieldAnimation = Animated.createAnimatedComponent(ContainerField);

const initialData = {
  date: "",
  timer: "",
};

const initialFieldsActive = ["month", "date", "timer"];

type RegisterTrackNavigationProp = NavigationProp<ListRecordedInitialRouteNativeStack, "editTrack">;
type RegisterTrackRouteProp = RouteProp<ListRecordedInitialRouteNativeStack, "editTrack">;

export default function FormEdit() {
  const navigation = useNavigation<RegisterTrackNavigationProp>();
  const route = useRoute<RegisterTrackRouteProp>();

  const [fieldData, setFieldData] = useState(initialData);
  const [fieldsActive, setFieldsActive] = useState(initialFieldsActive);
  const { 
    addTimerTrack, 
    getTimerTrackById, 
    editTimerTrack 
  } = useData();

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

    const data = getTimerTrackById(route.params.id);

    setFieldData({
      date: data?.date ?? "",
      timer: data?.timer ?? "",
    });

    return () => {
      eventHiddenKeyboard.remove()
    }
  }, []);

  const handleEditTimerTrack = useCallback(() => {
    if (!fieldData.date.length) {
      return Alert.alert("Preencha o campo de data!!!");
    }

    if (!fieldData.timer.length) {
      return Alert.alert("Preencha o campo de tempo!!!");
    }

    if (!moment(fieldData.date).isValid()) {
      return Alert.alert("Digite uma data válida");
    }

    editTimerTrack(route.params.id, {
      date: fieldData.date,
      timer: fieldData.timer 
    });

    navigation.navigate("initialListRecordedTimesRoutes");
  }, [fieldData, route]);

  const MONTH_DATE_MASK = [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/];
  const MONTH_TIMER_MASK = [/\d/, /\d/, ":", /\d/, /\d/, ":", /\d/, /\d/];

  return (
    <ContentContainer>
      <Fields>
        {
          fieldsActive.includes("date")
          &&
          <ContainerFieldAnimation style={stylesFieldDate}>
            <Label>Data (dia/mês/ano)</Label>
            <Field
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
              mask={MONTH_TIMER_MASK}
              value={fieldData.timer}
              onChangeText={text => setFieldData({ ...fieldData, timer: text })}
              placeholderTextColor={`${colors.white}90`}
              keyboardType="numeric"
            />
          </ContainerFieldAnimation>
        }
      </Fields>
      <ActionForm>
        <PressButton onPress={handleEditTimerTrack}>
          <ButtonArea>
            <ButtonTitle>
              Editar
            </ButtonTitle>
          </ButtonArea>
        </PressButton>
      </ActionForm>
    </ContentContainer>
  )
}