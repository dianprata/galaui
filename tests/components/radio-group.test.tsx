import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

describe("RadioGroup", () => {
  it("selects radio items on click", async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup defaultValue="opt1" aria-label="Options">
        <RadioGroupItem value="opt1" aria-label="Option 1" />
        <RadioGroupItem value="opt2" aria-label="Option 2" />
      </RadioGroup>
    );
    const opt1 = screen.getByRole("radio", { name: /option 1/i });
    const opt2 = screen.getByRole("radio", { name: /option 2/i });

    expect(opt1).toHaveAttribute("aria-checked", "true");
    expect(opt2).toHaveAttribute("aria-checked", "false");

    await user.click(opt2);
    expect(opt2).toHaveAttribute("aria-checked", "true");
    expect(opt1).toHaveAttribute("aria-checked", "false");
  });
});
