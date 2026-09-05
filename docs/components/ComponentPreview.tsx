import type { ReactNode } from "react";
import { useState } from "react";
import { CodeBlock } from "./CodeBlock";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Tabs,
  TabsList,
  TabsTab,
  TabsPanel,
  Button,
  Tooltip,
  TooltipTrigger,
  TooltipPopup,
  cn,
} from "@/index";
import { Eye, Code as CodeIcon, Copy, Check } from "lucide-react";

interface ComponentPreviewProps {
  children: ReactNode;
  code: string;
  title?: string;
  description?: string;
  className?: string;
}

export function ComponentPreview({
  children,
  code,
  title,
  description,
  className = "",
}: ComponentPreviewProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore error
    }
  };

  return (
    <Card className={cn("overflow-hidden p-0 not-prose", className)}>
      {(title || description) && (
        <CardHeader className="px-5 py-4 border-b border-border bg-muted/20 space-y-1">
          {title && <CardTitle className="text-sm font-semibold tracking-tight">{title}</CardTitle>}
          {description && <CardDescription className="text-xs">{description}</CardDescription>}
        </CardHeader>
      )}

      <Tabs defaultValue="preview">
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
          <TabsList size="sm">
            <TabsTab value="preview" className="gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </TabsTab>
            <TabsTab value="code" className="gap-1.5">
              <CodeIcon className="w-3.5 h-3.5" />
              <span>Code</span>
            </TabsTab>
          </TabsList>

          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="outline"
                size="icon-sm"
                onClick={onCopy}
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipPopup>{copied ? "Copied code!" : "Copy code"}</TooltipPopup>
          </Tooltip>
        </div>

        <CardContent className="p-0">
          <TabsPanel value="preview">
            <div className="p-8 md:p-12 min-h-[220px] flex items-center justify-center overflow-x-auto stage-dots">
              <div className="w-full flex items-center justify-center">{children}</div>
            </div>
          </TabsPanel>

          <TabsPanel value="code">
            <CodeBlock code={code} language="tsx" showCopy={false} className="my-0 rounded-none border-0 shadow-none" />
          </TabsPanel>
        </CardContent>
      </Tabs>
    </Card>
  );
}

