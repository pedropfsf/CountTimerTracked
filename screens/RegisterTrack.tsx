// Modules
import { StatusBar } from 'expo-status-bar';

// Elements
import ContainerScreen from '../elements/ContainerScreen';
import Title from '../elements/Title';

// Components
import FormCreate from '../components/FormCreate';

export default function RegisterTrack() {
  return (
    <ContainerScreen>
      <StatusBar style="light" />
      <Title>Cadastrar registro de tempo</Title>
      <FormCreate/>
    </ContainerScreen>
  );
}

