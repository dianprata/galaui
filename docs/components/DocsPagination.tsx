import { useLocation, Link } from "wouter";
import { allRoutes } from "../routes";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function DocsPagination() {
  const [location] = useLocation();

  const currentIndex = allRoutes.findIndex((r) => r.path === location);
  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? allRoutes[currentIndex - 1] : null;
  const next = currentIndex < allRoutes.length - 1 ? allRoutes[currentIndex + 1] : null;

  return (
    <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
      {prev ? (
        <Link
          href={prev.path}
          className="w-full sm:w-auto group flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card hover:bg-muted/50 hover:border-primary/40 transition-all text-left cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:-translate-x-0.5 transition-transform" />
          <div>
            <div className="text-[11px] text-muted-foreground font-mono">Previous</div>
            <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              {prev.title}
            </div>
          </div>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {next && (
        <Link
          href={next.path}
          className="w-full sm:w-auto ml-auto group flex items-center justify-end gap-3 px-4 py-3 rounded-xl border border-border bg-card hover:bg-muted/50 hover:border-primary/40 transition-all text-right cursor-pointer"
        >
          <div>
            <div className="text-[11px] text-muted-foreground font-mono">Next</div>
            <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              {next.title}
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-transform" />
        </Link>
      )}
    </div>
  );
}

