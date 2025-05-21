"use client";

import { useTodos } from "@/app/modules/todos/hooks/useTodos";
import { Alert } from "@mui/material";

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
