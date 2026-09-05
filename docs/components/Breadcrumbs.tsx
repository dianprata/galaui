import { useLocation } from "wouter";
import { docSections } from "../routes";
import { Share2, Check } from "lucide-react";
import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  cn,
} from "@/index";

export function Breadcrumbs({ className }: { className?: string } = {}) {
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
    <div className={cn("flex items-center justify-between pb-4 mb-6 border-b border-border/60 text-xs", className)}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#/getting-started/introduction">Docs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <span>{sectionTitle}</span>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{itemTitle}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Button
        variant="outline"
        size="xs"
        onClick={onCopyUrl}
        title="Copy page link"
      >
        {copied ? (
          <>
            <Check className="w-3 h-3 mr-1 text-emerald-600 dark:text-emerald-400" />
            <span className="text-emerald-600 dark:text-emerald-400 text-[11px]">Copied</span>
          </>
        ) : (
          <>
            <Share2 className="w-3 h-3 mr-1" />
            <span className="text-[11px]">Share</span>
          </>
        )}
      </Button>
    </div>
  );
}
