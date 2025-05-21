import { render, screen } from "@testing-library/react";
import TotalItems from "../TotalItems";

describe("TotalItems component", () => {
  it("renders the total items count correctly", () => {
    const total = 5;

    render(<TotalItems totalItems={total} />);

    expect(screen.getByText(`Total items ${total}`)).toBeInTheDocument();
  });
});
