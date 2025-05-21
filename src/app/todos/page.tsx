import { Container } from "@mui/material";
import { TodoList } from "../modules/todos";
import Header from "../_components/shared/header/Header";
import { ErrorAlert } from "../_components/shared/errors/ErrorAlert";

export default function TodosPage() {
  return (
    <main>
      <ErrorAlert />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Header title="ToDO App" />
        <TodoList />
      </Container>
    </main>
  );
}
