"use client";

import { Container, Typography, Box } from "@mui/material";
import { useTodos } from "../_context/TodoContext/TodoContext";
import Filter from "./Filter";
import { Loading } from "./Loading";
import { Chips } from "./Chips";
import { TodosList } from "./TodosList";

const TodoApp = () => {
  const { filteredTodos: todos, loading, error } = useTodos();

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        ToDo App
      </Typography>

      <Filter />

      <Chips />

      {loading ? (
        <Loading />
      ) : (
        <Box>
          {!error && todos.length ? (
            <TodosList />
          ) : (
            <Typography
              variant="body1"
              gutterBottom
              textAlign="left"
              px={2}
              mt={2}
            >
              List is empty
            </Typography>
          )}
        </Box>
      )}
    </Container>
  );
};

export default TodoApp;
