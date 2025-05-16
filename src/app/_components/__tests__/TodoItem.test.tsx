import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TodoItem } from "../TodoItem";
import { Todo } from "../../_reducers/TodoReducer";

// Mock data
const mockTodo: Todo = {
  userId: 1,
  id: 1,
  title: "Test Todo",
  completed: false,
};

describe("TodoItem", () => {
  const toggleTodo = jest.fn();
  const deleteTodo = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the todo item with correct text and checkbox state", () => {
    render(
      <TodoItem
        todo={mockTodo}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    );

    expect(screen.getByText("Test Todo")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("calls toggleTodo when item is clicked", () => {
    render(
      <TodoItem
        todo={mockTodo}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    );

    const item = screen.getByText("Test Todo");
    fireEvent.click(item);

    expect(toggleTodo).toHaveBeenCalledTimes(1);
    expect(toggleTodo).toHaveBeenCalledWith(mockTodo.id);
  });

  it("calls deleteTodo when delete icon is clicked", () => {
    render(
      <TodoItem
        todo={mockTodo}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    );

    const deleteButton = screen.getByLabelText("comments");
    fireEvent.click(deleteButton);

    expect(deleteTodo).toHaveBeenCalledTimes(1);
    expect(deleteTodo).toHaveBeenCalledWith(mockTodo.id);
  });

  it("shows checkbox as checked if todo is completed", () => {
    render(
      <TodoItem
        todo={{ ...mockTodo, completed: true }}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    );

    expect(screen.getByRole("checkbox")).toBeChecked();
  });
});
