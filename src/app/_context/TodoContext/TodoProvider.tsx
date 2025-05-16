"use client";

import axios from "axios";
import { ReactNode, useEffect, useReducer } from "react";
import { Todo, toDoReducer } from "../../_reducers/TodoReducer";
import { TodoContext } from "./TodoContext";
import { ACTIONS } from "@/app/_types/actions";

export const FILTERS = ["all", "completed", "incomplete"] as const;
export type Filter = (typeof FILTERS)[number];

export type State = {
  todos: Todo[];
  newTodo: string;
  loading: boolean;
  error: string | null;
  page: number;
  filter: Filter;
};

const initialState: State = {
  todos: [],
  newTodo: "",
  loading: true,
  error: null,
  page: 1,
  filter: "all",
};

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(toDoReducer, initialState);
  const TODOS_PER_PAGE = 10;

  const loadTodos = async (initial = false) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/todos?_limit=${TODOS_PER_PAGE}&_page=${
          initial ? 1 : state.page
        }`
      );
      dispatch({ type: ACTIONS.SET_TODOS, payload: response.data, initial });
      dispatch({ type: ACTIONS.SET_ERROR, payload: null });
    } catch {
      dispatch({ type: ACTIONS.SET_ERROR, payload: "Failed to load todos." });
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  useEffect(() => {
    loadTodos(true);
  }, []);

  const toggleTodo = (id: number) => {
    dispatch({ type: ACTIONS.TOGGLE_TODO, payload: id });
  };

  const changeFilter = (filter: Filter) => {
    dispatch({ type: ACTIONS.CHANGE_FILTER, payload: filter });
  };

  const filteredTodos = state.todos.filter((todo) => {
    const { filter } = state;

    if (filter === "completed") {
      return todo.completed;
    }

    if (filter === "incomplete") {
      return !todo.completed;
    }

    return todo;
  });

  const deleteTodo = (id: number) => {
    dispatch({ type: ACTIONS.DELETE_TODO, payload: id });
  };

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        filteredTodos: filteredTodos,
        newTodo: state.newTodo,
        loading: state.loading,
        error: state.error,
        toggleTodo,
        filter: state.filter,
        changeFilter,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
