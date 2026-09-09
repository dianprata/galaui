import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Combobox, ComboboxInputGroup, ComboboxInput } from "@/components/ui/combobox";

describe("Combobox", () => {
  it("renders input group with placeholder", () => {
    render(
      <Combobox items={["Alpha", "Beta"]}>
        <ComboboxInputGroup>
          <ComboboxInput placeholder="Select item..." />
        </ComboboxInputGroup>
      </Combobox>
    );
    expect(screen.getByPlaceholderText("Select item...")).toBeInTheDocument();
  });
});
