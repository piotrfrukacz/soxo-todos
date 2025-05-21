import { render, screen } from "@testing-library/react";
import { Loading } from "../Loading";

describe("Loading component", () => {
  it("renders CircularProgress inside a Box", () => {
    render(<Loading />);

    const progress = screen.getByRole("progressbar");
    expect(progress).toBeInTheDocument();
  });
});
