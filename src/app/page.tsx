"use client";

import { ErrorAlert } from "./_components/ErrorAlert";
import TodoApp from "./_components/TodoApp";
import { TodoProvider } from "./_context/TodoContext/TodoProvider";

export default function Home() {
  return (
    <TodoProvider>
      <ErrorAlert />
      <TodoApp />
    </TodoProvider>
  );
}
