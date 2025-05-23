import { render, screen } from "@testing-library/react";
import Header from "../Header";

describe("Header component", () => {
  it("renders the title text correctly", () => {
    const title = "My Test Title";

    render(<Header title={title} />);

    const heading = screen.getByRole("heading", { level: 4 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(title);
  });
});
