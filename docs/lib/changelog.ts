import { useState, useEffect, useCallback } from "react";

export interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string | null;
  body: string | null;
  published_at: string;
  html_url: string;
  prerelease: boolean;
}

interface CachedReleases {
  timestamp: number;
  releases: GitHubRelease[];
}

export const CACHE_KEY = "galaui_github_releases_cache";
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export function formatReleaseDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

export function useChangelog() {
  const [releases, setReleases] = useState<GitHubRelease[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadReleases = useCallback(async (force = false) => {
    setIsLoading(true);
    setError(null);

    // Check sessionStorage cache first unless forced
    if (!force && typeof window !== "undefined") {
      try {
        const cachedRaw = sessionStorage.getItem(CACHE_KEY);
        if (cachedRaw) {
          const cached: CachedReleases = JSON.parse(cachedRaw);
          if (Date.now() - cached.timestamp < CACHE_TTL_MS && Array.isArray(cached.releases)) {
            setReleases(cached.releases);
            setIsLoading(false);
            return;
          }
        }
      } catch {
        // ignore parse/storage errors
      }
    }

    try {
      const res = await fetch("https://api.github.com/repos/dianprata/galaui/releases?per_page=30");
      if (res.status === 403) {
        throw new Error("GitHub API rate limit exceeded. You can view all releases directly on GitHub.");
      }
      if (!res.ok) {
        throw new Error(`Failed to fetch releases from GitHub (HTTP ${res.status}).`);
      }

      const data: GitHubRelease[] = await res.json();
      // Sort by published_at descending
      const sorted = data.sort(
        (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      );

      setReleases(sorted);
      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ timestamp: Date.now(), releases: sorted })
          );
        } catch {
          // ignore storage quota errors
        }
      }
    } catch (err: any) {
      setError(err?.message || "Failed to load release history.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReleases();
  }, [loadReleases]);

  const latestVersion =
    releases.length > 0 ? releases[0].tag_name.replace(/^v/, "") : null;

  return {
    releases,
    isLoading,
    error,
    latestVersion,
    refetch: () => loadReleases(true),
  };
}
