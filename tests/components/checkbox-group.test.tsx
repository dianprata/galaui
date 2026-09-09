import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxGroup } from "@/components/ui/checkbox-group";

describe("CheckboxGroup", () => {
  it("renders a collection of checkboxes inside group", () => {
    render(
      <CheckboxGroup data-testid="group">
        <Checkbox aria-label="Option A" />
        <Checkbox aria-label="Option B" />
      </CheckboxGroup>
    );
    expect(screen.getByTestId("group")).toBeInTheDocument();
    expect(screen.getAllByRole("checkbox")).toHaveLength(2);
  });
});
