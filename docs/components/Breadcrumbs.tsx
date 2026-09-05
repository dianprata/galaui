import { useLocation, Link } from "wouter";
import { docSections } from "../routes";
import { ChevronRight, Share2, Check } from "lucide-react";
import { useState } from "react";

export function Breadcrumbs() {
  const [location] = useLocation();
  const [copied, setCopied] = useState(false);

  // Find section and item
  let sectionTitle = "Docs";
  let itemTitle = "Overview";

  for (const sec of docSections) {
    const found = sec.items.find((i) => i.path === location);
    if (found) {
      sectionTitle = sec.title;
      itemTitle = found.title;
      break;
    }
  }

  const onCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="flex items-center justify-between pb-6 mb-4 border-b border-border/60 text-xs">
      <nav className="flex items-center gap-1.5 text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Docs
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
        <span>{sectionTitle}</span>
        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
        <span className="text-foreground font-medium">{itemTitle}</span>
      </nav>

      <button
        type="button"
        onClick={onCopyUrl}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer select-none"
        title="Copy page link"
      >
        {copied ? (
          <>
            <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span className="text-emerald-600 dark:text-emerald-400 text-[11px]">Copied link</span>
          </>
        ) : (
          <>
            <Share2 className="w-3 h-3" />
            <span className="text-[11px]">Share</span>
          </>
        )}
      </button>
    </div>
  );
}

