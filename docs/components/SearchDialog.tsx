import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { allRoutes, docSections } from "../routes";
import { Search, ChevronRight, FileText } from "lucide-react";
import { Dialog, DialogPopup, Input, Kbd, cn } from "@/index";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [, navigate] = useLocation();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filtered = allRoutes.filter((item) => {
    return (
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.path.toLowerCase().includes(query.toLowerCase())
    );
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onClose(); // toggle handled in parent
      }
      if (!open) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        navigate(filtered[selectedIndex].path);
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, filtered, selectedIndex, navigate, onClose]);

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen: any) => !isOpen && onClose()}>
      <DialogPopup className="max-w-xl p-0 overflow-hidden shadow-2xl">
        <div className="flex items-center px-4 py-3 border-b border-border gap-2">
          <Search className="w-4 h-4 text-muted-foreground shrink-0 mr-1" />
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation, components, tokens..."
            className="border-0 bg-transparent shadow-none focus-visible:ring-0 p-0 text-sm h-auto"
          />
          <Kbd className="hidden sm:inline-flex">ESC</Kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length > 0 ? (
            <div className="space-y-1">
              {filtered.map((item, index) => {
                const section = docSections.find((s) => s.items.some((i) => i.path === item.path));
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={item.path}
                    type="button"
                    onClick={() => {
                      navigate(item.path);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
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
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd>
            <Kbd>↵</Kbd>
          </div>
          <span>GalaUI Docs Search</span>
        </div>
      </DialogPopup>
    </Dialog>
  );
}
