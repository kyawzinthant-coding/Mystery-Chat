import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="h-9 w-9 rounded-full bg-muted/50 hover:bg-muted border border-border/50 transition-all duration-300 hover:shadow-glow"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-primary transition-all" />
      ) : (
        <Moon className="h-4 w-4 text-primary transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
