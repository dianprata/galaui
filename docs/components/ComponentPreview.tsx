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
} from "@/index";
import { Eye, Code as CodeIcon, RefreshCw, Copy, Check, Grid, CircleDot, Square } from "lucide-react";

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
  const [bgStyle, setBgStyle] = useState<"dots" | "lines" | "solid">("dots");
  const [key, setKey] = useState(0);
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
    <Card className={`my-8 overflow-hidden p-0 ${className}`}>
      {(title || description) && (
        <CardHeader className="px-6 py-4 border-b border-border bg-muted/20 space-y-1">
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

          <div className="flex items-center gap-1.5">
            <div className="hidden sm:flex items-center gap-1 border border-border/70 rounded-lg p-0.5 bg-background">
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant={bgStyle === "dots" ? "secondary" : "ghost"}
                    size="icon-xs"
                    onClick={() => setBgStyle("dots")}
                  >
                    <CircleDot className="w-3 h-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipPopup>Dot grid canvas</TooltipPopup>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant={bgStyle === "lines" ? "secondary" : "ghost"}
                    size="icon-xs"
                    onClick={() => setBgStyle("lines")}
                  >
                    <Grid className="w-3 h-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipPopup>Grid lines canvas</TooltipPopup>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant={bgStyle === "solid" ? "secondary" : "ghost"}
                    size="icon-xs"
                    onClick={() => setBgStyle("solid")}
                  >
                    <Square className="w-3 h-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipPopup>Clean solid canvas</TooltipPopup>
              </Tooltip>
            </div>

            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  size="icon-xs"
                  onClick={() => setKey((k) => k + 1)}
                >
                  <RefreshCw className="w-3 h-3" />
                </Button>
              </TooltipTrigger>
              <TooltipPopup>Reset preview state</TooltipPopup>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  size="icon-xs"
                  onClick={onCopy}
                >
                  {copied ? (
                    <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipPopup>{copied ? "Copied code!" : "Copy code"}</TooltipPopup>
            </Tooltip>
          </div>
        </div>

        <CardContent className="p-0">
          <TabsPanel value="preview">
            <div
              key={key}
              className={`p-8 md:p-12 min-h-[220px] flex items-center justify-center overflow-x-auto transition-colors ${
                bgStyle === "dots"
                  ? "stage-dots"
                  : bgStyle === "lines"
                  ? "stage-lines"
                  : "stage-solid"
              }`}
            >
              <div className="w-full flex items-center justify-center">{children}</div>
            </div>
          </TabsPanel>

          <TabsPanel value="code">
            <CodeBlock code={code} language="tsx" className="my-0 rounded-none border-0" />
          </TabsPanel>
        </CardContent>
      </Tabs>
    </Card>
  );
}

