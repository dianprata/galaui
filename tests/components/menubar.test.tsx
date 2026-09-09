import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarPopup,
  MenubarItem,
} from "@/components/ui/menubar";

describe("Menubar", () => {
  it("renders menubar structure and trigger", () => {
    render(
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarPopup>
            <MenubarItem>New Tab</MenubarItem>
          </MenubarPopup>
        </MenubarMenu>
      </Menubar>
    );
    expect(screen.getByRole("menubar")).toBeInTheDocument();
    expect(screen.getByText("File")).toBeInTheDocument();
  });
});
