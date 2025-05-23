import { server } from "@/app/mocks/server";
import "@testing-library/jest-dom";

// Start MSW
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
