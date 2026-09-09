import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion, AccordionItem, AccordionTrigger, AccordionPanel } from "@/components/ui/accordion";

describe("Accordion", () => {
  it("renders and toggles accordion items on click", async () => {
    const user = userEvent.setup();
    render(
      <Accordion defaultValue={["item-1"]}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionPanel>Content 1</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionPanel>Content 2</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );

    expect(screen.getByText("Content 1")).toBeInTheDocument();
    const trigger2 = screen.getByRole("button", { name: /section 2/i });
    await user.click(trigger2);

    expect(await screen.findByText("Content 2")).toBeInTheDocument();
  });
});
