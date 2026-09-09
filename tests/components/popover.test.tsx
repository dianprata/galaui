import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Popover, PopoverTrigger, PopoverPopup } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

describe("Popover", () => {
  it("opens popover popup on trigger click", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger render={<Button>Open Popover</Button>} />
        <PopoverPopup>Popover Details Content</PopoverPopup>
      </Popover>
    );

    const trigger = screen.getByRole("button", { name: /open popover/i });
    await user.click(trigger);

    expect(await screen.findByText("Popover Details Content")).toBeInTheDocument();
  });
});
