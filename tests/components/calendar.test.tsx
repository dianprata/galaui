import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Calendar } from "@/components/ui/calendar";

describe("Calendar", () => {
  it("renders month grid and triggers onSelect", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();
    const testDate = new Date(2026, 5, 15);

    render(
      <Calendar
        defaultMonth={testDate}
        mode="single"
        onSelect={handleSelect}
      />
    );

    expect(screen.getByText("June 2026")).toBeInTheDocument();
    const dayButton = screen.getByRole("button", { name: "15" });
    await user.click(dayButton);

    expect(handleSelect).toHaveBeenCalledTimes(1);
  });
});
