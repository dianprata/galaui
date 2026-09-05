import { useState, useEffect } from "react";
import packageJson from "../../package.json";

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
 * In the browser, optionally checks the npm registry for the latest release.
 */
export function usePackageVersion(): string {
  const [version, setVersion] = useState<string>(PACKAGE_VERSION);

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://registry.npmjs.org/@galaui/react/latest", {
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.version && typeof data.version === "string") {
          // Only upgrade if npm has a newer version than current build
          if (compareSemver(data.version, PACKAGE_VERSION) > 0) {
            setVersion(data.version);
          }
        }
      })
      .catch(() => {
        // Silently keep package.json version on network failure or offline
      });

    return () => controller.abort();
  }, []);

  return version;
}
