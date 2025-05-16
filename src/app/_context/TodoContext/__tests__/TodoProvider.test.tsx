import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import axios from "axios";
import { TodoProvider } from "../TodoProvider";
import { useTodos } from "../TodoContext";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// A test component that uses the TodoContext
const TestComponent = () => {
  const {
    filteredTodos,
    loading,
    error,
    toggleTodo,
    changeFilter,
    deleteTodo,
  } = useTodos();

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            data-testid="todo"
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.title}
          </li>
        ))}
      </ul>
      <button onClick={() => changeFilter("completed")}>
        Filter Completed
      </button>
      <button onClick={() => changeFilter("incomplete")}>
        Filter Incomplete
      </button>
      <button onClick={() => changeFilter("all")}>Filter All</button>
      <button onClick={() => deleteTodo(1)}>Delete First Todo</button>
    </div>
  );
};

describe("TodoProvider", () => {
  const mockTodos = [
    { userId: 1, id: 1, title: "Test task 1", completed: false },
    { userId: 1, id: 2, title: "Test task 2", completed: true },
  ];

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: mockTodos });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and displays todos", async () => {
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByTestId("todo")).toHaveLength(2);
    });

    expect(screen.getByText(/Test task 1/)).toBeInTheDocument();
    expect(screen.getByText(/Test task 2/)).toBeInTheDocument();
  });

  it("filters completed todos", async () => {
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("todo")).toHaveLength(2);
    });

    act(() => {
      screen.getByText("Filter Completed").click();
    });

    await waitFor(() => {
      const todos = screen.getAllByTestId("todo");
      expect(todos).toHaveLength(1);
      expect(todos[0]).toHaveTextContent("Test task 2");
    });
  });

  it("filters incomplete todos", async () => {
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    await waitFor(() => {
      screen.getByText("Test task 1");
    });

    act(() => {
      screen.getByText("Filter Incomplete").click();
    });

    await waitFor(() => {
      const todos = screen.getAllByTestId("todo");
      expect(todos).toHaveLength(1);
      expect(todos[0]).toHaveTextContent("Test task 1");
    });
  });

  it("toggles a todo's completion", async () => {
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Test task 1")).toBeInTheDocument();
    });

    act(() => {
      screen.getByText("Test task 1").click();
    });

    expect(screen.getByText("Test task 1")).toBeInTheDocument();
  });

  it("deletes a todo", async () => {
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("todo")).toHaveLength(2);
    });

    act(() => {
      screen.getByText("Delete First Todo").click();
    });

    await waitFor(() => {
      expect(screen.getAllByTestId("todo")).toHaveLength(1);
    });

    expect(screen.queryByText("Test task 1")).not.toBeInTheDocument();
  });

  it("displays an error message on fetch failure", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Failed to load todos.")).toBeInTheDocument();
    });
  });
});
