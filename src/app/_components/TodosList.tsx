import { List } from "@mui/material";
import { useTodos } from "../_context/TodoContext/TodoContext";
import { TodoItem } from "./TodoItem";

export const TodosList = () => {
  const { filteredTodos: todos, toggleTodo, deleteTodo } = useTodos();

  return (
    <List sx={{ my: 2 }}>
      {todos.map((todo) => {
        return (
          <TodoItem
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            key={todo.id}
          />
        );
      })}
    </List>
  );
};
