import { createHighlighter, type Highlighter } from "shiki";

let highlighterPromise: Promise<Highlighter> | null = null;

export function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-light", "github-dark"],
      langs: ["javascript", "typescript", "tsx", "jsx", "bash", "html", "css", "json"],
    });
  }
  return highlighterPromise;
}

export async function highlightCode(code: string, lang = "tsx"): Promise<string> {
  const highlighter = await getHighlighter();
  const normalizedLang = lang === "sh" ? "bash" : lang;
  return highlighter.codeToHtml(code.trim(), {
    lang: normalizedLang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
    defaultColor: false,
  });
}
