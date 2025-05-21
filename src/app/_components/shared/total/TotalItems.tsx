import { Box } from "@mui/material";

type Props = {
  totalItems: number;
};

const TotalItems = ({ totalItems }: Props) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "right" }}>
      Total items {totalItems}
    </Box>
  );
};

export default TotalItems;
