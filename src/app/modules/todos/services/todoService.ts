import { GetTodos, Todo } from "../types";

export const API_URL = "https://jsonplaceholder.typicode.com/todos?_limit=10";

export const getTodos = async (): Promise<GetTodos> => {
  const res = await fetch(API_URL);

  if (!res.ok) {
    return { todos: [], error: "Something goes wrong" };
  }

  const data: Todo[] = await res.json();

  return { todos: data, error: undefined };
};
