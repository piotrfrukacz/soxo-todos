"use client";

import { useEffect, useState } from "react";
import { Filter, Todo } from "../types";
import { getTodos } from "../services/todoService";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [filter, setFilter] = useState<Filter>("all");

  const fetchTodos = async () => {
    try {
      setLoading(true);

      const todosData = await getTodos();
      setTodos(todosData);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("Something goes wrong");
      setLoading(false);
    }
  };

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
    fetchTodos();
  }, []);

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
