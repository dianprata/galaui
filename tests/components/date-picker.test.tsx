import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { DatePicker, DateRangePicker } from "@/components/ui/date-picker";

describe("DatePicker & DateRangePicker", () => {
  it("renders date picker trigger and opens popup", async () => {
    const user = userEvent.setup();
    render(<DatePicker placeholder="Pick Date" />);

    const trigger = screen.getByRole("button", { name: /pick date/i });
    expect(trigger).toBeInTheDocument();

    await user.click(trigger);
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });

  it("renders date range picker trigger", () => {
    render(<DateRangePicker placeholder="Select range" />);
    expect(screen.getByRole("button", { name: /select range/i })).toBeInTheDocument();
  });
});
