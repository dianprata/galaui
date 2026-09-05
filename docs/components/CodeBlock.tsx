import { useEffect, useState } from "react";
import { highlightCode } from "../lib/highlighter";
import { Button, cn } from "@/index";
import { Check, Copy, Terminal } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  filename?: string;
  showCopy?: boolean;
}

export function CodeBlock({
  code,
  language = "tsx",
  className = "",
  filename,
  showCopy = true,
}: CodeBlockProps) {
  const [html, setHtml] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    highlightCode(code, language).then((res) => {
      if (active) setHtml(res);
    });
    return () => {
      active = false;
    };
  }, [code, language]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const isBash = language === "bash" || language === "sh";

  return (
    <div
      className={cn(
        "shiki-container not-prose relative group my-4 rounded-xl border border-border bg-card text-foreground overflow-hidden transition-colors",
        className
      )}
    >
      {(filename || showCopy) && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/40 text-xs font-mono">
        <div className="flex items-center gap-2 text-muted-foreground">
          {isBash ? <Terminal className="w-3.5 h-3.5 text-muted-foreground/70" /> : null}
          <span className="text-[11px] font-medium text-foreground/80">{filename || language}</span>
        </div>

        {showCopy && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onCopy}
            title="Copy code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
              </>
            )}
          </Button>
        )}
      </div>
      )}

      {html ? (
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          className="overflow-x-auto text-xs font-mono leading-relaxed"
        />
      ) : (
        <pre className="p-4 overflow-x-auto text-xs font-mono leading-relaxed text-muted-foreground">
          <code>{code.trim()}</code>
        </pre>
      )}
    </div>
  );
}
