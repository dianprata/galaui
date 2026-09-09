import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { InputOTP, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";

describe("InputOTP", () => {
  it("renders slots and separator correctly", () => {
    render(
      <InputOTP length={4}>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSeparator />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTP>
    );
    expect(screen.getAllByRole("textbox")).toHaveLength(4);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });
});
