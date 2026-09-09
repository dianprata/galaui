import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { NumberField, NumberFieldGroup, NumberFieldInput } from "@/components/ui/number-field";

describe("NumberField", () => {
  it("renders number field with initial value", () => {
    render(
      <NumberField defaultValue={25}>
        <NumberFieldGroup>
          <NumberFieldInput aria-label="Quantity" />
        </NumberFieldGroup>
      </NumberField>
    );
    const input = screen.getByRole("textbox", { name: /quantity/i });
    expect(input).toHaveValue("25");
  });
});
