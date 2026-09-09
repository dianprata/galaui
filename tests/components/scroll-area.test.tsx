import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

describe("ScrollArea", () => {
  it("renders viewport with child content", () => {
    render(
      <ScrollArea data-testid="scroll-container">
        <div>Scrollable Content</div>
      </ScrollArea>
    );
    expect(screen.getByTestId("scroll-container")).toBeInTheDocument();
    expect(screen.getByText("Scrollable Content")).toBeInTheDocument();
  });
});
