import { render, screen } from "@testing-library/react";
import { ErrorAlert } from "../ErrorAlert";

describe("ErrorAlert", () => {
  it("should render nothing when errorMessage is undefined", () => {
    const { container } = render(<ErrorAlert errorMessage={undefined} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("should render nothing when errorMessage is empty string", () => {
    const { container } = render(<ErrorAlert errorMessage="" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("should render Alert when errorMessage is provided", () => {
    render(<ErrorAlert errorMessage="Something went wrong" />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
