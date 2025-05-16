import React from "react";
import { render, screen } from "@testing-library/react";
import { TodosList } from "../TodosList";
import { useTodos } from "../../_context/TodoContext/TodoContext";
import { Todo } from "../../_reducers/TodoReducer";

// Mock the useTodos hook
jest.mock("../../_context/TodoContext/TodoContext");

const mockUseTodos = useTodos as jest.MockedFunction<typeof useTodos>;

describe("TodosList", () => {
  const mockToggle = jest.fn();
  const mockDelete = jest.fn();

  const mockTodos: Todo[] = [
    { userId: 1, id: 1, title: "First Todo", completed: false },
    { userId: 1, id: 2, title: "Second Todo", completed: true },
  ];

  beforeEach(() => {
    mockUseTodos.mockReturnValue({
      filteredTodos: mockTodos,
      toggleTodo: mockToggle,
      deleteTodo: mockDelete,
      todos: [],
      newTodo: "",
      loading: false,
      error: null,
      filter: "all",
      changeFilter: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders a list of TodoItem components", () => {
    render(<TodosList />);

    // We expect both items to appear in the document
    expect(screen.getByText("First Todo")).toBeInTheDocument();
    expect(screen.getByText("Second Todo")).toBeInTheDocument();
  });

  it("renders nothing if todos array is empty", () => {
    mockUseTodos.mockReturnValue({
      filteredTodos: [],
      toggleTodo: mockToggle,
      deleteTodo: mockDelete,
      todos: [],
      newTodo: "",
      loading: false,
      error: null,
      filter: "all",
      changeFilter: jest.fn(),
    });

    render(<TodosList />);
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });
});
