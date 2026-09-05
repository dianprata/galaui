import { Link, useLocation } from "wouter";
import { docSections } from "../routes";
import { Badge, cn } from "@/index";

interface SidebarProps {
  onNavigate?: () => void;
  className?: string;
}

export function Sidebar({ onNavigate, className }: SidebarProps) {
  const [location] = useLocation();

  return (
    <aside className={cn("w-64 shrink-0 flex flex-col h-[calc(100vh-3.5rem)] sticky top-14 border-r border-border bg-background", className)}>
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {docSections.map((section) => (
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
      </div>
    </aside>
  );
}
