import React from "react";
import { render, screen } from "@testing-library/react";
import { Loading } from "../Loading";

describe("Loading", () => {
  it("renders a CircularProgress component", () => {
    render(<Loading />);

    const loader = screen.getByRole("progressbar");

    expect(loader).toBeInTheDocument();
  });
});
