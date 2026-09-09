import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Field, FieldLabel, FieldControl, FieldDescription } from "@/components/ui/field";

describe("Field", () => {
  it("renders field hierarchy with label and control", () => {
    render(
      <Field>
        <FieldLabel>Email Address</FieldLabel>
        <FieldControl render={<input placeholder="you@example.com" />} />
        <FieldDescription>Helper note</FieldDescription>
      </Field>
    );
    expect(screen.getByText("Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
    expect(screen.getByText("Helper note")).toBeInTheDocument();
  });
});
