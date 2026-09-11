import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

describe("Select", () => {
  it("renders trigger and placeholder", () => {
    render(
      <Select>
        <SelectTrigger aria-label="Select country">
          <SelectValue placeholder="Choose country..." />
        </SelectTrigger>
      </Select>
    );
    expect(screen.getByRole("combobox", { name: /select country/i })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /select country/i })).toHaveClass("text-sm");
    expect(screen.getByText("Choose country...")).toBeInTheDocument();
  });
});
