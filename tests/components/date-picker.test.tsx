import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("selects date and clears with clearable button", async () => {
    const user = userEvent.setup();
    let selected: Date | undefined = new Date(2026, 5, 10);
    const { rerender } = render(
      <DatePicker
        value={selected}
        onChange={(d) => {
          selected = d;
        }}
        clearable
      />
    );

    const clearBtn = screen.getByRole("button", { name: /clear date/i });
    await user.click(clearBtn);
    expect(selected).toBeUndefined();

    rerender(
      <DatePicker
        value={selected}
        placeholder="Pick target release"
        onChange={(d) => {
          selected = d;
        }}
        clearable
      />
    );
    expect(screen.getByText("Pick target release")).toBeInTheDocument();
  });
});
