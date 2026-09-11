import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Search, Menu, X } from "lucide-react";
import { usePackageVersion } from "@docs/lib/version";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { SearchDialog } from "./SearchDialog";
import {
  Button,
  Badge,
  Kbd,
  KbdGroup,
  Drawer,
  DrawerPopup,
  cn,
} from "@/index";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export interface NavbarProps {
  /** Custom content for the mobile navigation drawer (e.g. docs layout sidebar) */
  mobileDrawerContent?: (context: { close: () => void; openSearch: () => void }) => React.ReactNode;
  /** Extra classes for the header container */
  className?: string;
}

const POPULAR_COMPONENTS = [
  { name: "Button", href: "/components/button" },
  { name: "Dialog", href: "/components/dialog" },
  { name: "Drawer", href: "/components/drawer" },
  { name: "Dropdown Menu", href: "/components/dropdown-menu" },
  { name: "Input", href: "/components/input" },
  { name: "Select", href: "/components/select" },
  { name: "Tabs", href: "/components/tabs" },
  { name: "Tooltip", href: "/components/tooltip" },
];

export function Navbar({ mobileDrawerContent, className }: NavbarProps) {
  const version = usePackageVersion();
  const [location] = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isLanding = location === "/";
  const isComponents = location === "/components" || location.startsWith("/components/");
  const isDocs = location.startsWith("/getting-started") && location !== "/getting-started/changelog";
  const isChangelog = location === "/getting-started/changelog";

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleArchitectureClick = (e: React.MouseEvent) => {
    if (isLanding) {
      e.preventDefault();
      const el = document.getElementById("features");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", "#features");
      }
    }
  };

  return (
    <>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Unified Global Navigation Header */}
      <header className={cn("sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md transition-colors duration-200", className)}>
        <div className="max-w-[1440px] w-full mx-auto px-4 md:px-6 h-14 flex items-center justify-between gap-4">
          {/* Left: Mobile menu toggle + Logo + Version badge */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-muted-foreground hover:text-foreground"
              title={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>

            <Link href="/" className="flex items-center gap-1 font-bold tracking-tight text-foreground hover:opacity-90 transition-opacity">
              <Logo withText size={32} />
            </Link>

            <Link href="/getting-started/changelog" title="View Changelog" className="transition-opacity hover:opacity-80">
              <Badge variant="outline" className="text-[10px] h-5 px-1.5 font-mono cursor-pointer hover:bg-muted transition-colors">
                v{version}
              </Badge>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/components"
              className={cn(
                "transition-colors",
                isComponents
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Components
            </Link>

            {isLanding ? (
              <a
                href="#features"
                onClick={handleArchitectureClick}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Architecture
              </a>
            ) : (
              <Link
                href="/#features"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Architecture
              </Link>
            )}

            <Link
              href="/getting-started/introduction"
              className={cn(
                "transition-colors",
                isDocs
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Docs
            </Link>

            <Link
              href="/getting-started/changelog"
              className={cn(
                "transition-colors",
                isChangelog
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Changelog
            </Link>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2">
            {/* Desktop / Tablet Search Trigger */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center justify-between gap-3 px-3 py-1.5 text-sm rounded-lg border border-border/80 bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-150 cursor-pointer shadow-2xs hover:shadow-xs w-fit"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5" />
                <span className="truncate">Search docs...</span>
              </div>
              <KbdGroup>
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </button>

            {/* Mobile Search Icon Trigger */}
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setSearchOpen(true)}
              className="sm:hidden text-muted-foreground hover:text-foreground"
              title="Search documentation"
            >
              <Search className="w-4 h-4" />
            </Button>

            {/* GitHub Repository */}
            <a
              href="https://github.com/dianprata/galaui"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-150"
              title="GitHub Repository"
            >
              <GithubIcon className="w-4 h-4 fill-current" />
            </a>

            {/* Dark / Light Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Responsive Mobile Drawer Navigation */}
      <Drawer open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <DrawerPopup
          side="left"
          showCloseButton={false}
          className="p-0 w-72 max-w-72 rounded-none h-full max-h-full border-r border-border flex flex-col bg-background"
        >
          {mobileDrawerContent ? (
            mobileDrawerContent({
              close: closeMobileMenu,
              openSearch: () => {
                closeMobileMenu();
                setSearchOpen(true);
              },
            })
          ) : (
            <DefaultMobileDrawerContent
              close={closeMobileMenu}
              version={version}
              location={location}
              isLanding={isLanding}
              isComponents={isComponents}
              isDocs={isDocs}
              isChangelog={isChangelog}
              handleArchitectureClick={handleArchitectureClick}
            />
          )}
        </DrawerPopup>
      </Drawer>
    </>
  );
}

interface DefaultMobileDrawerContentProps {
  close: () => void;
  version: string;
  location: string;
  isLanding: boolean;
  isComponents: boolean;
  isDocs: boolean;
  isChangelog: boolean;
  handleArchitectureClick: (e: React.MouseEvent) => void;
}

function DefaultMobileDrawerContent({
  close,
  version,
  location,
  isLanding,
  isComponents,
  isDocs,
  isChangelog,
  handleArchitectureClick,
}: DefaultMobileDrawerContentProps) {
  return (
    <>
      <div className="p-4 border-b border-border flex items-center justify-between shrink-0">
        <Link href="/" onClick={close} className="flex items-center gap-2 font-bold tracking-tight text-foreground hover:opacity-90">
          <Logo withText size={28} />
        </Link>
        <Button variant="ghost" size="icon-sm" onClick={close} title="Close menu">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        <div className="space-y-1">
          <h4 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase px-2.5 mb-2">
            Navigation
          </h4>
          <Link
            href="/"
            onClick={close}
            className={cn(
              "flex items-center justify-between h-8 px-3 py-1.5 rounded-lg text-sm font-medium",
              location === "/"
                ? "bg-primary/10 text-primary font-semibold border border-primary/25 shadow-2xs"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            Home
          </Link>
          <Link
            href="/components"
            onClick={close}
            className={cn(
              "flex items-center justify-between h-8 px-3 py-1.5 rounded-lg text-sm font-medium",
              isComponents
                ? "bg-primary/10 text-primary font-semibold border border-primary/25 shadow-2xs"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            Components
          </Link>
          {isLanding ? (
            <a
              href="#features"
              onClick={(e) => {
                close();
                handleArchitectureClick(e);
              }}
              className="flex items-center justify-between h-8 px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              Architecture
            </a>
          ) : (
            <Link
              href="/#features"
              onClick={close}
              className="flex items-center justify-between h-8 px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              Architecture
            </Link>
          )}
          <Link
            href="/getting-started/introduction"
            onClick={close}
            className={cn(
              "flex items-center justify-between h-8 px-3 py-1.5 rounded-lg text-sm font-medium",
              isDocs
                ? "bg-primary/10 text-primary font-semibold border border-primary/25 shadow-2xs"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            Docs
          </Link>
          <Link
            href="/getting-started/changelog"
            onClick={close}
            className={cn(
              "flex items-center justify-between h-8 px-3 py-1.5 rounded-lg text-sm font-medium",
              isChangelog
                ? "bg-primary/10 text-primary font-semibold border border-primary/25 shadow-2xs"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <span>Changelog</span>
            <Badge variant="outline" size="sm" className="text-[10px] h-4 px-1.5 font-mono font-normal">
              v{version}
            </Badge>
          </Link>
        </div>

        <div className="space-y-1">
          <h4 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase px-2.5 mb-2">
            Popular Primitives
          </h4>
          <div className="grid grid-cols-2 gap-1.5">
            {POPULAR_COMPONENTS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="flex items-center px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors border border-border/40"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-border bg-muted/20 flex items-center justify-between shrink-0">
        <a
          href="https://github.com/dianprata/galaui"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
        >
          <GithubIcon className="w-4 h-4 fill-current" />
          <span>GitHub</span>
        </a>
        <Badge variant="outline" className="text-[10px] h-5 font-mono">
          MIT License
        </Badge>
      </div>
    </>
  );
}
