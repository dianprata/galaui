import { useMemo } from "react";
import { marked } from "marked";
import { Badge, Button, Skeleton, Separator } from "@/index";
import { useChangelog, formatReleaseDate } from "@docs/lib/changelog";
import { usePackageVersion } from "@docs/lib/version";
import { ExternalLink, RefreshCw, AlertCircle, Tag } from "lucide-react";

export default function ChangelogPage() {
  const { releases, isLoading, error, latestVersion, refetch } = useChangelog();
  const currentVersion = usePackageVersion();
  const displayVersion = latestVersion || currentVersion;

  // Pre-render marked markdown bodies to html safely
  const parsedReleases = useMemo(() => {
    return releases.map((rel) => {
      const raw = rel.body?.trim() || "_No release notes provided for this version._";
      const html = marked.parse(raw, { gfm: true, breaks: true }) as string;
      return {
        ...rel,
        html,
      };
    });
  }, [releases]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-3 text-foreground">
          Changelog
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed my-2.5">
          All notable changes, releases, and improvements to <strong>@galaui/react</strong> are dynamically fetched from our GitHub release stream. GalaUI adheres to{" "}
          <a
            href="https://semver.org/"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline font-medium"
          >
            Semantic Versioning
          </a>
          .
        </p>

        <div className="flex flex-wrap items-center gap-2 my-4 not-prose">
          <Badge variant="default" className="font-mono text-xs px-2.5 py-1">
            Current: v{displayVersion}
          </Badge>
          <Badge variant="outline" className="text-xs px-2 py-1">
            47 Accessible Components
          </Badge>
          <Badge variant="secondary" className="text-xs px-2 py-1">
            Base UI + Tailwind CSS v4
          </Badge>
          <a
            href="https://github.com/dianprata/galaui/releases"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors ml-auto py-1 px-2 rounded-md hover:bg-muted"
          >
            <span>GitHub Releases</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <Separator />

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="space-y-10 not-prose">
          {[1, 2, 3].map((n) => (
            <div key={n} className="space-y-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-7 w-28 rounded-md" />
                <Skeleton className="h-5 w-24 rounded-full" />
              </div>
              <Skeleton className="h-4 w-40 rounded" />
              <div className="space-y-2 pt-2">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-5/6 rounded" />
                <Skeleton className="h-4 w-4/6 rounded" />
              </div>
              <Separator className="mt-8" />
            </div>
          ))}
        </div>
      )}

      {/* Error Fallback */}
      {!isLoading && error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 sm:p-6 space-y-3 not-prose">
          <div className="flex items-center gap-2.5 text-destructive font-semibold text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Unable to load releases dynamically</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {error}
          </p>
          <div className="flex items-center gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              className="text-xs"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
              Retry
            </Button>
            <a
              href="https://github.com/dianprata/galaui/releases"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="default" size="sm" className="text-xs">
                <span>View Releases on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </a>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && parsedReleases.length === 0 && (
        <div className="rounded-xl border border-border p-8 text-center space-y-3 not-prose">
          <Tag className="w-8 h-8 text-muted-foreground mx-auto" />
          <h3 className="text-base font-semibold text-foreground">No published releases found</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Releases will appear here automatically once created on the repository.
          </p>
          <a
            href="https://github.com/dianprata/galaui/releases"
            target="_blank"
            rel="noreferrer"
            className="inline-block pt-2"
          >
            <Button variant="outline" size="sm" className="text-xs">
              Check GitHub Releases
              <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </a>
        </div>
      )}

      {/* Releases List */}
      {!isLoading && !error && parsedReleases.length > 0 && (
        <div className="space-y-12">
          {parsedReleases.map((release, index) => {
            const isLatest = index === 0;
            const versionTag = release.tag_name.startsWith("v")
              ? release.tag_name
              : `v${release.tag_name}`;
            const headingId = versionTag.toLowerCase().replace(/[^a-z0-9]+/g, "-");

            return (
              <section key={release.id} className="space-y-4">
                {/* Release Header */}
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border/60 pb-3">
                  <h2
                    id={headingId}
                    className="text-2xl font-bold tracking-tight text-foreground m-0 scroll-mt-28 xl:scroll-mt-20 flex items-center gap-2.5"
                  >
                    <a
                      href={release.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-primary transition-colors inline-flex items-center gap-1.5 no-underline"
                    >
                      <span>{release.name || versionTag}</span>
                      <ExternalLink className="w-4 h-4 opacity-40 hover:opacity-100 transition-opacity" />
                    </a>
                  </h2>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground not-prose">
                    <span className="font-medium text-foreground">
                      {formatReleaseDate(release.published_at)}
                    </span>
                    {isLatest && (
                      <>
                        <span>•</span>
                        <Badge variant="default" size="xs" className="font-medium">
                          Latest Release
                        </Badge>
                      </>
                    )}
                    {release.prerelease && (
                      <>
                        <span>•</span>
                        <Badge variant="secondary" size="xs">
                          Pre-release
                        </Badge>
                      </>
                    )}
                  </div>
                </div>

                {/* Markdown Release Content */}
                <div
                  className="prose prose-zinc dark:prose-invert max-w-none text-sm text-muted-foreground prose-headings:text-foreground prose-headings:font-semibold prose-headings:tracking-tight prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2 prose-p:my-2 prose-ul:my-2 prose-ul:space-y-1 prose-li:leading-relaxed prose-a:text-primary hover:prose-a:underline prose-code:font-mono prose-code:text-xs prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded"
                  dangerouslySetInnerHTML={{ __html: release.html }}
                />
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
