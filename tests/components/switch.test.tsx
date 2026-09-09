import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { Switch } from "@/components/ui/switch";

describe("Switch", () => {
  it("renders with role=switch and unchecked by default", () => {
    render(<Switch aria-label="Notifications" />);
    const toggle = screen.getByRole("switch", { name: /notifications/i });
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });

  it("toggles state on click", async () => {
    const user = userEvent.setup();
    render(<Switch aria-label="Airplane Mode" />);
    const toggle = screen.getByRole("switch", { name: /airplane mode/i });

    expect(toggle).toHaveAttribute("aria-checked", "false");
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "true");

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });

  it("toggles state via keyboard space key", async () => {
    const user = userEvent.setup();
    render(<Switch aria-label="Sound" />);
    const toggle = screen.getByRole("switch", { name: /sound/i });

    toggle.focus();
    expect(toggle).toHaveFocus();
    await user.keyboard(" ");
    expect(toggle).toHaveAttribute("aria-checked", "true");
  });

  it("supports controlled mode with onCheckedChange", async () => {
    const user = userEvent.setup();
    const handleCheckedChange = vi.fn();
    const Controlled = () => {
      const [checked, setChecked] = React.useState(false);
      return (
        <Switch
          aria-label="Controlled Switch"
          checked={checked}
          onCheckedChange={(val) => {
            setChecked(val);
            handleCheckedChange(val);
          }}
        />
      );
    };

    render(<Controlled />);
    const toggle = screen.getByRole("switch", { name: /controlled switch/i });
    expect(toggle).toHaveAttribute("aria-checked", "false");

    await user.click(toggle);
    expect(handleCheckedChange).toHaveBeenCalledWith(true);
    expect(toggle).toHaveAttribute("aria-checked", "true");
  });

  it("does not toggle when disabled", async () => {
    const user = userEvent.setup();
    const handleCheckedChange = vi.fn();
    render(
      <Switch
        disabled
        aria-label="Disabled Switch"
        onCheckedChange={handleCheckedChange}
      />
    );
    const toggle = screen.getByRole("switch", { name: /disabled switch/i });
    expect(toggle).toHaveAttribute("aria-disabled", "true");

    await user.click(toggle);
    expect(handleCheckedChange).not.toHaveBeenCalled();
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });

  it("applies size variant classes", () => {
    const { rerender } = render(<Switch size="xs" aria-label="Size XS" />);
    expect(screen.getByRole("switch", { name: /size xs/i })).toHaveClass("h-4", "w-7");

    rerender(<Switch size="lg" aria-label="Size LG" />);
    expect(screen.getByRole("switch", { name: /size lg/i })).toHaveClass("h-7", "w-[52px]");
  });
});
