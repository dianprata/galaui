import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Toolbar, ToolbarButton, ToolbarSeparator, ToolbarInput } from "@/components/ui/toolbar";

describe("Toolbar", () => {
  it("renders toolbar with button and input", () => {
    render(
      <Toolbar aria-label="Formatting Toolbar">
        <ToolbarButton>Bold</ToolbarButton>
        <ToolbarSeparator />
        <ToolbarInput placeholder="Search..." />
      </Toolbar>
    );
    expect(screen.getByRole("toolbar", { name: /formatting toolbar/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /bold/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });
});
