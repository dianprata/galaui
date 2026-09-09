import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Drawer, DrawerTrigger, DrawerPopup, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

describe("Drawer", () => {
  it("opens drawer dialog on trigger click", async () => {
    const user = userEvent.setup();
    render(
      <Drawer>
        <DrawerTrigger render={<Button>Open Drawer</Button>} />
        <DrawerPopup>
          <DrawerTitle>Drawer Content Title</DrawerTitle>
        </DrawerPopup>
      </Drawer>
    );

    const trigger = screen.getByRole("button", { name: /open drawer/i });
    await user.click(trigger);

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Drawer Content Title")).toBeInTheDocument();
  });
});
