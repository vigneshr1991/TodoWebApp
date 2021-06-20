import {
  Container
} from "@material-ui/core";

import Header from './Header'
import TodoTab from './TodoTab'

const Todos = () => {
  return (
    <Container maxWidth="md">
      <Header />
      <TodoTab />
    </Container>
  );
}

export default Todos;
