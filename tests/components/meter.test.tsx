import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Meter } from "@/components/ui/meter";

describe("Meter", () => {
  it("renders meter element with role and value", () => {
    render(<Meter value={75} aria-label="Storage" />);
    const meter = screen.getByRole("meter", { name: /storage/i });
    expect(meter).toBeInTheDocument();
    expect(meter).toHaveAttribute("aria-valuenow", "75");
  });
});
