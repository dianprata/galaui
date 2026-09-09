import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Label } from "@/components/ui/label";

describe("Label", () => {
  it("renders label element with htmlFor attribute", () => {
    render(<Label htmlFor="input-id">Username</Label>);
    const label = screen.getByText("Username");
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute("for", "input-id");
  });
});
