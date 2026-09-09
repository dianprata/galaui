import { useLocation } from "wouter";
import { allRoutes } from "../routes";
import { ChevronRight, FileText } from "lucide-react";
import {
  Badge,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  Kbd,
  KbdGroup,
} from "@/index";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [, navigate] = useLocation();

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  const gettingStartedItems = allRoutes.filter((item) =>
    item.path.startsWith("/getting-started")
  );
  const componentItems = allRoutes.filter(
    (item) => item.path.startsWith("/components") && item.path !== "/components"
  );
  const otherItems = allRoutes.filter(
    (item) =>
      !item.path.startsWith("/getting-started") &&
      (!item.path.startsWith("/components") || item.path === "/components")
  );

  return (
    <CommandDialog
      open={open}
      onOpenChange={(isOpen) => !isOpen && onClose()}
      title="Search GalaUI Documentation"
      description="Quickly navigate components, tokens, and guides"
    >
      <CommandInput placeholder="Search documentation, components, tokens..." />
      <CommandList>
        <CommandEmpty>No matching documentation or components found.</CommandEmpty>

        {gettingStartedItems.length > 0 && (
          <CommandGroup heading="Getting Started">
            {gettingStartedItems.map((item) => (
              <CommandItem
                key={item.path}
                value={`${item.title} ${item.path}`}
                onSelect={() => handleSelect(item.path)}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="font-medium text-sm">{item.title}</span>
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      size="xs"
                      className="text-[9px] h-3.5 px-1 group-data-[selected=true]:bg-primary-foreground/20 group-data-[selected=true]:text-primary-foreground group-data-[selected=true]:border-primary-foreground/30"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/50 shrink-0" />
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {componentItems.length > 0 && (
          <CommandGroup heading="Components">
            {componentItems.map((item) => (
              <CommandItem
                key={item.path}
                value={`${item.title} ${item.path}`}
                onSelect={() => handleSelect(item.path)}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="font-medium text-sm">{item.title}</span>
                  {item.badge && (
                    <Badge
                      variant={item.badge.toLowerCase() === "new" ? "default" : "secondary"}
                      size="xs"
                      className="text-[9px] h-3.5 px-1 group-data-[selected=true]:bg-primary-foreground/20 group-data-[selected=true]:text-primary-foreground group-data-[selected=true]:border-primary-foreground/30"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/50 shrink-0" />
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {otherItems.length > 0 && (
          <CommandGroup heading="General">
            {otherItems.map((item) => (
              <CommandItem
                key={item.path}
                value={`${item.title} ${item.path}`}
                onSelect={() => handleSelect(item.path)}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="font-medium text-sm">{item.title}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/50 shrink-0" />
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>

      <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-muted/40 text-[11px] text-muted-foreground font-mono">
        <div className="flex items-center gap-2">
          <span>Navigate:</span>
          <KbdGroup>
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd>
            <Kbd>↵</Kbd>
          </KbdGroup>
        </div>
        <div className="flex items-center gap-1.5">
          <span>Close:</span>
          <Kbd>ESC</Kbd>
        </div>
      </div>
    </CommandDialog>
  );
}

