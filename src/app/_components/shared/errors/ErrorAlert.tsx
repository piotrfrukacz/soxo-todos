import { Alert } from "@mui/material";

type Props = {
  errorMessage?: string | undefined;
};

export const ErrorAlert = ({ errorMessage }: Props) => {
  return (
    errorMessage && (
      <Alert severity="error" sx={{ mb: 2 }}>
        {errorMessage}
      </Alert>
    )
  );
};
