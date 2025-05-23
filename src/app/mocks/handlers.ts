import { http, HttpResponse } from "msw";
import { API_URL } from "../modules/todos/services/todoService";

export const handlers = [
  http.get(API_URL, () => {
    return HttpResponse.json([
      { id: 1, title: "Test todo", completed: false },
      { id: 2, title: "Another todo", completed: true },
    ]);
  }),
];
