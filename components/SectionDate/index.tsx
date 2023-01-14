// Elements
import { 
  Container, 
  Content, 
  Title 
} from "./styles";

type SectionDateProps = {
  dateLabel?: string;
  children?: JSX.Element | JSX.Element[]; 
}

export default function SectionDate({ dateLabel, children }: SectionDateProps) {
  return (
    <Container>
      <Title>{dateLabel}</Title>
      <Content>
        {children}
      </Content>
    </Container>
  )
}