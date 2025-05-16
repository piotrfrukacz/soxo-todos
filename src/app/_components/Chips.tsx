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
    <Box sx={{ mt: 2, mb: -1, display: "flex-wrap", justifyContent: "right" }}>
      <Chip label={`ALL ${all}`} color="primary" sx={{ ml: 1, my: 0.5 }} />
      <Chip
        label={`COMPLETED ${completed}`}
        color="success"
        sx={{ ml: 1, my: 0.5 }}
      />
      <Chip
        label={`INCOMPLETE ${inComplete}`}
        color="error"
        sx={{ ml: 1, my: 0.5 }}
      />
    </Box>
  );
};
