import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

describe("Kbd", () => {
  it("renders kbd and kbd group", () => {
    render(
      <KbdGroup data-testid="group">
        <Kbd>Ctrl</Kbd>
        <Kbd>C</Kbd>
      </KbdGroup>
    );
    expect(screen.getByTestId("group")).toBeInTheDocument();
    expect(screen.getByText("Ctrl")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument();
  });
});
