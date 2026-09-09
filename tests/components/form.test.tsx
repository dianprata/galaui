import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Form } from "@/components/ui/form";

describe("Form", () => {
  it("renders form container and children", () => {
    render(
      <Form data-testid="custom-form">
        <button type="submit">Submit Form</button>
      </Form>
    );
    expect(screen.getByTestId("custom-form")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit form/i })).toBeInTheDocument();
  });
});
