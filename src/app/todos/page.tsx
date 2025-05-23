import { Container } from "@mui/material";
import { TodoList } from "../modules/todos";
import Header from "../_components/shared/header/Header";
import { ErrorAlert } from "../_components/shared/errors/ErrorAlert";
import { getTodos } from "../modules/todos/services/todoService";

export default async function TodosPage() {
  const { error, todos } = await getTodos();
  return (
    <main>
      <ErrorAlert errorMessage={error} />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Header title="ToDO App" />
        <TodoList initialTodos={todos} error={error} />
      </Container>
    </main>
  );
}
