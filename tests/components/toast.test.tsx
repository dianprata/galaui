import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toaster, toast, defaultToastManager } from "@/components/ui/toast";

describe("Toast & Toaster", () => {
  beforeEach(() => {
    // Clear any pending toasts between runs
    try {
      (defaultToastManager as any).toasts?.forEach((t: any) => defaultToastManager.close(t.id));
    } catch {
      // ignore
    }
  });

  it("renders toast when toast.show is called", async () => {
    render(<Toaster />);

    toast.show("Notification Title", "Notification Details");

    expect(await screen.findByText("Notification Title")).toBeInTheDocument();
    expect(screen.getByText("Notification Details")).toBeInTheDocument();
  });

  it("renders success and error variants correctly", async () => {
    render(<Toaster />);

    toast.success("Success Notification", "Operation finished");
    expect(await screen.findByText("Success Notification")).toBeInTheDocument();

    toast.error("Error Notification", "Something went wrong");
    expect(await screen.findByText("Error Notification")).toBeInTheDocument();
  });

  it("allows dismissing a toast via close button", async () => {
    const user = userEvent.setup();
    render(<Toaster />);

    toast.show("Dismiss Me", "Will be closed");
    expect(await screen.findByText("Dismiss Me")).toBeInTheDocument();

    const closeBtn = screen.getByText("Close");
    await user.click(closeBtn);

    await waitFor(() => {
      expect(screen.queryByText("Dismiss Me")).not.toBeInTheDocument();
    });
  });
});
