import { Todo } from "../../types";
import { getTodos } from "../todoService";

global.fetch = jest.fn();

const mockTodos: Todo[] = [
  { userId: 1, id: 1, title: "Test todo 1", completed: false },
  { userId: 1, id: 2, title: "Test todo 2", completed: true },
];

describe("getTodos", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("fetches and returns a list of todos", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTodos,
    });

    const result = await getTodos();

    expect(fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/todos?_limit=10"
    );
    expect(result).toEqual(mockTodos);
  });

  it("throws an error if the response is not OK", async () => {
    const fakeResponse = {
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    };

    (fetch as jest.Mock).mockResolvedValueOnce(fakeResponse);

    await expect(getTodos()).rejects.toBe(fakeResponse);
  });
});
