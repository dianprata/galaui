import { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-css";
import "prismjs/components/prism-json";
import { Check, Copy } from "lucide-react";
import { Terminal } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  filename?: string;
}

export function CodeBlock({ code, language = "tsx", className = "", filename }: CodeBlockProps) {
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

  const isBash = language === "bash" || language === "sh";

  return (
    <div className={`relative group my-4 rounded-xl border border-border/80 bg-zinc-950 text-zinc-100 overflow-hidden shadow-xs ${className}`}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900/60 text-xs font-mono">
        <div className="flex items-center gap-2 text-zinc-400">
          {isBash ? <Terminal className="w-3.5 h-3.5 text-zinc-500" /> : null}
          <span className="text-[11px] text-zinc-400">{filename || language}</span>
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-all cursor-pointer select-none"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 text-[11px]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-[11px]">Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-xs leading-relaxed font-mono selection:bg-primary selection:text-white">
        <code className={`language-${language} text-zinc-200`}>{code.trim()}</code>
      </pre>
    </div>
  );
}
