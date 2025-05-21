import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "../Filter";
import { useTodos } from "@/app/modules/todos/hooks/useTodos";

jest.mock("@/app/modules/todos/hooks/useTodos", () => ({
  useTodos: jest.fn(),
}));

const filters = ["all", "completed", "incomplete"] as const;

describe("Filter component", () => {
  const mockChangeFilter = jest.fn();

  beforeEach(() => {
    (useTodos as jest.Mock).mockReturnValue({
      filter: "all",
      changeFilter: mockChangeFilter,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the select with the current filter value", () => {
    render(<Filter filter="all" changeFilter={jest.fn()} filters={filters} />);
    const select = screen.getByTestId("select");

    expect(select).toBeInTheDocument();
    expect(select).toHaveTextContent("all");
  });

  it("renders all filtering options", () => {
    render(<Filter filter="all" changeFilter={jest.fn()} filters={filters} />);
    const select = screen.getByRole("combobox");
    fireEvent.mouseDown(select);

    const options = screen.getAllByRole("option");

    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent("all");
    expect(options[1]).toHaveTextContent("completed");
    expect(options[2]).toHaveTextContent("incomplete");
  });

  it("calls changeFilter when the filter is changed", () => {
    const mockChangeFilter = jest.fn();
    render(
      <Filter filter="all" changeFilter={mockChangeFilter} filters={filters} />
    );
    const select = screen.getByRole("combobox");
    fireEvent.mouseDown(select);

    const completedOption = screen.getByText("completed");
    fireEvent.click(completedOption);

    expect(mockChangeFilter).toHaveBeenCalledWith("completed");
  });
});
