import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Separator } from "@/components/ui/separator";

describe("Separator", () => {
  it("renders horizontal and vertical separators", () => {
    const { rerender } = render(<Separator data-testid="sep" />);
    expect(screen.getByTestId("sep")).toHaveClass("h-px", "w-full");

    rerender(<Separator data-testid="sep" orientation="vertical" />);
    expect(screen.getByTestId("sep")).toHaveClass("h-full", "w-px");
  });
});
