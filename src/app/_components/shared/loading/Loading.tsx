import { Box, CircularProgress } from "@mui/material";

export const Loading = () => (
  <Box display="flex" justifyContent="center" my={4}>
    <CircularProgress />
  </Box>
);
