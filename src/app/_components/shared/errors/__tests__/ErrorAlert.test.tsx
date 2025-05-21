import { render, screen } from "@testing-library/react";
import { ErrorAlert } from "../ErrorAlert";
import { useTodos } from "@/app/modules/todos/hooks/useTodos";

// 🔁 Mockujemy hook useTodos
jest.mock("@/app/modules/todos/hooks/useTodos");

const mockUseTodos = useTodos as jest.Mock;

describe("ErrorAlert", () => {
  it("renders error alert when error is present", () => {
    mockUseTodos.mockReturnValue({
      error: "Something went wrong",
    });

    render(<ErrorAlert />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("does not render alert when there is no error", () => {
    mockUseTodos.mockReturnValue({
      error: undefined,
    });

    const { container } = render(<ErrorAlert />);

    expect(container).toBeEmptyDOMElement();
  });
});
