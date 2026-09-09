import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Collapsible, CollapsibleTrigger, CollapsiblePanel } from "@/components/ui/collapsible";

describe("Collapsible", () => {
  it("toggles panel visibility on trigger click", async () => {
    const user = userEvent.setup();
    render(
      <Collapsible defaultOpen={false}>
        <CollapsibleTrigger>Toggle Content</CollapsibleTrigger>
        <CollapsiblePanel>Collapsible Body</CollapsiblePanel>
      </Collapsible>
    );

    const trigger = screen.getByRole("button", { name: /toggle content/i });
    await user.click(trigger);
    expect(await screen.findByText("Collapsible Body")).toBeInTheDocument();
  });
});
