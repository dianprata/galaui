import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Fieldset, FieldsetLegend, FieldsetDescription } from "@/components/ui/fieldset";
import { Field, FieldLabel, FieldControl } from "@/components/ui/field";

describe("Fieldset", () => {
  it("renders fieldset with legend and description", () => {
    render(
      <Fieldset data-testid="test-fieldset">
        <FieldsetLegend>Account Settings</FieldsetLegend>
        <FieldsetDescription>Manage your login details</FieldsetDescription>
        <Field>
          <FieldLabel>Username</FieldLabel>
          <FieldControl placeholder="johndoe" />
        </Field>
      </Fieldset>
    );

    expect(screen.getByTestId("test-fieldset")).toBeInTheDocument();
    expect(screen.getByText("Account Settings")).toBeInTheDocument();
    expect(screen.getByText("Manage your login details")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("johndoe")).toBeInTheDocument();
  });

  it("applies variant classes properly", () => {
    const { rerender } = render(
      <Fieldset variant="bordered" data-testid="variant-fieldset">
        <FieldsetLegend>Bordered</FieldsetLegend>
      </Fieldset>
    );
    expect(screen.getByTestId("variant-fieldset")).toHaveClass("border");

    rerender(
      <Fieldset variant="card" data-testid="variant-fieldset">
        <FieldsetLegend>Card</FieldsetLegend>
      </Fieldset>
    );
    expect(screen.getByTestId("variant-fieldset")).toHaveClass("bg-card");
  });

  it("cascades disabled state to child fields", () => {
    render(
      <Fieldset disabled data-testid="disabled-fieldset">
        <FieldsetLegend>Disabled Section</FieldsetLegend>
        <Field>
          <FieldLabel>Email</FieldLabel>
          <FieldControl placeholder="disabled@example.com" />
        </Field>
      </Fieldset>
    );

    const fieldset = screen.getByTestId("disabled-fieldset");
    expect(fieldset).toHaveAttribute("disabled");
    expect(screen.getByPlaceholderText("disabled@example.com")).toBeDisabled();
  });
});

