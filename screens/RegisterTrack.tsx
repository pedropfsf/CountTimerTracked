// Modules
import { StatusBar } from 'expo-status-bar';

// Elements
import ContainerScreen from '../elements/ContainerScreen';

// Components
import FormCreate from '../components/FormCreate';

export default function RegisterTrack() {
  return (
    <ContainerScreen>
      <StatusBar style="light" />
      <FormCreate/>
    </ContainerScreen>
  );
}

