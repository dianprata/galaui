import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { PreviewCard, PreviewCardTrigger, PreviewCardPopup } from "@/components/ui/preview-card";

describe("PreviewCard", () => {
  it("renders trigger element", () => {
    render(
      <PreviewCard>
        <PreviewCardTrigger href="https://galaui.com">GalaUI Link</PreviewCardTrigger>
        <PreviewCardPopup>Preview Details</PreviewCardPopup>
      </PreviewCard>
    );
    expect(screen.getByRole("link", { name: /galaui link/i })).toBeInTheDocument();
  });
});
