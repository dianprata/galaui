import { Router, Route, Switch, Redirect } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { DocsLayout } from "./components/DocsLayout";
import { allRoutes } from "./routes";
import { MDXProvider } from "@mdx-js/react";

const mdxComponents = {
  h1: (props: any) => <h1 className="text-3xl font-bold tracking-tight mb-3 text-foreground" {...props} />,
  h2: (props: any) => <h2 className="text-xl font-semibold tracking-tight mt-8 mb-3 pb-2 border-b border-border text-foreground" {...props} />,
  h3: (props: any) => <h3 className="text-base font-semibold mt-6 mb-2 text-foreground" {...props} />,
  p: (props: any) => <p className="text-sm text-muted-foreground leading-relaxed my-3" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-5 my-3 space-y-1 text-sm text-muted-foreground" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-5 my-3 space-y-1 text-sm text-muted-foreground" {...props} />,
  li: (props: any) => <li className="leading-relaxed" {...props} />,
  hr: (props: any) => <hr className="my-8 border-border" {...props} />,
  strong: (props: any) => <strong className="font-semibold text-foreground" {...props} />,
  code: ({ className, ...props }: any) => {
    if (className) {
      return <code className={className} {...props} />;
    }
    return <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs text-foreground" {...props} />;
  },
  table: (props: any) => (
    <div className="my-6 w-full overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-xs text-left border-collapse" {...props} />
    </div>
  ),
  th: (props: any) => <th className="border-b border-border bg-muted/50 px-4 py-2.5 font-semibold text-foreground" {...props} />,
  td: (props: any) => <td className="border-b border-border/60 px-4 py-2 text-muted-foreground" {...props} />,
};

export default function App() {
  return (
    <Router hook={useHashLocation}>
      <DocsLayout>
        <MDXProvider components={mdxComponents}>
          <Switch>
            <Route path="/">
              <Redirect to="/getting-started/introduction" />
            </Route>

            {allRoutes.map((route) => {
              const Component = route.component;
              return (
                <Route key={route.path} path={route.path}>
                  <article className="animate-in fade-in-50 duration-200">
                    <Component />
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
                <a
                  href="#/getting-started/introduction"
                  className="inline-flex items-center justify-center h-8 px-4 rounded-lg bg-primary text-primary-foreground text-xs font-medium"
                >
                  Return to Introduction
                </a>
              </div>
            </Route>
          </Switch>
        </MDXProvider>
      </DocsLayout>
    </Router>
  );
}
