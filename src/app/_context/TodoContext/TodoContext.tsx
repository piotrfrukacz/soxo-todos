"use client";

import { createContext, useContext } from "react";
import { Todo } from "../../_reducers/TodoReducer";
import { Filter } from "./TodoProvider";

export type TodoContextType = {
  todos: Todo[];
  filteredTodos: Todo[];
  newTodo: string;
  loading: boolean;
  error: string | null;
  toggleTodo: (id: number) => void;
  filter: string;
  changeFilter: (filter: Filter) => void;
  deleteTodo: (id: number) => void;
};

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
};
