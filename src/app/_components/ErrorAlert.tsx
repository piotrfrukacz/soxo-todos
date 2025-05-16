import { Alert } from "@mui/material";
import { useTodos } from "../_context/TodoContext/TodoContext";

export const ErrorAlert = () => {
  const { error } = useTodos();
  return (
    error && (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    )
  );
};
