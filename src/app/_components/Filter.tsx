import * as React from "react";
import {
  Filter as FilterTypes,
  FILTERS,
} from "../_context/TodoContext/TodoProvider";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useTodos } from "../_context/TodoContext/TodoContext";

export default function Filter() {
  const { changeFilter, filter } = useTodos();

  const handleChange = (event: SelectChangeEvent) => {
    changeFilter(event.target.value as FilterTypes);
  };
  return (
    <FormControl fullWidth>
      <Select data-testid="select" value={filter} onChange={handleChange}>
        {FILTERS.map((filter) => (
          <MenuItem value={filter} key={filter}>
            {filter}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
