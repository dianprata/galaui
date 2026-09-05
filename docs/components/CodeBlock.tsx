import { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-css";
import "prismjs/components/prism-json";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = "tsx", className = "" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [code, language]);

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
    <div className={`relative group rounded-xl border border-border bg-muted/50 overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/60 bg-muted/40 text-xs text-muted-foreground font-mono">
        <span>{language}</span>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium hover:bg-background/80 hover:text-foreground transition-all cursor-pointer select-none"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-xs leading-relaxed font-mono">
        <code className={`language-${language}`}>{code.trim()}</code>
      </pre>
    </div>
  );
}
