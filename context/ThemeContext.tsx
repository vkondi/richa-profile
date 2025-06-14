"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Theme = "light" | "dark";

const colorPalettes = {
  dark: {
    primary: "#0d1b2a",
    secondary: "#1b263b",
    tertiary: "#415a77",
    quaternary: "#778da9",
    accent: "#e0e1dd",
  },
  light: {
    primary: "#edafb8",
    secondary: "#f7e1d7",
    tertiary: "#dedbd2",
    quaternary: "#b0c4b1",
    accent: "#4a5759",
  },
};

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  colors: typeof colorPalettes.dark | typeof colorPalettes.light;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        colors: colorPalettes[theme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
