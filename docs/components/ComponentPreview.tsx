import type { ReactNode } from "react";
import { useState } from "react";
import { CodeBlock } from "./CodeBlock";
import { Eye, Code as CodeIcon, RefreshCw } from "lucide-react";

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
  const [key, setKey] = useState(0);

  return (
    <div className={`my-6 rounded-2xl border border-border bg-card overflow-hidden shadow-xs ${className}`}>
      {(title || description) && (
        <div className="px-6 py-4 border-b border-border bg-muted/20">
          {title && <h4 className="text-sm font-semibold text-foreground">{title}</h4>}
          {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
        </div>
      )}

      <div className="flex items-center justify-between px-4 py-2 border-b border-border/80 bg-muted/40 text-xs">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setTab("preview")}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
              tab === "preview"
                ? "bg-background text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
          <button
            type="button"
            onClick={() => setTab("code")}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
              tab === "code"
                ? "bg-background text-foreground shadow-xs font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <CodeIcon className="w-3.5 h-3.5" />
            <span>Code</span>
          </button>
        </div>

        {tab === "preview" && (
          <button
            type="button"
            onClick={() => setKey((k) => k + 1)}
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground px-2 py-1 rounded-md transition-colors cursor-pointer"
            title="Reset component state"
          >
            <RefreshCw className="w-3 h-3" />
            <span className="text-[11px]">Reset</span>
          </button>
        )}
      </div>

      {tab === "preview" ? (
        <div
          key={key}
          className="p-8 min-h-[180px] flex items-center justify-center bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] bg-[size:16px_16px] overflow-x-auto"
        >
          <div className="w-full flex items-center justify-center">{children}</div>
        </div>
      ) : (
        <CodeBlock code={code} language="tsx" className="border-0 rounded-none bg-transparent" />
      )}
    </div>
  );
}
