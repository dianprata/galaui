import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { Input, Textarea } from "@/components/ui/input";

describe("Input", () => {
  it("renders with placeholder and correct default type", () => {
    render(<Input placeholder="Enter email..." />);
    const input = screen.getByPlaceholderText("Enter email...");
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass("border-border");
  });

  it("allows user typing and triggers onChange", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Input placeholder="Name" onChange={handleChange} />);

    const input = screen.getByPlaceholderText("Name") as HTMLInputElement;
    await user.type(input, "GalaUI");

    expect(input.value).toBe("GalaUI");
    expect(handleChange).toHaveBeenCalledTimes(6);
  });

  it("supports controlled input mode", async () => {
    const user = userEvent.setup();
    const ControlledInput = () => {
      const [val, setVal] = React.useState("initial");
      return (
        <Input
          aria-label="Controlled"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
      );
    };

    render(<ControlledInput />);
    const input = screen.getByRole("textbox", { name: /controlled/i });
    expect(input).toHaveValue("initial");

    await user.clear(input);
    await user.type(input, "updated");
    expect(input).toHaveValue("updated");
  });

  it("prevents typing and interaction when disabled", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Input disabled placeholder="Disabled" onChange={handleChange} />);

    const input = screen.getByPlaceholderText("Disabled");
    expect(input).toBeDisabled();
    await user.type(input, "test");
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("applies different size classes", () => {
    const { rerender } = render(<Input size="sm" placeholder="Size Test" />);
    expect(screen.getByPlaceholderText("Size Test")).toHaveClass("h-7");

    rerender(<Input size="lg" placeholder="Size Test" />);
    expect(screen.getByPlaceholderText("Size Test")).toHaveClass("h-9");
  });

  it("forwards ref to native input element", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} placeholder="Ref Test" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.tagName).toBe("INPUT");
  });
});

describe("Textarea", () => {
  it("renders and accepts user typing", async () => {
    const user = userEvent.setup();
    render(<Textarea placeholder="Comments..." />);
    const textarea = screen.getByPlaceholderText("Comments...");

    expect(textarea).toBeInTheDocument();
    await user.type(textarea, "Hello GalaUI");
    expect(textarea).toHaveValue("Hello GalaUI");
  });

  it("disables correctly", () => {
    render(<Textarea disabled placeholder="No edit" />);
    const textarea = screen.getByPlaceholderText("No edit");
    expect(textarea).toBeDisabled();
  });
});
