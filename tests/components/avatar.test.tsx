import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

describe("Avatar", () => {
  it("renders avatar container and fallback content", () => {
    render(
      <Avatar size="lg" data-testid="avatar">
        <AvatarImage src="/user.jpg" alt="User" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
    expect(screen.getByTestId("avatar")).toBeInTheDocument();
    expect(screen.getByText("JD")).toBeInTheDocument();
    expect(screen.getByTestId("avatar")).toHaveClass("size-9");
  });

  it("renders canonical sizes correctly", () => {
    const { rerender } = render(<Avatar data-testid="avatar-size" />);
    expect(screen.getByTestId("avatar-size")).toHaveClass("size-8");

    rerender(<Avatar size="xs" data-testid="avatar-size" />);
    expect(screen.getByTestId("avatar-size")).toHaveClass("size-6");

    rerender(<Avatar size="sm" data-testid="avatar-size" />);
    expect(screen.getByTestId("avatar-size")).toHaveClass("size-7");

    rerender(<Avatar size="lg" data-testid="avatar-size" />);
    expect(screen.getByTestId("avatar-size")).toHaveClass("size-9");
  });
});
