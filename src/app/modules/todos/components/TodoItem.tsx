import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Todo } from "../types";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";

type Props = {
  todo: Todo;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
};

export const TodoItem = ({ todo, deleteTodo, toggleTodo }: Props) => {
  return (
    <ListItem
      sx={{ my: 0.5 }}
      key={todo.id}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="comments"
          onClick={() => deleteTodo(todo.id)}
        >
          <DeleteForeverRoundedIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton
        role={undefined}
        onClick={() => toggleTodo(todo.id)}
        dense
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={todo.completed}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText id={todo.title} primary={todo.title} />
      </ListItemButton>
    </ListItem>
  );
};
