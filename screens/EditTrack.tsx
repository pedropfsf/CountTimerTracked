// Modules
import { StatusBar } from 'expo-status-bar';

// Elements
import ContainerScreen from '../elements/ContainerScreen';
import Title from '../elements/Title';

// Components
import FormEdit from '../components/FormEdit';

export default function EditTrack() {
  return (
    <ContainerScreen>
      <StatusBar style="light" />
      <Title>Editar registro de tempo</Title>
      <FormEdit/>
    </ContainerScreen>
  );
}

