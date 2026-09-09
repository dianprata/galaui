import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Skeleton } from "@/components/ui/skeleton";

describe("Skeleton", () => {
  it("renders skeleton placeholder with pulse animation", () => {
    render(<Skeleton data-testid="skel" className="h-6 w-24" />);
    const skel = screen.getByTestId("skel");
    expect(skel).toHaveClass("animate-pulse", "h-6", "w-24");
  });
});
