"use client";

import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function Home() {
  return (
    <Box
      display={"flex"}
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Link href="/todos">
        <Button variant="contained" disableElevation>
          Go to todo list
        </Button>
      </Link>
    </Box>
  );
}
