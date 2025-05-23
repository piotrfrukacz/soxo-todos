"use client";

import { Box, List } from "@mui/material";
import { useTodos } from "../hooks/useTodos";
import { TodoItem } from "./TodoItem";
import { Loading } from "@/app/_components/shared/loading/Loading";
import TotalItems from "@/app/_components/shared/total/TotalItems";
import Filter from "@/app/_components/shared/filter/Filter";
import { Todo } from "../types";

export const FILTERS = ["all", "completed", "incomplete"] as const;

type Props = {
  initialTodos: Todo[];
  error?: string | undefined;
};

const TodoList = ({ initialTodos, error }: Props) => {
  const { todos, loading, filter, deleteTodo, toggleTodo, changeFilter } =
    useTodos(initialTodos, error);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") {
      return todo.completed;
    }

    if (filter === "incomplete") {
      return !todo.completed;
    }

    return todo;
  });

  return (
    <Box>
      <Filter filter={filter} changeFilter={changeFilter} filters={FILTERS} />
      {loading ? (
        <Loading />
      ) : (
        <>
          <List sx={{ my: 2 }}>
            {filteredTodos.map((todo) => {
              return (
                <TodoItem
                  todo={todo}
                  deleteTodo={deleteTodo}
                  toggleTodo={toggleTodo}
                  key={todo.id}
                />
              );
            })}
          </List>
          <TotalItems totalItems={filteredTodos.length} />
        </>
      )}
    </Box>
  );
};

export default TodoList;
