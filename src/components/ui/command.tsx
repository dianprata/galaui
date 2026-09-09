 import * as React from "react";
 import { Search } from "lucide-react";
 import { Dialog, DialogPopup, DialogTitle, DialogDescription } from "@/components/ui/dialog";
 import { cn } from "@/lib/utils";
 
 interface CommandContextValue {
   search: string;
   setSearch: (search: string) => void;
   filter: (value: string, search: string) => boolean;
   activeId: string | null;
   setActiveId: (id: string | null) => void;
   registerItem: (item: CommandItemRegistration) => () => void;
   visibleItems: CommandItemRegistration[];
   selectItem: (id: string) => void;
 }
 
 interface CommandItemRegistration {
   id: string;
   value: string;
   groupId?: string;
   disabled?: boolean;
   onSelect?: () => void;
 }
 
 const CommandContext = React.createContext<CommandContextValue | null>(null);
 
 function useCommand() {
   const context = React.useContext(CommandContext);
   if (!context) {
     throw new Error("Command components must be used within a <Command />");
   }
   return context;
 }
 
 export interface CommandProps extends React.HTMLAttributes<HTMLDivElement> {
   search?: string;
   onSearchChange?: (search: string) => void;
   filter?: (value: string, search: string) => boolean;
   loop?: boolean;
 }
 
 const defaultFilter = (value: string, search: string) => {
   if (!search) return true;
   return value.toLowerCase().includes(search.trim().toLowerCase());
 };
 
 const Command = React.forwardRef<HTMLDivElement, CommandProps>(
   (
     {
       children,
       className,
       search: controlledSearch,
       onSearchChange,
       filter = defaultFilter,
       loop = true,
       onKeyDown,
       ...props
     },
     ref
   ) => {
     const [uncontrolledSearch, setUncontrolledSearch] = React.useState("");
     const isControlled = controlledSearch !== undefined;
     const search = isControlled ? controlledSearch : uncontrolledSearch;
 
     const [activeId, setActiveId] = React.useState<string | null>(null);
     const [items, setItems] = React.useState<CommandItemRegistration[]>([]);
 
     const setSearch = React.useCallback(
       (newSearch: string) => {
         if (!isControlled) {
           setUncontrolledSearch(newSearch);
         }
         onSearchChange?.(newSearch);
       },
       [isControlled, onSearchChange]
     );
 
     const registerItem = React.useCallback((item: CommandItemRegistration) => {
       setItems((prev) => {
         const existingIndex = prev.findIndex((i) => i.id === item.id);
         if (existingIndex > -1) {
           const next = [...prev];
           next[existingIndex] = item;
           return next;
         }
         return [...prev, item];
       });
 
       return () => {
         setItems((prev) => prev.filter((i) => i.id !== item.id));
       };
     }, []);
 
     const visibleItems = React.useMemo(() => {
       return items.filter((item) => filter(item.value, search));
     }, [items, filter, search]);
 
     // Keep active item in sync when search results change
     React.useEffect(() => {
       if (visibleItems.length > 0) {
         const isCurrentActiveVisible = visibleItems.some(
           (item) => item.id === activeId && !item.disabled
         );
         if (!isCurrentActiveVisible) {
           const firstEnabled = visibleItems.find((item) => !item.disabled);
           setActiveId(firstEnabled ? firstEnabled.id : null);
         }
       } else {
         setActiveId(null);
       }
     }, [visibleItems, activeId]);
 
     const selectItem = React.useCallback(
       (id: string) => {
         const target = items.find((i) => i.id === id);
         if (target && !target.disabled) {
           target.onSelect?.();
         }
       },
       [items]
     );
 
     const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
       onKeyDown?.(e);
       if (e.defaultPrevented) return;
 
       const enabledItems = visibleItems.filter((i) => !i.disabled);
       if (enabledItems.length === 0) return;
 
       const currentIndex = enabledItems.findIndex((i) => i.id === activeId);
 
       if (e.key === "ArrowDown") {
         e.preventDefault();
         const nextIndex =
           currentIndex === -1 || currentIndex === enabledItems.length - 1
             ? loop
               ? 0
               : currentIndex
             : currentIndex + 1;
         setActiveId(enabledItems[nextIndex]?.id ?? null);
       } else if (e.key === "ArrowUp") {
         e.preventDefault();
         const prevIndex =
           currentIndex <= 0
             ? loop
               ? enabledItems.length - 1
               : 0
             : currentIndex - 1;
         setActiveId(enabledItems[prevIndex]?.id ?? null);
       } else if (e.key === "Home") {
         e.preventDefault();
         setActiveId(enabledItems[0]?.id ?? null);
       } else if (e.key === "End") {
         e.preventDefault();
         setActiveId(enabledItems[enabledItems.length - 1]?.id ?? null);
       } else if (e.key === "Enter") {
         if (activeId) {
           e.preventDefault();
           selectItem(activeId);
         }
       }
     };
 
     return (
       <CommandContext.Provider
         value={{
           search,
           setSearch,
           filter,
           activeId,
           setActiveId,
           registerItem,
           visibleItems,
           selectItem,
         }}
       >
         <div
           ref={ref}
           tabIndex={-1}
           role="application"
           className={cn(
             "flex h-full w-full flex-col overflow-hidden rounded-xl bg-popover text-popover-foreground outline-none",
             className
           )}
           onKeyDown={handleKeyDown}
           {...props}
         >
           {children}
         </div>
       </CommandContext.Provider>
     );
   }
 );
 Command.displayName = "Command";
 
 export interface CommandDialogProps {
   open?: boolean;
   onOpenChange?: (open: boolean) => void;
   children: React.ReactNode;
   className?: string;
   title?: string;
   description?: string;
   filter?: (value: string, search: string) => boolean;
   loop?: boolean;
 }
 
 const CommandDialog = ({
   open,
   onOpenChange,
   children,
   className,
   title = "Command Palette",
   description = "Search for actions and commands",
   ...props
 }: CommandDialogProps) => {
   return (
     <Dialog open={open} onOpenChange={onOpenChange}>
       <DialogPopup
         showCloseButton={false}
         className={cn(
           "max-w-xl p-0 overflow-hidden shadow-2xl border-border bg-background rounded-2xl",
           className
         )}
       >
         <DialogTitle className="sr-only">{title}</DialogTitle>
         <DialogDescription className="sr-only">{description}</DialogDescription>
         <Command
           className="[&_[data-command-group-heading]]:px-2 [&_[data-command-group-heading]]:font-medium [&_[data-command-group-heading]]:text-muted-foreground [&_[data-command-group]]:px-2"
           {...props}
         >
           {children}
         </Command>
       </DialogPopup>
     </Dialog>
   );
 };
 CommandDialog.displayName = "CommandDialog";
 
 export interface CommandInputProps
   extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
   value?: string;
   onValueChange?: (search: string) => void;
 }
 
 const CommandInput = React.forwardRef<HTMLInputElement, CommandInputProps>(
   ({ className, value: controlledVal, onValueChange, ...props }, ref) => {
     const { search, setSearch } = useCommand();
 
     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       setSearch(e.target.value);
       onValueChange?.(e.target.value);
     };
 
     return (
       <div
         className="flex items-center px-4 py-3 border-b border-border gap-2"
         data-command-input-wrapper=""
       >
         <Search className="w-4 h-4 text-muted-foreground shrink-0" />
         <input
           ref={ref}
           autoFocus
           value={controlledVal !== undefined ? controlledVal : search}
           onChange={handleChange}
           className={cn(
             "flex h-6 w-full rounded-md bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
             className
           )}
           {...props}
         />
       </div>
     );
   }
 );
 CommandInput.displayName = "CommandInput";
 
 export interface CommandListProps extends React.HTMLAttributes<HTMLDivElement> {}
 
 const CommandList = React.forwardRef<HTMLDivElement, CommandListProps>(
   ({ className, ...props }, ref) => {
     return (
       <div
         ref={ref}
         role="listbox"
         className={cn("max-h-80 overflow-y-auto overflow-x-hidden p-1.5", className)}
         {...props}
       />
     );
   }
 );
 CommandList.displayName = "CommandList";
 
 export interface CommandEmptyProps extends React.HTMLAttributes<HTMLDivElement> {}
 
 const CommandEmpty = React.forwardRef<HTMLDivElement, CommandEmptyProps>(
   ({ className, ...props }, ref) => {
     const { visibleItems } = useCommand();
 
     if (visibleItems.length > 0) return null;
 
     return (
       <div
         ref={ref}
         role="presentation"
         className={cn("py-8 text-center text-xs text-muted-foreground", className)}
         {...props}
       />
     );
   }
 );
 CommandEmpty.displayName = "CommandEmpty";
 
 const CommandGroupContext = React.createContext<{ groupId: string } | null>(null);
 
 export interface CommandGroupProps extends React.HTMLAttributes<HTMLDivElement> {
   heading?: React.ReactNode;
 }
 
 const CommandGroup = React.forwardRef<HTMLDivElement, CommandGroupProps>(
   ({ className, heading, children, ...props }, ref) => {
     const groupId = React.useId();
     const { visibleItems } = useCommand();
 
     const hasVisibleChild = React.useMemo(() => {
       return visibleItems.some((item) => item.groupId === groupId);
     }, [visibleItems, groupId]);
 
     if (!hasVisibleChild && visibleItems.length > 0) return null;
 
     return (
       <CommandGroupContext.Provider value={{ groupId }}>
         <div
           ref={ref}
           role="group"
           data-command-group=""
           className={cn("overflow-hidden p-1 text-foreground", className)}
           {...props}
         >
           {heading && (
             <div
               data-command-group-heading=""
               className="px-2 py-1.5 text-xs font-semibold text-muted-foreground select-none"
             >
               {heading}
             </div>
           )}
           {children}
         </div>
       </CommandGroupContext.Provider>
     );
   }
 );
 CommandGroup.displayName = "CommandGroup";
 
 export interface CommandSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}
 
 const CommandSeparator = React.forwardRef<HTMLDivElement, CommandSeparatorProps>(
   ({ className, ...props }, ref) => (
     <div
       ref={ref}
       role="separator"
       className={cn("-mx-1.5 my-1.5 h-px bg-border", className)}
       {...props}
     />
   )
 );
 CommandSeparator.displayName = "CommandSeparator";
 
 export interface CommandItemProps
   extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
   value?: string;
   disabled?: boolean;
   onSelect?: () => void;
 }
 
 const CommandItem = React.forwardRef<HTMLDivElement, CommandItemProps>(
   ({ className, value, disabled = false, onSelect, children, ...props }, ref) => {
     const id = React.useId();
     const itemRef = React.useRef<HTMLDivElement>(null);
     const combinedRef = (node: HTMLDivElement | null) => {
       (itemRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
       if (typeof ref === "function") ref(node);
       else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
     };
 
     const groupContext = React.useContext(CommandGroupContext);
     const {
       search,
       filter,
       activeId,
       setActiveId,
       registerItem,
       selectItem,
     } = useCommand();
 
     // Extract text content if value is not provided
     const textValue = React.useMemo(() => {
       if (value !== undefined) return value;
       if (typeof children === "string") return children;
       return id;
     }, [value, children, id]);
 
     React.useEffect(() => {
       const unregister = registerItem({
         id,
         value: textValue,
         groupId: groupContext?.groupId,
         disabled,
         onSelect,
       });
       return unregister;
     }, [id, textValue, groupContext?.groupId, disabled, onSelect, registerItem]);
 
     const isVisible = filter(textValue, search);
     const isSelected = activeId === id;
 
     React.useEffect(() => {
       if (isSelected && itemRef.current) {
         itemRef.current.scrollIntoView({ block: "nearest" });
       }
     }, [isSelected]);
 
     if (!isVisible) return null;
 
     return (
       <div
         ref={combinedRef}
         role="option"
         tabIndex={-1}
         aria-selected={isSelected}
         aria-disabled={disabled}
         data-selected={isSelected}
         data-disabled={disabled}
         onClick={() => {
           if (!disabled) {
             selectItem(id);
           }
         }}
         onPointerMove={() => {
           if (!disabled && activeId !== id) {
             setActiveId(id);
           }
         }}
         className={cn(
           "relative flex cursor-pointer select-none items-center rounded-lg px-2.5 py-2 text-xs outline-none transition-colors",
           isSelected
             ? "bg-accent text-accent-foreground font-medium"
             : "text-foreground hover:bg-muted/70",
           disabled && "pointer-events-none opacity-50",
           className
         )}
         {...props}
       >
         {children}
       </div>
     );
   }
 );
 CommandItem.displayName = "CommandItem";
 
 export interface CommandShortcutProps
   extends React.HTMLAttributes<HTMLSpanElement> {}
 
 const CommandShortcut = ({ className, ...props }: CommandShortcutProps) => {
   return (
     <span
       className={cn(
         "ml-auto text-xs tracking-widest text-muted-foreground",
         className
       )}
       {...props}
     />
   );
 };
 CommandShortcut.displayName = "CommandShortcut";
 
 export {
   Command,
   CommandDialog,
   CommandInput,
   CommandList,
   CommandEmpty,
   CommandGroup,
   CommandItem,
   CommandShortcut,
   CommandSeparator,
 };
 
