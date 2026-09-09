import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuPortal,
  ContextMenuPositioner,
  ContextMenuPopup,
  ContextMenuItem,
} from "@/components/ui/context-menu";

describe("ContextMenu", () => {
  it("renders trigger element", () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right click area</ContextMenuTrigger>
        <ContextMenuPortal>
          <ContextMenuPositioner>
            <ContextMenuPopup>
              <ContextMenuItem>Item 1</ContextMenuItem>
            </ContextMenuPopup>
          </ContextMenuPositioner>
        </ContextMenuPortal>
      </ContextMenu>
    );
    expect(screen.getByText("Right click area")).toBeInTheDocument();
  });
});
