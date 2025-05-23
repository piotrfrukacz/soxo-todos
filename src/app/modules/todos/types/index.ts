import { FILTERS } from "../components/TodoList";

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export type Filter = (typeof FILTERS)[number];

export type GetTodos = {
  todos: Todo[];
  error?: string;
};
