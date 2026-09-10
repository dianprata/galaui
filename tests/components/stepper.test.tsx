import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Stepper,
  StepItem,
  StepIndicator,
  StepContent,
  StepTitle,
  StepDescription,
  StepSeparator,
} from "@/components/ui/stepper";

describe("Stepper", () => {
  it("renders steps with title and description", () => {
    render(
      <Stepper value={2}>
        <StepItem step={1}>
          <StepIndicator>1</StepIndicator>
          <StepContent>
            <StepTitle>Account</StepTitle>
            <StepDescription>Login details</StepDescription>
          </StepContent>
        </StepItem>
        <StepSeparator />
        <StepItem step={2}>
          <StepIndicator>2</StepIndicator>
          <StepContent>
            <StepTitle>Shipping</StepTitle>
          </StepContent>
        </StepItem>
        <StepSeparator />
        <StepItem step={3}>
          <StepIndicator>3</StepIndicator>
          <StepContent>
            <StepTitle>Payment</StepTitle>
          </StepContent>
        </StepItem>
      </Stepper>
    );

    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Shipping")).toBeInTheDocument();
    expect(screen.getByText("Payment")).toBeInTheDocument();
  });

  it("assigns completed, current, and upcoming states automatically", () => {
    const { container } = render(
      <Stepper value={2}>
        <StepItem step={1}>
          <StepIndicator>1</StepIndicator>
        </StepItem>
        <StepItem step={2}>
          <StepIndicator>2</StepIndicator>
        </StepItem>
        <StepItem step={3}>
          <StepIndicator>3</StepIndicator>
        </StepItem>
      </Stepper>
    );

    const items = container.querySelectorAll("[data-step]");
    expect(items[0]).toHaveAttribute("data-state", "completed");
    expect(items[1]).toHaveAttribute("data-state", "current");
    expect(items[2]).toHaveAttribute("data-state", "upcoming");
  });

  it("handles clickable step selection", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Stepper value={2} onValueChange={handleChange} clickable>
        <StepItem step={1}>
          <StepIndicator>1</StepIndicator>
          <StepContent><StepTitle>Step 1</StepTitle></StepContent>
        </StepItem>
        <StepItem step={2}>
          <StepIndicator>2</StepIndicator>
          <StepContent><StepTitle>Step 2</StepTitle></StepContent>
        </StepItem>
      </Stepper>
    );

    const step1 = screen.getByText("Step 1");
    await user.click(step1);
    expect(handleChange).toHaveBeenCalledWith(1);
  });
});

