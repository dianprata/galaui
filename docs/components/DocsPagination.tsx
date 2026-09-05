import { useLocation, Link } from "wouter";
import { allRoutes } from "../routes";
import { Card, Separator } from "@/index";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function DocsPagination() {
  const [location] = useLocation();

  const currentIndex = allRoutes.findIndex((r) => r.path === location);
  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? allRoutes[currentIndex - 1] : null;
  const next = currentIndex < allRoutes.length - 1 ? allRoutes[currentIndex + 1] : null;

  return (
    <div className="mt-16">
      <Separator className="mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prev ? (
          <Link href={prev.path} className="group cursor-pointer">
            <Card className="p-4 flex items-center gap-3.5 group-hover:border-primary/50 group-hover:bg-muted/30 transition-all">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-muted-foreground tracking-wider">Previous</span>
                <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {prev.title}
                </div>
              </div>
            </Card>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}

        {next && (
          <Link href={next.path} className="group cursor-pointer">
            <Card className="p-4 flex items-center justify-between gap-3.5 group-hover:border-primary/50 group-hover:bg-muted/30 transition-all text-right">
              <div className="ml-auto">
                <span className="text-[10px] uppercase font-mono text-muted-foreground tracking-wider">Next</span>
                <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {next.title}
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Card>
          </Link>
        )}
      </div>
    </div>
  );
}

