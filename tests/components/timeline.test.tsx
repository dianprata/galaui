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
    expect(screen.getByText("Deployed")).toHaveClass("text-sm");
    expect(screen.getByText("10:00 AM")).toBeInTheDocument();
    expect(screen.getByText("10:00 AM")).toHaveClass("text-xs");
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

  it("supports left alignment and alternate side layouts", () => {
    const { container } = render(
      <Timeline align="alternate" data-testid="timeline">
        <TimelineItem side="left">
          <TimelineContent>Left Item</TimelineContent>
        </TimelineItem>
        <TimelineItem side="right">
          <TimelineContent>Right Item</TimelineContent>
        </TimelineItem>
      </Timeline>
    );

    const list = container.querySelector("ol");
    expect(list).toHaveAttribute("data-align", "alternate");

    const items = container.querySelectorAll("li");
    expect(items[0]).toHaveAttribute("data-side", "left");
    expect(items[1]).toHaveAttribute("data-side", "right");
  });

  it("supports horizontal orientation layout", () => {
    const { container } = render(
      <Timeline orientation="horizontal">
        <TimelineItem>
          <TimelineConnector data-testid="connector-1" />
          <TimelineDot variant="success" />
          <TimelineContent>
            <TimelineTitle>Step 1</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineConnector data-testid="connector-2" />
          <TimelineDot />
          <TimelineContent>
            <TimelineTitle>Step 2</TimelineTitle>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    );

    const list = container.querySelector("ol");
    expect(list).toHaveAttribute("data-orientation", "horizontal");
    expect(list).toHaveClass("flex-row");

    const items = container.querySelectorAll("li");
    expect(items[0]).toHaveClass("flex-col");

    const connector = screen.getByTestId("connector-1");
    expect(connector).toHaveClass("h-0.5");
  });
});
