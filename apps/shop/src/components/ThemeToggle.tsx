'use client';

import { Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-gray-300 hover:text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-gray-600 hover:text-yellow-500" />
      )}
    </button>
  );
};

export default ThemeToggle;
