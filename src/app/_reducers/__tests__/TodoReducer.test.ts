import { toDoReducer } from "../../_reducers/TodoReducer";
import { State } from "../../_context/TodoContext/TodoProvider";
import { ACTIONS } from "@/app/_types/actions";

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

describe("toDoReducer", () => {
  const initialState: State = {
    todos: [],
    newTodo: "",
    loading: false,
    error: null,
    page: 1,
    filter: "all",
  };

  const sampleTodos: Todo[] = [
    { userId: 1, id: 1, title: "Task 1", completed: false },
    { userId: 1, id: 2, title: "Task 2", completed: true },
  ];

  it("sets todos (initial = true)", () => {
    const newState = toDoReducer(initialState, {
      type: ACTIONS.SET_TODOS,
      payload: sampleTodos,
      initial: true,
    });
    expect(newState.todos).toEqual(sampleTodos);
  });

  it("appends todos (initial = false)", () => {
    const stateWithTodos = { ...initialState, todos: sampleTodos };
    const moreTodos: Todo[] = [
      { userId: 1, id: 3, title: "Task 3", completed: false },
    ];
    const newState = toDoReducer(stateWithTodos, {
      type: ACTIONS.SET_TODOS,
      payload: moreTodos,
      initial: false,
    });
    expect(newState.todos).toEqual([...sampleTodos, ...moreTodos]);
  });

  it("toggles completed status of a task by id", () => {
    const stateWithTodos = { ...initialState, todos: sampleTodos };
    const newState = toDoReducer(stateWithTodos, {
      type: ACTIONS.TOGGLE_TODO,
      payload: 1,
    });
    expect(newState.todos.find((t) => t.id === 1)?.completed).toBe(true);
  });

  it("sets loading state", () => {
    const newState = toDoReducer(initialState, {
      type: ACTIONS.SET_LOADING,
      payload: true,
    });
    expect(newState.loading).toBe(true);
  });

  it("sets error message", () => {
    const newState = toDoReducer(initialState, {
      type: ACTIONS.SET_ERROR,
      payload: "Error",
    });
    expect(newState.error).toBe("Error");
  });

  it("changes filter", () => {
    const newState = toDoReducer(initialState, {
      type: ACTIONS.CHANGE_FILTER,
      payload: "completed",
    });
    expect(newState.filter).toBe("completed");
  });

  it("returns unchanged state for unknown action", () => {
    // @ts-expect-error type unknown not exist in types
    const newState = toDoReducer(initialState, { type: "UNKNOWN" });
    expect(newState).toBe(initialState);
  });
});
