import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTab, TabsPanel } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Accordion, AccordionItem, AccordionTrigger, AccordionPanel } from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";
import { Meter, MeterTrack, MeterIndicator, MeterLabel } from "@/components/ui/meter";
import { Checkbox } from "@/components/ui/checkbox";
import { EmptyState, EmptyStateTitle, EmptyStateDescription } from "@/components/ui/empty-state";

describe("Automated Accessibility (A11y - WCAG Compliance)", () => {
  it("Button passes axe checks", async () => {
    const { container } = render(<Button>Submit form</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Badge passes axe checks", async () => {
    const { container } = render(<Badge variant="outline">Verified</Badge>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Alert passes axe checks", async () => {
    const { container } = render(
      <Alert variant="info">
        <AlertTitle>Notice</AlertTitle>
        <AlertDescription>System maintenance scheduled for tonight.</AlertDescription>
      </Alert>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Card structure passes axe checks", async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Account Overview</CardTitle>
          <CardDescription>View your active profile information</CardDescription>
        </CardHeader>
        <CardContent>All systems operating normally.</CardContent>
      </Card>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Form controls (Input, Textarea, Checkbox, Switch) pass axe checks with labels", async () => {
    const { container } = render(
      <form>
        <label htmlFor="username">Username</label>
        <Input id="username" placeholder="johndoe" />

        <label htmlFor="bio">Bio</label>
        <Textarea id="bio" placeholder="Tell us about yourself" />

        <label htmlFor="terms">
          <Checkbox id="terms" /> I agree to terms
        </label>

        <label htmlFor="notifs">Enable notifications</label>
        <Switch id="notifs" />
      </form>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Tabs pass axe checks", async () => {
    const { container } = render(
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTab value="account">Account</TabsTab>
          <TabsTab value="password">Password</TabsTab>
        </TabsList>
        <TabsPanel value="account">Account settings content</TabsPanel>
        <TabsPanel value="password">Password change content</TabsPanel>
      </Tabs>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Breadcrumb navigation passes axe checks", async () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Button</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Accordion passes axe checks", async () => {
    const { container } = render(
      <Accordion defaultValue={["item-1"]}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionPanel>Yes, it adheres to WAI-ARIA design pattern.</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("Status meters and progress indicators pass axe checks", async () => {
    const { container } = render(
      <div>
        <Progress value={60} aria-label="Upload progress">
          <ProgressTrack>
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>

        <Meter value={75} min={0} max={100}>
          <MeterLabel>Storage quota</MeterLabel>
          <MeterTrack>
            <MeterIndicator />
          </MeterTrack>
        </Meter>
      </div>
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("EmptyState and decorative primitives pass axe checks", async () => {
    const { container } = render(
      <div>
        <EmptyState>
          <EmptyStateTitle>No results found</EmptyStateTitle>
          <EmptyStateDescription>Try searching for a different keyword.</EmptyStateDescription>
        </EmptyState>
        <Separator />
        <Skeleton className="h-4 w-32" />
        <Avatar>
          <AvatarFallback>DP</AvatarFallback>
        </Avatar>
      </div>
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
