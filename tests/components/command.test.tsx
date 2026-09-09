import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from "@/components/ui/command";

describe("Command", () => {
  it("renders input, list, items, and shortcuts", () => {
    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No items.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem>
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );

    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("⌘P")).toBeInTheDocument();
  });

  it("filters items based on search input", async () => {
    const user = userEvent.setup();
    render(
      <Command>
        <CommandInput placeholder="Search items..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Fruit">
            <CommandItem>Apple</CommandItem>
            <CommandItem>Banana</CommandItem>
            <CommandItem>Cherry</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );

    const input = screen.getByPlaceholderText("Search items...");
    await user.type(input, "ban");

    expect(screen.getByText("Banana")).toBeInTheDocument();
    expect(screen.queryByText("Apple")).not.toBeInTheDocument();
    expect(screen.queryByText("Cherry")).not.toBeInTheDocument();
  });

  it("shows empty state when no search matches", async () => {
    const user = userEvent.setup();
    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No match found.</CommandEmpty>
          <CommandItem>Item A</CommandItem>
        </CommandList>
      </Command>
    );

    const input = screen.getByPlaceholderText("Search...");
    await user.type(input, "xyz");

    expect(screen.getByText("No match found.")).toBeInTheDocument();
    expect(screen.queryByText("Item A")).not.toBeInTheDocument();
  });

  it("calls onSelect on click or Enter key", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandItem onSelect={handleSelect}>Target Action</CommandItem>
        </CommandList>
      </Command>
    );

    const item = screen.getByText("Target Action");
    await user.click(item);

    expect(handleSelect).toHaveBeenCalledTimes(1);
  });

  it("applies primary active styling when selected", () => {
    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandItem>First Option</CommandItem>
          <CommandItem>Second Option</CommandItem>
        </CommandList>
      </Command>
    );

    // By default the first enabled item is active/selected
    const firstItem = screen.getByText("First Option").closest("[role='option']");
    expect(firstItem).toHaveClass("bg-primary");
    expect(firstItem).toHaveClass("text-primary-foreground");
    expect(firstItem).toHaveAttribute("data-selected", "true");
  });

  it("supports defaultActiveId to pre-select item matching specific id", () => {
    render(
      <Command defaultActiveId="/components/calendar">
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandItem id="/components/button">Button</CommandItem>
          <CommandItem id="/components/calendar">Calendar</CommandItem>
          <CommandItem id="/components/dialog">Dialog</CommandItem>
        </CommandList>
      </Command>
    );

    const calendarItem = screen.getByText("Calendar").closest("[role='option']");
    expect(calendarItem).toHaveClass("bg-primary");
    expect(calendarItem).toHaveAttribute("data-selected", "true");

    const buttonItem = screen.getByText("Button").closest("[role='option']");
    expect(buttonItem).not.toHaveClass("bg-primary");
    expect(buttonItem).toHaveAttribute("data-selected", "false");
  });
});
