import type { ReactNode } from "react";
import { useState } from "react";
import { Link } from "wouter";
import { Sidebar } from "./Sidebar";
import { TableOfContents } from "./TableOfContents";
import { ThemeToggle } from "./ThemeToggle";
import { SearchDialog } from "./SearchDialog";
import { Breadcrumbs } from "./Breadcrumbs";
import { DocsPagination } from "./DocsPagination";
import { Badge, Button, Kbd } from "@/index";
import { cn } from "@/index";
import { Menu, X, ExternalLink, Search } from "lucide-react";
import { useEffect } from "react";

interface DocsLayoutProps {
  children: ReactNode;
  className?: string;
}

export function DocsLayout({ children, className }: DocsLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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

  return (
    <div className={cn("min-h-screen bg-background text-foreground flex flex-col antialiased", className)}>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 h-14 border-b border-border bg-background/80 backdrop-blur-md px-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>

          <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight text-foreground hover:opacity-90">
            <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-black text-xs shadow-xs">
              G
            </div>
            <span className="text-base font-semibold">GalaUI</span>
          </Link>

          <Badge variant="outline" className="text-[10px] h-5 px-1.5 font-mono">
            v0.1.1
          </Badge>
        </div>

        {/* Search Command Palette Trigger */}
        <div className="flex-1 max-w-sm mx-4 hidden md:block">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-lg border border-border/80 bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground transition-all cursor-pointer shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Search documentation...</span>
            </div>
            <Kbd>⌘K</Kbd>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setSearchOpen(true)}
            className="md:hidden text-muted-foreground hover:text-foreground"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </Button>

          <a
            href="https://www.npmjs.com/package/@galaui/react"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground px-2.5 py-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            <span>npm</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <a
            href="https://github.com/dianprata/galaui"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title="GitHub Repository"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
          </a>

          <ThemeToggle />
        </div>
      </header>

      {/* Body Container */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)} />
            <div className="relative w-72 bg-background h-full shadow-xl flex flex-col z-10">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <span className="font-semibold text-sm">Navigation</span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-md text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <Sidebar onNavigate={() => setMobileMenuOpen(false)} />
            </div>
          </div>
        )}

        {/* Main Documentation Content */}
        <main className="flex-1 min-w-0 px-6 py-8 md:px-10 md:py-10">
          <div className="max-w-3xl mx-auto">
            <Breadcrumbs />
            <div className="docs-content prose prose-zinc dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-headings:tracking-tight prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-4 prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-3.5 prose-h3:text-base prose-h3:font-semibold prose-h3:mt-5 prose-h3:mb-2.5 prose-p:text-sm prose-p:leading-relaxed prose-p:text-muted-foreground prose-p:my-2.5 prose-ul:my-2.5 prose-ul:space-y-1.5 prose-ol:my-2.5 prose-ol:space-y-1.5 prose-hr:my-6 prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:font-mono prose-code:text-xs">
              {children}
            </div>
            <DocsPagination />
          </div>
        </main>

        {/* Right Table of Contents (On this page) */}
        <TableOfContents />
      </div>

      {/* Simple Footer */}
      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>MIT License © {new Date().getFullYear()} GalaUI</span>
          <span>Powered by Base UI & Tailwind CSS v4</span>
        </div>
      </footer>
    </div>
  );
}
