import type { ReactNode } from "react";
import { useState } from "react";
import { CodeBlock } from "./CodeBlock";
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
  const [tab, setTab] = useState<"preview" | "code">("preview");
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
    <div className={`my-8 rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition-all ${className}`}>
      {(title || description) && (
        <div className="px-6 py-3.5 border-b border-border bg-muted/25 flex items-center justify-between">
          <div>
            {title && <h4 className="text-sm font-semibold text-foreground tracking-tight">{title}</h4>}
            {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-muted/40 text-xs">
        <div className="inline-flex p-0.5 rounded-lg bg-muted border border-border/60">
          <button
            type="button"
            onClick={() => setTab("preview")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
              tab === "preview"
                ? "bg-background text-foreground shadow-xs font-semibold scale-100"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
          <button
            type="button"
            onClick={() => setTab("code")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
              tab === "code"
                ? "bg-background text-foreground shadow-xs font-semibold scale-100"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <CodeIcon className="w-3.5 h-3.5" />
            <span>Code</span>
          </button>
        </div>

        <div className="flex items-center gap-1">
          {tab === "preview" && (
            <div className="hidden sm:flex items-center gap-0.5 border border-border/60 rounded-md p-0.5 bg-background mr-1">
              <button
                type="button"
                onClick={() => setBgStyle("dots")}
                className={`p-1 rounded text-muted-foreground hover:text-foreground transition-colors cursor-pointer ${bgStyle === "dots" ? "bg-muted text-foreground" : ""}`}
                title="Dot grid background"
              >
                <CircleDot className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => setBgStyle("lines")}
                className={`p-1 rounded text-muted-foreground hover:text-foreground transition-colors cursor-pointer ${bgStyle === "lines" ? "bg-muted text-foreground" : ""}`}
                title="Grid lines background"
              >
                <Grid className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => setBgStyle("solid")}
                className={`p-1 rounded text-muted-foreground hover:text-foreground transition-colors cursor-pointer ${bgStyle === "solid" ? "bg-muted text-foreground" : ""}`}
                title="Solid background"
              >
                <Square className="w-3 h-3" />
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setKey((k) => k + 1)}
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground p-1.5 rounded-md hover:bg-muted transition-colors cursor-pointer"
            title="Reset component state"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={onCopy}
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground p-1.5 rounded-md hover:bg-muted transition-colors cursor-pointer ml-0.5"
            title="Copy component code"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {tab === "preview" ? (
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
      ) : (
        <div className="border-0 m-0">
          <CodeBlock code={code} language="tsx" className="my-0 rounded-none border-0" />
        </div>
      )}
    </div>
  );
}
