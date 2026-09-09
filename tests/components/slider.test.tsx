import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Slider } from "@/components/ui/slider";

describe("Slider", () => {
  it("renders slider element with initial value", () => {
    render(<Slider defaultValue={60} aria-label="Volume Level" />);
    const slider = screen.getByRole("slider");
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute("aria-valuenow", "60");
  });
});
