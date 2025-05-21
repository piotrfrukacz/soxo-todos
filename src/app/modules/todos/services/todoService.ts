import { Todo } from "../types";

const API_URL = "https://jsonplaceholder.typicode.com/todos?_limit=10";

export const getTodos = async (): Promise<Todo[]> => {
  const res = await fetch(API_URL);

  if (!res.ok) throw res;

  const data: Todo[] = await res.json();

  return data;
};
