import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";

describe("Checkbox", () => {
  it("toggles checked state when clicked", async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="Agree" />);
    const cb = screen.getByRole("checkbox", { name: /agree/i });

    expect(cb).toHaveAttribute("aria-checked", "false");
    await user.click(cb);
    expect(cb).toHaveAttribute("aria-checked", "true");
    await user.click(cb);
    expect(cb).toHaveAttribute("aria-checked", "false");
  });
});
