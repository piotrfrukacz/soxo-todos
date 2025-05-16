import React from "react";
import { render, screen } from "@testing-library/react";
import { Chips } from "../Chips";
import { useTodos } from "@/app/_context/TodoContext/TodoContext";

jest.mock("@/app/_context/TodoContext/TodoContext", () => ({
  useTodos: jest.fn(),
}));

describe("Chips component", () => {
  const mockTodos = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
    { id: 3, title: "Task 3", completed: false },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all chip counts correctly", () => {
    (useTodos as jest.Mock).mockReturnValue({ todos: mockTodos });

    render(<Chips />);

    expect(screen.getByText("ALL 3")).toBeInTheDocument();
    expect(screen.getByText("COMPLETED 1")).toBeInTheDocument();
    expect(screen.getByText("INCOMPLETE 2")).toBeInTheDocument();
  });

  it("renders all chip counts as 0 when todos list is empty", () => {
    (useTodos as jest.Mock).mockReturnValue({ todos: [] });

    render(<Chips />);

    expect(screen.getByText("ALL 0")).toBeInTheDocument();
    expect(screen.getByText("COMPLETED 0")).toBeInTheDocument();
    expect(screen.getByText("INCOMPLETE 0")).toBeInTheDocument();
  });

  it("handles undefined todos gracefully", () => {
    (useTodos as jest.Mock).mockReturnValue({ todos: undefined });

    render(<Chips />);

    expect(screen.getByText("ALL 0")).toBeInTheDocument();
    expect(screen.getByText("COMPLETED 0")).toBeInTheDocument();
    expect(screen.getByText("INCOMPLETE 0")).toBeInTheDocument();
  });
});
