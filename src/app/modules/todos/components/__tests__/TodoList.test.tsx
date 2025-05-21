import { render, screen, fireEvent } from "@testing-library/react";
import { useTodos } from "../../hooks/useTodos";
import { Todo } from "../../types";
import TodoList from "../TodoList";

jest.mock("../../hooks/useTodos");

const mockUseTodos = useTodos as jest.Mock;

const mockTodos: Todo[] = [
  { id: 1, userId: 1, title: "Buy milk", completed: false },
  { id: 2, userId: 1, title: "Read a book", completed: true },
];

describe("TodoList - Integration", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders loading state", () => {
    mockUseTodos.mockReturnValue({
      todos: [],
      loading: true,
      filter: "all",
      deleteTodo: jest.fn(),
      toggleTodo: jest.fn(),
      changeFilter: jest.fn(),
    });

    render(<TodoList />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders all todos when filter is 'all'", () => {
    mockUseTodos.mockReturnValue({
      todos: mockTodos,
      loading: false,
      filter: "all",
      deleteTodo: jest.fn(),
      toggleTodo: jest.fn(),
      changeFilter: jest.fn(),
    });

    render(<TodoList />);
    expect(screen.getByText("Buy milk")).toBeInTheDocument();
    expect(screen.getByText("Read a book")).toBeInTheDocument();
    expect(screen.getByText(/total/i)).toHaveTextContent("2");
  });

  it("filters only completed todos", () => {
    mockUseTodos.mockReturnValue({
      todos: mockTodos,
      loading: false,
      filter: "completed",
      deleteTodo: jest.fn(),
      toggleTodo: jest.fn(),
      changeFilter: jest.fn(),
    });

    render(<TodoList />);
    expect(screen.getByText("Read a book")).toBeInTheDocument();
    expect(screen.queryByText("Buy milk")).not.toBeInTheDocument();
    expect(screen.getByText(/total/i)).toHaveTextContent("1");
  });

  it("filters only incomplete todos", () => {
    mockUseTodos.mockReturnValue({
      todos: mockTodos,
      loading: false,
      filter: "incomplete",
      deleteTodo: jest.fn(),
      toggleTodo: jest.fn(),
      changeFilter: jest.fn(),
    });

    render(<TodoList />);
    expect(screen.getByText("Buy milk")).toBeInTheDocument();
    expect(screen.queryByText("Read a book")).not.toBeInTheDocument();
    expect(screen.getByText(/total/i)).toHaveTextContent("1");
  });

  it("calls changeFilter when a filter button is clicked", () => {
    const changeFilterMock = jest.fn();

    mockUseTodos.mockReturnValue({
      todos: mockTodos,
      loading: false,
      filter: "all",
      deleteTodo: jest.fn(),
      toggleTodo: jest.fn(),
      changeFilter: changeFilterMock,
    });

    render(<TodoList />);

    const select = screen.getByRole("combobox");

    expect(select).toBeInTheDocument();

    fireEvent.mouseDown(select);
    screen.debug(select);

    const option = screen.getByText("completed");
    fireEvent.click(option);

    expect(changeFilterMock).toHaveBeenCalledWith("completed");
  });
});
