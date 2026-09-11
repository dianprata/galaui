import type { ReactNode } from "react";
import { Link } from "wouter";
import { Sidebar } from "./Sidebar";
import { Logo } from "./Logo";
import { TableOfContents, MobileTableOfContents } from "./TableOfContents";
import { Breadcrumbs } from "./Breadcrumbs";
import { DocsPagination } from "./DocsPagination";
import { Navbar } from "./Navbar";
import { Button } from "@/index";
import { cn } from "@/index";
import { X } from "lucide-react";

interface DocsLayoutProps {
  children: ReactNode;
  className?: string;
}

export function DocsLayout({ children, className }: DocsLayoutProps) {
  return (
    <div className={cn("min-h-screen bg-background text-foreground flex flex-col antialiased", className)}>
      <Navbar
        mobileDrawerContent={({ close }) => (
          <>
            <div className="p-4 border-b border-border flex items-center justify-between shrink-0">
              <Link href="/" onClick={close} className="flex items-center gap-2 font-bold tracking-tight text-foreground hover:opacity-90">
                <Logo withText size={28} />
              </Link>
              <Button variant="ghost" size="icon-sm" onClick={close} title="Close menu">
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <Sidebar onNavigate={close} className="w-full h-auto border-r-0 static" />
            </div>
          </>
        )}
      />

      {/* Body Container */}
      <div className="flex-1 flex max-w-[1440px] w-full mx-auto">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main Documentation Content */}
        <main className="flex-1 min-w-0 flex flex-col">
          <MobileTableOfContents />
          <div className="flex-1 px-6 py-8 md:px-10 md:py-10 max-w-4xl w-full mx-auto">
            <Breadcrumbs />
            <div className="docs-content prose prose-zinc dark:prose-invert max-w-none prose-headings:scroll-mt-28 xl:prose-headings:scroll-mt-20 prose-headings:tracking-tight prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-4 prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-p:text-base prose-p:leading-relaxed prose-p:text-muted-foreground prose-p:my-3 prose-ul:my-3 prose-ul:space-y-1.5 prose-ul:text-base prose-ol:my-3 prose-ol:space-y-1.5 prose-ol:text-base prose-hr:my-6 prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:font-mono prose-code:text-sm">
              {children}
            </div>
            <DocsPagination />
          </div>
        </main>

        {/* Right Table of Contents (On this page) */}
        <TableOfContents />
      </div>

      {/* Simple Footer */}
      {/* <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        <div className="max-w-[1440px] mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>MIT License © {new Date().getFullYear()} GalaUI</span>
          <span>Powered by Base UI & Tailwind CSS v4</span>
        </div>
      </footer> */}
    </div>
  );
}
