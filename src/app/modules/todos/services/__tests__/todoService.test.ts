import { server } from "@/app/mocks/server";
import { API_URL, getTodos } from "@/app/modules/todos/services/todoService";
import { http, HttpResponse } from "msw";

describe("getTodos", () => {
  it("returns todos on success", async () => {
    const { todos, error } = await getTodos();

    expect(Array.isArray(todos)).toBe(true);
    expect(todos.length).toBeGreaterThan(0);
    expect(error).toBeUndefined();
  });

  it("returns error message on fetch failure", async () => {
    server.use(
      http.get(API_URL, () => {
        return HttpResponse.json(
          { message: "Internal Server Error" },
          { status: 500 }
        );
      })
    );

    const { todos, error } = await getTodos();

    expect(todos).toEqual([]);
    expect(error).toBe("Something goes wrong");
  });
});
