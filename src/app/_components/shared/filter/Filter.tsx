import * as React from "react";

import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Filter as FilterType } from "@/app/modules/todos/types";

type Props = {
  changeFilter: (filer: FilterType) => void;
  filter: FilterType;
  filters: readonly ["all", "completed", "incomplete"];
};

export default function Filter({ changeFilter, filters, filter }: Props) {
  const handleChange = (event: SelectChangeEvent) => {
    console.log("xxx", event.target.value);
    changeFilter(event.target.value as FilterType);
  };

  return (
    <FormControl fullWidth>
      <Select data-testid="select" value={filter} onChange={handleChange}>
        {filters.map((filter) => (
          <MenuItem value={filter} key={filter}>
            {filter}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
