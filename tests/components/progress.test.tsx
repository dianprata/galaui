import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Progress } from "@/components/ui/progress";

describe("Progress", () => {
  it("renders progress element with role and value", () => {
    render(<Progress value={45} aria-label="Uploading" />);
    const prog = screen.getByRole("progressbar", { name: /uploading/i });
    expect(prog).toBeInTheDocument();
    expect(prog).toHaveAttribute("aria-valuenow", "45");
  });
});
