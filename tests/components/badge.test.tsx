import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/badge";

describe("Badge", () => {
  it("renders badge variants correctly", () => {
    const { rerender } = render(<Badge>Default</Badge>);
    expect(screen.getByText("Default")).toHaveClass("bg-primary");

    rerender(<Badge variant="secondary">Secondary</Badge>);
    expect(screen.getByText("Secondary")).toHaveClass("bg-secondary");

    rerender(<Badge variant="destructive">Destructive</Badge>);
    expect(screen.getByText("Destructive")).toHaveClass("bg-destructive");

    rerender(<Badge variant="success">Success</Badge>);
    expect(screen.getByText("Success")).toHaveClass("text-emerald-700");
  });

  it("renders badge sizes correctly", () => {
    const { rerender } = render(<Badge>Default Badge</Badge>);
    expect(screen.getByText("Default Badge")).toHaveClass("h-5");

    rerender(<Badge size="xs">Extra Small Badge</Badge>);
    expect(screen.getByText("Extra Small Badge")).toHaveClass("h-4");

    rerender(<Badge size="sm">Small Badge</Badge>);
    expect(screen.getByText("Small Badge")).toHaveClass("h-4.5");

    rerender(<Badge size="lg">Large Badge</Badge>);
    expect(screen.getByText("Large Badge")).toHaveClass("h-6");
  });
});
