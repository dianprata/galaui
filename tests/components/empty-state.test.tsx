import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
} from "@/components/ui/empty-state";

describe("EmptyState", () => {
  it("renders empty state elements properly", () => {
    render(
      <EmptyState data-testid="empty-box">
        <EmptyStateIcon>Icon</EmptyStateIcon>
        <EmptyStateTitle>Empty Title</EmptyStateTitle>
        <EmptyStateDescription>Empty Description</EmptyStateDescription>
        <EmptyStateActions>Action Button</EmptyStateActions>
      </EmptyState>
    );
    expect(screen.getByTestId("empty-box")).toBeInTheDocument();
    expect(screen.getByText("Empty Title")).toBeInTheDocument();
    expect(screen.getByText("Empty Description")).toBeInTheDocument();
    expect(screen.getByText("Action Button")).toBeInTheDocument();
  });
});
