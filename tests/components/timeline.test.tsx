import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineTime,
} from "@/components/ui/timeline";

describe("Timeline", () => {
  it("renders timeline items with titles and times", () => {
    render(
      <Timeline>
        <TimelineItem>
          <TimelineConnector />
          <TimelineDot variant="success">✓</TimelineDot>
          <TimelineContent>
            <TimelineTitle>Deployed</TimelineTitle>
            <TimelineTime>10:00 AM</TimelineTime>
            <TimelineDescription>Shipped to production</TimelineDescription>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineDot variant="default" />
          <TimelineContent>
            <TimelineTitle>Merged PR</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    );

    expect(screen.getByText("Deployed")).toBeInTheDocument();
    expect(screen.getByText("10:00 AM")).toBeInTheDocument();
    expect(screen.getByText("Shipped to production")).toBeInTheDocument();
    expect(screen.getByText("Merged PR")).toBeInTheDocument();
  });

  it("applies dot variant classes correctly", () => {
    render(
      <Timeline>
        <TimelineItem>
          <TimelineDot variant="destructive" data-testid="dot" />
        </TimelineItem>
      </Timeline>
    );

    const dot = screen.getByTestId("dot");
    expect(dot).toHaveClass("bg-destructive-500");
  });
});
