import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Tooltip, TooltipTrigger, TooltipPopup, TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

describe("Tooltip", () => {
  it("renders trigger and tooltip structure", () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger render={<Button>Hover Trigger</Button>} />
          <TooltipPopup>Tooltip Text</TooltipPopup>
        </Tooltip>
      </TooltipProvider>
    );
    expect(screen.getByRole("button", { name: /hover trigger/i })).toBeInTheDocument();
  });
});
