import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { Todo } from "../_reducers/TodoReducer";
import { TodoContextType } from "../_context/TodoContext/TodoContext";

interface TodoItem {
  todo: Todo;
}

export const TodoItem = ({
  todo,
  toggleTodo,
  deleteTodo,
}: TodoItem & Pick<TodoContextType, "toggleTodo" | "deleteTodo">) => {
  const labelId = `checkbox-list-label-${todo.id}`;

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
        <ListItemText id={labelId} primary={todo.title} />
      </ListItemButton>
    </ListItem>
  );
};
