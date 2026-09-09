import { useState, useEffect } from "react";
import packageJson from "../../package.json";
import { CACHE_KEY } from "./changelog";

export const PACKAGE_VERSION = packageJson.version;

function compareSemver(a: string, b: string): number {
  const pa = a.replace(/^v/, "").split(".").map((n) => parseInt(n, 10) || 0);
  const pb = b.replace(/^v/, "").split(".").map((n) => parseInt(n, 10) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const na = pa[i] ?? 0;
    const nb = pb[i] ?? 0;
    if (na > nb) return 1;
    if (na < nb) return -1;
  }
  return 0;
}

/**
 * Returns the GalaUI version.
 * Defaults to package.json version at build time.
 * In the browser, prioritizes GitHub release version, then npm registry.
 */
export function usePackageVersion(): string {
  const [version, setVersion] = useState<string>(PACKAGE_VERSION);

  useEffect(() => {
    // 1. Check cached GitHub releases first
    if (typeof window !== "undefined") {
      try {
        const cachedRaw = sessionStorage.getItem(CACHE_KEY);
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw);
          if (Array.isArray(cached?.releases) && cached.releases.length > 0) {
            const latest = cached.releases[0].tag_name.replace(/^v/, "");
            if (compareSemver(latest, PACKAGE_VERSION) >= 0) {
              setVersion(latest);
              return;
            }
          }
        }
      } catch {
        // ignore parse errors
      }
    }

    const controller = new AbortController();

    // 2. Fetch latest GitHub release, fallback to npm registry
    fetch("https://api.github.com/repos/dianprata/galaui/releases/latest", {
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.tag_name && typeof data.tag_name === "string") {
          const cleanTag = data.tag_name.replace(/^v/, "");
          if (compareSemver(cleanTag, PACKAGE_VERSION) >= 0) {
            setVersion(cleanTag);
            return;
          }
        }
        // Fallback to npm registry
        return fetch("https://registry.npmjs.org/@galaui/react/latest", {
          signal: controller.signal,
        })
          .then((res) => (res.ok ? res.json() : null))
          .then((npmData) => {
            if (npmData?.version && typeof npmData.version === "string") {
              if (compareSemver(npmData.version, PACKAGE_VERSION) > 0) {
                setVersion(npmData.version);
              }
            }
          });
      })
      .catch(() => {
        // Silently keep package.json version on network failure or offline
      });

    return () => controller.abort();
  }, []);

  return version;
}
