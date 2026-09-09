import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

describe("AspectRatio", () => {
  it("applies aspectRatio inline style correctly", () => {
    render(
      <AspectRatio ratio={16 / 9} data-testid="ratio">
        <div>Content</div>
      </AspectRatio>
    );
    const el = screen.getByTestId("ratio");
    expect(el).toHaveStyle({ aspectRatio: `${16 / 9}` });
  });
});
