import { useEffect, useState, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import { allRoutes, docSections } from "../routes";
import { Search, ChevronRight, FileText } from "lucide-react";
import { Dialog, DialogPopup, Input, Kbd, KbdGroup, cn } from "@/index";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [, navigate] = useLocation();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = allRoutes.filter((item) => {
    return (
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.path.toLowerCase().includes(query.toLowerCase())
    );
  });

  // Focus input and reset selection when dialog opens
  useEffect(() => {
    if (open) {
      setSelectedIndex(0);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll active item into view
  useEffect(() => {
    if (!open) return;
    const activeEl = listRef.current?.querySelector<HTMLElement>('[data-selected="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex, open]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent | KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        e.stopPropagation();
        if (filtered.length > 0) {
          setSelectedIndex((prev) => (prev + 1) % filtered.length);
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        e.stopPropagation();
        if (filtered.length > 0) {
          setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
        }
      } else if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        if (filtered[selectedIndex]) {
          navigate(filtered[selectedIndex].path);
          onClose();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    },
    [filtered, selectedIndex, navigate, onClose]
  );

  // Capture keydown at window level so it never gets blocked by child components
  useEffect(() => {
    if (!open) return;

    const onCaptureKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (
        e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "Enter"
      ) {
        handleKeyDown(e);
      }
    };

    window.addEventListener("keydown", onCaptureKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", onCaptureKeyDown, { capture: true });
  }, [open, handleKeyDown, onClose]);

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen: any) => !isOpen && onClose()}>
      <DialogPopup
        className="max-w-xl p-0 overflow-hidden shadow-2xl"
        showCloseButton={false}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center px-4 py-3 border-b border-border gap-2">
          <Search className="w-4 h-4 text-muted-foreground shrink-0 mr-1" />
          <Input
            ref={inputRef}
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search documentation, components, tokens..."
            className="border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 rounded-none text-sm h-auto"
          />
          <Kbd className="hidden sm:inline-flex">ESC</Kbd>
        </div>

        <div ref={listRef} className="max-h-80 overflow-y-auto p-2">
          {filtered.length > 0 ? (
            <div className="space-y-1">
              {filtered.map((item, index) => {
                const section = docSections.find((s) => s.items.some((i) => i.path === item.path));
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={item.path}
                    type="button"
                    data-selected={isSelected}
                    onClick={() => {
                      navigate(item.path);
                      onClose();
                    }}
                    onMouseMove={() => {
                      if (selectedIndex !== index) {
                        setSelectedIndex(index);
                      }
                    }}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs transition-all cursor-pointer",
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-xs font-medium"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className={cn("w-4 h-4", isSelected ? "text-primary-foreground" : "text-muted-foreground")} />
                    <div>
                      <div className="font-medium text-sm">{item.title}</div>
                      {section && (
                        <div className={cn("text-[11px]", isSelected ? "text-primary-foreground/80" : "text-muted-foreground")}>
                          {section.title}
                        </div>
                      )}
                    </div>
                  </div>
                  <ChevronRight className={cn("w-4 h-4", isSelected ? "text-primary-foreground" : "text-muted-foreground/50")} />
                </button>
                );
              })}
            </div>
          ) : (
            <div className="py-10 text-center text-xs text-muted-foreground">
              No results found for "{query}"
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-muted/40 text-[11px] text-muted-foreground font-mono">
          <div className="flex items-center gap-2">
            <span>Navigate:</span>
            <KbdGroup>
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd>
              <Kbd>↵</Kbd>
            </KbdGroup>
          </div>
          <span>GalaUI Docs Search</span>
        </div>
      </DialogPopup>
    </Dialog>
  );
}
