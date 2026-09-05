import { useEffect, useState } from "react";
import { AlignLeft, ChevronDown, ExternalLink, MessageSquare } from "lucide-react";
import { Collapsible, CollapsibleTrigger, CollapsiblePanel, cn } from "@/index";

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

function useHeadings() {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Collect all h2 and h3 elements within .docs-content
    const elements = Array.from(document.querySelectorAll(".docs-content h2, .docs-content h3"));
    const items: HeadingItem[] = elements
      .map((el) => {
        if (!el.id) {
          el.id =
            el.textContent
              ?.toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "") || "";
        }
        return {
          id: el.id,
          text: el.textContent || "",
          level: el.tagName === "H2" ? 2 : 3,
        };
      })
      .filter((item) => item.id && item.text);

    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -65% 0%" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return { headings, activeId, setActiveId };
}

export function MobileTableOfContents({ className }: { className?: string } = {}) {
  const { headings, activeId, setActiveId } = useHeadings();
  const [open, setOpen] = useState(false);

  if (headings.length === 0) {
    return null;
  }

  const activeHeading = headings.find((h) => h.id === activeId);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className={cn(
        "xl:hidden mb-5 rounded-xl border border-border/80 bg-muted/20 text-xs overflow-hidden transition-all",
        className
      )}
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full px-3.5 py-2.5 text-xs font-medium text-foreground hover:bg-muted/40 transition-colors">
        <div className="flex items-center gap-2 overflow-hidden">
          <AlignLeft className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="font-semibold">On this page</span>
          {activeHeading && (
            <span className="text-[11px] text-muted-foreground truncate max-w-[200px] font-normal">
              - {activeHeading.text}
            </span>
          )}
        </div>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 shrink-0",
            open && "rotate-180"
          )}
        />
      </CollapsibleTrigger>

      <CollapsiblePanel>
        <div className="px-3.5 py-2 border-t border-border/60 bg-background/60 space-y-1">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            return (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(heading.id);
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                    window.history.replaceState(null, "", `#${heading.id}`);
                    setActiveId(heading.id);
                    setOpen(false);
                  }
                }}
                className={cn(
                  "block py-1.5 transition-colors leading-normal",
                  heading.level === 3 ? "pl-3 text-[11px]" : "font-medium",
                  isActive
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {heading.text}
              </a>
            );
          })}
        </div>
      </CollapsiblePanel>
    </Collapsible>
  );
}

export function TableOfContents({ className }: { className?: string } = {}) {
  const { headings, activeId, setActiveId } = useHeadings();

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className={cn("hidden xl:block w-56 shrink-0 py-8 pl-6 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto", className)}>
      <div className="space-y-4">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground tracking-tight">
          <AlignLeft className="w-3.5 h-3.5 text-primary" />
          <span>On this page</span>
        </div>

        <nav className="space-y-1 text-xs">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            return (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(heading.id);
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                    window.history.replaceState(null, "", `#${heading.id}`);
                    setActiveId(heading.id);
                  }
                }}
                className={cn(
                  "block py-1 transition-colors leading-normal",
                  heading.level === 3 ? "pl-3 text-[11px]" : "font-medium",
                  isActive
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {heading.text}
              </a>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-border space-y-2 text-[11px] text-muted-foreground">
          <a
            href="https://github.com/dianprata/galaui"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            <span>GitHub Repository</span>
            <ExternalLink className="w-2.5 h-2.5 ml-auto" />
          </a>
          <a
            href="https://github.com/dianprata/galaui/issues"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Submit Feedback</span>
            <ExternalLink className="w-2.5 h-2.5 ml-auto" />
          </a>
        </div>
      </div>
    </aside>
  );
}

