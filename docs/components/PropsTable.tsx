import { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Badge,
  Input,
  cn,
} from "@/index";
import { Search } from "lucide-react";
import type { PropItem } from "@docs/data/api-reference";

export interface PropsTableProps {
  props?: PropItem[];
  componentName?: string;
  className?: string;
  showSearch?: boolean;
}

export function PropsTable({
  props = [],
  componentName,
  className,
  showSearch = true,
}: PropsTableProps) {
  const [query, setQuery] = useState("");

  const filteredProps = useMemo(() => {
    if (!query.trim()) return props;
    const q = query.toLowerCase();
    return props.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [props, query]);

  if (!props || props.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 text-center text-xs text-muted-foreground">
        No dedicated props documented for {componentName || "this component"}.
      </div>
    );
  }

  return (
    <div className={cn("rounded-xl border border-border bg-card overflow-hidden", className)}>
      {showSearch && props.length > 5 && (
        <div className="p-3 border-b border-border bg-muted/20 flex items-center gap-2">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter props..."
              size="sm"
              className="pl-8 h-8 text-xs"
            />
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <Table className="w-full text-left text-xs">
          <TableHeader>
            <TableRow className="border-b border-border bg-muted/40">
              <TableHead className="w-44 font-semibold text-foreground py-2.5 px-4">
                Property
              </TableHead>
              <TableHead className="font-semibold text-foreground py-2.5 px-4 min-w-[180px]">
                Type
              </TableHead>
              <TableHead className="w-32 font-semibold text-foreground py-2.5 px-4">
                Default
              </TableHead>
              <TableHead className="font-semibold text-foreground py-2.5 px-4 min-w-[220px]">
                Description
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProps.length > 0 ? (
              filteredProps.map((item) => (
                <TableRow key={item.name} className="border-b border-border/50">
                  <TableCell className="align-top py-3 px-4 font-mono font-medium text-foreground">
                    <div className="flex items-center gap-1.5">
                      <span>{item.name}</span>
                      {item.required && (
                        <Badge variant="destructive" size="sm">
                          Required
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="align-top py-3 px-4 font-mono text-muted-foreground break-words">
                    {item.type}
                  </TableCell>
                  <TableCell className="align-top py-3 px-4 font-mono text-muted-foreground">
                    {item.defaultValue || "—"}
                  </TableCell>
                  <TableCell className="align-top py-3 px-4 text-muted-foreground leading-relaxed">
                    {item.description}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="py-6 text-center text-muted-foreground">
                  No properties matching &quot;{query}&quot;.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
