import React from "react";
import { render, screen } from "@testing-library/react";
import { ErrorAlert } from "../ErrorAlert";
import { useTodos } from "../../_context/TodoContext/TodoContext";

jest.mock("../../_context/TodoContext/TodoContext", () => ({
  useTodos: jest.fn(),
}));

describe("ErrorAlert", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("does not render the alert if error is null", () => {
    (useTodos as jest.Mock).mockReturnValue({ error: null });

    render(<ErrorAlert />);
    const alert = screen.queryByRole("alert");

    expect(alert).not.toBeInTheDocument();
  });

  it("renders the alert with the error message", () => {
    const errorMessage = "Failed to fetch data!";
    (useTodos as jest.Mock).mockReturnValue({ error: errorMessage });

    render(<ErrorAlert />);
    const alert = screen.getByRole("alert");

    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent(errorMessage);
  });
});
