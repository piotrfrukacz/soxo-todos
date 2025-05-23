"use client";

import { useEffect, useState } from "react";
import { Filter, Todo } from "../types";

export const useTodos = (
  initialTodos: Todo[] = [],
  initialError: string | undefined
) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [loading, setLoading] = useState<boolean>(true);
  const [error] = useState<string | undefined>(initialError);
  const [filter, setFilter] = useState<Filter>("all");

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const toggleTodo = (id: number) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  const changeFilter = (filter: Filter) => {
    setFilter(filter);
  };

  useEffect(() => {
    if (initialTodos.length) {
      setLoading(false);
      return;
    }
  }, [initialTodos.length]);

  useEffect(() => {
    if (initialTodos.length) {
      setLoading(false);
      return;
    }

    if (initialError) {
      setLoading(false);
      return;
    }
  }, [initialTodos.length, initialError]);

  return {
    todos,
    loading,
    error,
    filter,
    deleteTodo,
    toggleTodo,
    changeFilter,
  };
};
