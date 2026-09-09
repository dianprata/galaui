import { useEffect } from "react";
import { Router, Route, Switch, Link, useLocation } from "wouter";
import LandingPage from "./LandingPage";
import { DocsLayout } from "./components/DocsLayout";
import { allRoutes } from "./routes";
import { MDXProvider } from "@mdx-js/react";
import { PropsTable } from "./components/PropsTable";
import { ApiReference } from "./components/ApiReference";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Separator,
  Button,
  Toaster,
} from "@/index";

function slugify(text: any): string {
  if (typeof text !== "string") {
    if (Array.isArray(text)) {
      text = text.map((t) => (typeof t === "string" ? t : "")).join("");
    } else {
      text = String(text || "");
    }
  }
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const mdxComponents = {
  h1: (props: any) => <h1 className="text-3xl font-bold tracking-tight mb-3 text-foreground" {...props} />,
  h2: (props: any) => {
    const id = props.id || slugify(props.children);
    return (
      <h2
        id={id}
        className="text-xl font-semibold tracking-tight mt-8 mb-3 text-foreground scroll-mt-28 xl:scroll-mt-20"
        {...props}
      />
    );
  },
  h3: (props: any) => {
    const id = props.id || slugify(props.children);
    return (
      <h3
        id={id}
        className="text-base font-semibold mt-5 mb-2 text-foreground scroll-mt-28 xl:scroll-mt-20"
        {...props}
      />
    );
  },
  p: (props: any) => <p className="text-sm text-muted-foreground leading-relaxed my-2.5" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-5 my-3 space-y-1 text-sm text-muted-foreground" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-5 my-3 space-y-1 text-sm text-muted-foreground" {...props} />,
  li: (props: any) => <li className="leading-relaxed" {...props} />,
  hr: (props: any) => <Separator className="my-6" {...props} />,
  strong: (props: any) => <strong className="font-semibold text-foreground" {...props} />,
  code: ({ className, ...props }: any) => {
    if (className) {
      return <code className={className} {...props} />;
    }
    return <code className="px-1.5 py-0.5 rounded-md bg-muted font-mono text-xs text-foreground border border-border/50" {...props} />;
  },
  table: (props: any) => <Table className="my-5" {...props} />,
  thead: (props: any) => <TableHeader {...props} />,
  tbody: (props: any) => <TableBody {...props} />,
  tr: (props: any) => <TableRow {...props} />,
  th: (props: any) => <TableHead {...props} />,
  td: (props: any) => <TableCell {...props} />,
  PropsTable,
  ApiReference,
};

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // If there is an anchor hash in the URL, let it scroll to the target element
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: isReducedMotion ? "auto" : "smooth",
    });
  }, [location]);

  return null;
}

export default function App() {
  return (
    <>
      <Toaster />
    <Router>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route>
          <DocsLayout>
            <MDXProvider components={mdxComponents}>
              <Switch>

            {allRoutes.map((route) => {
              const Component = route.component;
              return (
                <Route key={route.path} path={route.path}>
                  <article className="animate-in fade-in-50 duration-200">
                    <Component components={mdxComponents} />
                  </article>
                </Route>
              );
            })}

            <Route>
              <div className="py-16 text-center space-y-4">
                <h2 className="text-2xl font-bold">404 - Page Not Found</h2>
                <p className="text-sm text-muted-foreground">
                  The page you are looking for does not exist or has moved.
                </p>
                <Link href="/getting-started/introduction">
                  <Button variant="default" size="sm">
                    Return to Introduction
                  </Button>
                </Link>
              </div>
            </Route>
              </Switch>
            </MDXProvider>
          </DocsLayout>
        </Route>
      </Switch>
    </Router>
    </>
  );
}
