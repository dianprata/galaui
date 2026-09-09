import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toggle } from "@/components/ui/toggle";

describe("Toggle", () => {
  it("toggles pressed state on click", async () => {
    const user = userEvent.setup();
    render(<Toggle aria-label="Toggle Bold">B</Toggle>);
    const toggle = screen.getByRole("button", { name: /toggle bold/i });

    expect(toggle).toHaveAttribute("aria-pressed", "false");
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
  });
});
