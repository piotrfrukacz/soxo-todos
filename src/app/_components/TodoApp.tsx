"use client";

import {
  Container,
  Typography,
  List,
  ListItem,
  IconButton,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Box,
} from "@mui/material";
import { useTodos } from "../_context/TodoContext/TodoContext";
import Filter from "./Filter";
import { Loading } from "./Loading";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { Chips } from "./Chips";

const TodoApp = () => {
  const {
    filteredTodos: todos,
    loading,
    error,
    toggleTodo,
    deleteTodo,
  } = useTodos();

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        ToDo App
      </Typography>

      <Filter />

      <Chips />

      {loading ? (
        <Loading />
      ) : (
        <Box>
          {!error && todos.length ? (
            <List sx={{ my: 2 }}>
              {todos.map((todo) => {
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
              })}
            </List>
          ) : (
            <Typography
              variant="body1"
              gutterBottom
              textAlign="left"
              px={2}
              mt={2}
            >
              List is empty
            </Typography>
          )}
        </Box>
      )}
    </Container>
  );
};

export default TodoApp;
