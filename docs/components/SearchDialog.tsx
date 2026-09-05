import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { allRoutes, docSections } from "../routes";
import { Search, X, ChevronRight, FileText } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in-50"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl rounded-2xl border border-border bg-popover text-popover-foreground shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-150">
        <div className="flex items-center px-4 py-3 border-b border-border gap-3">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation, components, tokens..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 rounded text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono rounded bg-muted text-muted-foreground border border-border">
            ESC
          </kbd>
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
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs transition-all cursor-pointer ${
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-xs font-medium"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className={`w-4 h-4 ${isSelected ? "text-primary-foreground" : "text-muted-foreground"}`} />
                      <div>
                        <div className="font-medium text-sm">{item.title}</div>
                        {section && (
                          <div className={`text-[11px] ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                            {section.title}
                          </div>
                        )}
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isSelected ? "text-primary-foreground" : "text-muted-foreground/50"}`} />
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
            <span>Navigation:</span>
            <kbd className="px-1 rounded bg-background border border-border">↑</kbd>
            <kbd className="px-1 rounded bg-background border border-border">↓</kbd>
            <kbd className="px-1 rounded bg-background border border-border">↵</kbd>
          </div>
          <span>GalaUI Docs Search</span>
        </div>
      </div>
    </div>
  );
}

