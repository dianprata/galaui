import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button, cn } from "@/index";

export function ThemeToggle({ className }: { className?: string } = {}) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("galaui-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("galaui-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("galaui-theme", "light");
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggle}
      className={cn("h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-foreground", className)}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
