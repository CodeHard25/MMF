import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button.tsx";
import { useTheme } from "./ThemeProvider.tsx";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  // Prevent unnecessary animations and transitions on initial load
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="rounded-full bg-elevate-beige/80 dark:bg-elevate-gray-dark/80 backdrop-blur-md border border-elevate-beige-dark/20"
      >
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full bg-elevate-beige/95 dark:bg-elevate-gray-dark/95 backdrop-blur-md border border-elevate-beige-dark/20 hover:border-elevate-brown transition-all duration-300 hover:scale-110"
      aria-label="Toggle theme"
    >
      {theme === "dark"
        ? (
          <Sun className="h-5 w-5 text-elevate-beige-light animate-pulse-light" />
        )
        : <Moon className="h-5 w-5 text-elevate-brown-chocolate" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default React.memo(ThemeToggle);
