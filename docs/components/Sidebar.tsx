import { useState } from "react";
import { Link, useLocation } from "wouter";
import { docSections } from "../routes";
import { Input, Badge, cn } from "@/index";
import { Search } from "lucide-react";

interface SidebarProps {
  onNavigate?: () => void;
  onSearchClick?: () => void;
  className?: string;
}

export function Sidebar({ onNavigate, onSearchClick, className }: SidebarProps) {
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
    <aside className={cn("w-64 shrink-0 flex flex-col h-[calc(100vh-3.5rem)] sticky top-14 border-r border-border bg-background", className)}>
      <div className="p-4 border-b border-border/60">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => onSearchClick?.()}
            placeholder="Quick search docs..."
            className="pl-8 text-xs h-8 cursor-pointer"
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
                    className={cn(
                      "flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all",
                      isActive
                        ? "bg-primary/10 text-primary font-semibold border border-primary/25 shadow-2xs"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge variant="outline" size="sm" className="font-mono text-[10px] h-4 px-1 uppercase">
                        {item.badge}
                      </Badge>
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
