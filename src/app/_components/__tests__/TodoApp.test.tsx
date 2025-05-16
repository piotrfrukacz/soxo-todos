import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoApp from "../TodoApp";
import { useTodos } from "@/app/_context/TodoContext/TodoContext";

jest.mock("@/app/_context/TodoContext/TodoContext", () => ({
  useTodos: jest.fn(),
}));

describe("TodoApp component", () => {
  const mockToggleTodo = jest.fn();
  const mockDeleteTodo = jest.fn();

  const sampleTodos = [
    { id: 1, title: "Test Todo 1", completed: false },
    { id: 2, title: "Test Todo 2", completed: true },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading component when loading is true", () => {
    (useTodos as jest.Mock).mockReturnValue({
      filteredTodos: [],
      loading: true,
      error: null,
      toggleTodo: mockToggleTodo,
      deleteTodo: mockDeleteTodo,
    });

    render(<TodoApp />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders todos when data is loaded", () => {
    (useTodos as jest.Mock).mockReturnValue({
      filteredTodos: sampleTodos,
      loading: false,
      error: null,
      toggleTodo: mockToggleTodo,
      deleteTodo: mockDeleteTodo,
    });

    render(<TodoApp />);
    expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
  });

  it("displays 'List is empty' when there are no todos", () => {
    (useTodos as jest.Mock).mockReturnValue({
      filteredTodos: [],
      loading: false,
      error: null,
      toggleTodo: mockToggleTodo,
      deleteTodo: mockDeleteTodo,
    });

    render(<TodoApp />);
    expect(screen.getByText(/list is empty/i)).toBeInTheDocument();
  });

  it("calls toggleTodo when a todo item is clicked", () => {
    (useTodos as jest.Mock).mockReturnValue({
      filteredTodos: sampleTodos,
      loading: false,
      error: null,
      toggleTodo: mockToggleTodo,
      deleteTodo: mockDeleteTodo,
    });

    render(<TodoApp />);
    const firstTodo = screen.getByText("Test Todo 1");
    fireEvent.click(firstTodo);

    expect(mockToggleTodo).toHaveBeenCalledWith(1);
  });

  it("calls deleteTodo when delete button is clicked", () => {
    (useTodos as jest.Mock).mockReturnValue({
      filteredTodos: sampleTodos,
      loading: false,
      error: null,
      toggleTodo: mockToggleTodo,
      deleteTodo: mockDeleteTodo,
    });

    render(<TodoApp />);
    const deleteButtons = screen.getAllByLabelText("comments");
    fireEvent.click(deleteButtons[0]);

    expect(mockDeleteTodo).toHaveBeenCalledWith(1);
  });
});
