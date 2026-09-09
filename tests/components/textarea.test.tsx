import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { Textarea } from "@/components/ui/textarea";

describe("Textarea", () => {
  it("renders and accepts user typing", async () => {
    const user = userEvent.setup();
    render(<Textarea placeholder="Write comments..." />);
    const ta = screen.getByPlaceholderText("Write comments...");
    expect(ta).toBeInTheDocument();

    await user.type(ta, "Hello World");
    expect(ta).toHaveValue("Hello World");
  });

  it("disables correctly", () => {
    render(<Textarea disabled placeholder="Disabled area" />);
    const ta = screen.getByPlaceholderText("Disabled area");
    expect(ta).toBeDisabled();
  });
});
