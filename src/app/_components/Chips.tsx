import { Box, Chip } from "@mui/material";
import { useTodos } from "../_context/TodoContext/TodoContext";
import { useMemo } from "react";

export const Chips = () => {
  const { todos = [] } = useTodos();

  const all = useMemo(() => todos.length, [todos]);
  const completed = useMemo(
    () =>
      todos.length
        ? todos.filter((todo) => todo.completed).length
        : todos.length,
    [todos]
  );

  const inComplete = useMemo(
    () =>
      todos.length
        ? todos.filter((todo) => !todo.completed).length
        : todos.length,
    [todos]
  );

  return (
    <Box sx={{ mt: 2, mb: -1, display: "flex", justifyContent: "right" }}>
      <Chip label={`ALL ${all}`} color="primary" />
      <Chip label={`COMPLETED ${completed}`} color="success" sx={{ mx: 2 }} />
      <Chip label={`INCOMPLETE ${inComplete}`} color="error" />
    </Box>
  );
};
