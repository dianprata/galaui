import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/tabs";

describe("Tabs", () => {
  it("switches active tab panel on tab click", async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTab value="tab1">Tab 1</TabsTab>
          <TabsTab value="tab2">Tab 2</TabsTab>
        </TabsList>
        <TabsPanel value="tab1">Panel Content 1</TabsPanel>
        <TabsPanel value="tab2">Panel Content 2</TabsPanel>
      </Tabs>
    );

    expect(screen.getByText("Panel Content 1")).toBeInTheDocument();
    const tab2 = screen.getByRole("tab", { name: /tab 2/i });
    expect(tab2).toHaveClass("text-sm");
    await user.click(tab2);

    expect(await screen.findByText("Panel Content 2")).toBeInTheDocument();
  });
});
