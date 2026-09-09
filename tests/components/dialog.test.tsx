import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogPopup,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

describe("Dialog", () => {
  it("opens dialog on trigger click and displays content", async () => {
    const user = userEvent.setup();
    render(
      <Dialog>
        <DialogTrigger render={<Button>Open Dialog</Button>} />
        <DialogPopup>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog Description Details</DialogDescription>
          </DialogHeader>
          <p>Dialog Body</p>
        </DialogPopup>
      </Dialog>
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    const trigger = screen.getByRole("button", { name: /open dialog/i });
    await user.click(trigger);

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText("Dialog Title")).toBeInTheDocument();
    expect(screen.getByText("Dialog Description Details")).toBeInTheDocument();
    expect(screen.getByText("Dialog Body")).toBeInTheDocument();
  });

  it("closes dialog when close button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Dialog defaultOpen>
        <DialogPopup>
          <DialogHeader>
            <DialogTitle>Closeable Dialog</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button>Dismiss</Button>} />
          </DialogFooter>
        </DialogPopup>
      </Dialog>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    const dismissBtn = screen.getByRole("button", { name: /dismiss/i });
    await user.click(dismissBtn);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("supports controlled open state via onOpenChange", async () => {
    const user = userEvent.setup();
    const handleOpenChange = vi.fn();

    const ControlledDialog = () => {
      const [open, setOpen] = React.useState(false);
      return (
        <Dialog
          open={open}
          onOpenChange={(val) => {
            setOpen(val);
            handleOpenChange(val);
          }}
        >
          <DialogTrigger render={<Button>Open Controlled</Button>} />
          <DialogPopup>
            <DialogTitle>Controlled Modal</DialogTitle>
          </DialogPopup>
        </Dialog>
      );
    };

    render(<ControlledDialog />);
    const trigger = screen.getByRole("button", { name: /open controlled/i });
    await user.click(trigger);

    expect(handleOpenChange).toHaveBeenCalledWith(true);
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });
});
