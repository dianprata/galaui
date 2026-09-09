import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

describe("Alert", () => {
  it("renders with title, description, and status variants", () => {
    const { rerender } = render(
      <Alert variant="destructive" role="alert">
        <AlertTitle>Error Alert</AlertTitle>
        <AlertDescription>Something failed</AlertDescription>
      </Alert>
    );
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("text-destructive-600");
    expect(screen.getByText("Error Alert")).toBeInTheDocument();
    expect(screen.getByText("Something failed")).toBeInTheDocument();

    rerender(
      <Alert variant="success" role="alert">
        <AlertTitle>Success Alert</AlertTitle>
      </Alert>
    );
    expect(screen.getByRole("alert")).toHaveClass("text-success-600");
  });
});
