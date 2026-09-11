import { useState } from "react";
import { apiReferenceData } from "@docs/data/api-reference";
import { PropsTable } from "./PropsTable";
import { Tabs, TabsList, TabsTab, TabsPanel, Badge, cn } from "@/index";
import { Layers, Box } from "lucide-react";

export interface ApiReferenceProps {
  name?: string;
  component?: string;
  subcomponents?: string[];
  className?: string;
}

export function ApiReference({
  name,
  component,
  subcomponents,
  className,
}: ApiReferenceProps) {
  const targetName = name || component;
  if (!targetName) {
    return (
      <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/5 text-xs text-destructive">
        Error: &lt;ApiReference /&gt; requires a <code>name</code> or <code>component</code> prop.
      </div>
    );
  }

  const compData = apiReferenceData.components[targetName];
  if (!compData) {
    return (
      <div className="p-4 rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/20 text-xs text-amber-700 dark:text-amber-300">
        No API metadata generated for component: <strong>{targetName}</strong>.
      </div>
    );
  }

  // Determine subcomponents list
  const subList = subcomponents || compData.subcomponents || [];
  const allSubcomponents = [targetName, ...subList.filter((s) => s !== targetName && apiReferenceData.components[s])];

  const [activeTab, setActiveTab] = useState(targetName);

  // If no subcomponents, render single table
  if (allSubcomponents.length <= 1) {
    return (
      <div className={cn("space-y-3 not-prose my-6", className)}>
        {compData.description && (
          <p className="text-xs text-muted-foreground">{compData.description}</p>
        )}
        <PropsTable
          props={compData.props}
          componentName={compData.name}
          showSearch={compData.props.length > 3}
        />
      </div>
    );
  }

  // Multi-subcomponent Tabs View
  return (
    <div className={cn("space-y-4 not-prose my-6", className)}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">
            Component API &amp; Subcomponents
          </span>
        </div>
        <Badge variant="outline" size="sm" className="text-[10px]">
          {allSubcomponents.length} parts
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto">
          <TabsList>
            {allSubcomponents.map((part) => {
              const partData = apiReferenceData.components[part];
              const propCount = partData?.props.length || 0;
              return (
                <TabsTab
                  key={part}
                  value={part}
                  className="gap-1.5"
                >
                  <Box className="w-3.5 h-3.5 opacity-60" />
                  <span>{part}</span>
                  <span className="text-xs opacity-60">({propCount})</span>
                </TabsTab>
              );
            })}
          </TabsList>
        </div>

        {allSubcomponents.map((part) => {
          const partData = apiReferenceData.components[part];
          if (!partData) return null;

          return (
            <TabsPanel key={part} value={part} className="focus-visible:outline-none">
              {partData.description && (
                <p className="text-sm text-muted-foreground mb-3">{partData.description}</p>
              )}
              <PropsTable
                props={partData.props}
                componentName={partData.name}
                showSearch={partData.props.length > 3}
              />
            </TabsPanel>
          );
        })}
      </Tabs>
    </div>
  );
}
