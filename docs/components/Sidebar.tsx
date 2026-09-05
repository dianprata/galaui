import { useState } from "react";
import { Link, useLocation } from "wouter";
import { docSections } from "../routes";
import { Search } from "lucide-react";

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const [location] = useLocation();
  const [query, setQuery] = useState("");

  const filteredSections = docSections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <aside className="w-64 shrink-0 flex flex-col h-[calc(100vh-3.5rem)] sticky top-14 border-r border-border bg-background">
      <div className="p-4 border-b border-border/60">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Quick search docs..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-border bg-muted/40 placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {filteredSections.map((section) => (
          <div key={section.title} className="space-y-2">
            <h4 className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase px-2">
              {section.title}
            </h4>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = location === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={onNavigate}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <span>{item.title}</span>
                    {item.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground uppercase font-mono">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {filteredSections.length === 0 && (
          <div className="text-center py-8 text-xs text-muted-foreground">
            No results found for "{query}"
          </div>
        )}
      </div>
    </aside>
  );
}
