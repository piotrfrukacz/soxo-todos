import { Filter, State } from "../_context/TodoContext/TodoProvider";
import { ACTIONS } from "../_types/actions";

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type Action =
  | { type: ACTIONS.SET_TODOS; payload: Todo[]; initial: boolean }
  | { type: ACTIONS.TOGGLE_TODO; payload: number }
  | { type: ACTIONS.SET_LOADING; payload: boolean }
  | { type: ACTIONS.SET_ERROR; payload: string | null }
  | { type: ACTIONS.CHANGE_FILTER; payload: Filter }
  | { type: ACTIONS.DELETE_TODO; payload: number };

export const toDoReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTIONS.SET_TODOS:
      return {
        ...state,
        todos: action.initial
          ? action.payload
          : [...state.todos, ...action.payload],
      };
    case ACTIONS.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };
    case ACTIONS.CHANGE_FILTER:
      return { ...state, filter: action.payload };
    case ACTIONS.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    default:
      return state;
  }
};
