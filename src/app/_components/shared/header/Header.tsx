import { Typography } from "@mui/material";

type Props = {
  title: string;
};
const Header = ({ title }: Props) => {
  return (
    <Typography variant="h4" gutterBottom>
      {title}
    </Typography>
  );
};

export default Header;
