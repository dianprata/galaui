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
  });
});
