import React from "react";
import { renderHook } from "@testing-library/react";
import { useTodos, TodoContext } from "../TodoContext";
import { Todo } from "@/app/_reducers/TodoReducer";

describe("useTodos", () => {
  const mockContextValue = {
    todos: [
      { id: 1, userId: 1, title: "Task 1", completed: false },
      { id: 2, userId: 1, title: "Task 2", completed: true },
    ] as Todo[],
    filteredTodos: [
      { id: 2, userId: 1, title: "Task 2", completed: true },
    ] as Todo[],
    newTodo: "",
    loading: false,
    error: null,
    toggleTodo: jest.fn(),
    filter: "all",
    changeFilter: jest.fn(),
    deleteTodo: jest.fn(),
  };

  it("returns context when used inside a provider", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <TodoContext.Provider value={mockContextValue}>
        {children}
      </TodoContext.Provider>
    );

    const { result } = renderHook(() => useTodos(), { wrapper });

    expect(result.current.todos).toEqual(mockContextValue.todos);
    expect(result.current.filteredTodos).toEqual(
      mockContextValue.filteredTodos
    );
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.filter).toBe("all");
    expect(typeof result.current.toggleTodo).toBe("function");
    expect(typeof result.current.changeFilter).toBe("function");
    expect(typeof result.current.deleteTodo).toBe("function");
  });

  it("throws an error when used outside of TodoProvider", () => {
    const consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => renderHook(() => useTodos())).toThrow(
      "useTodos must be used within a TodoProvider"
    );

    consoleErrorMock.mockRestore();
  });
});
