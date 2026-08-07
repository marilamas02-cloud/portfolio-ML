import { create } from "zustand";

const STORAGE_KEY = "ml-portfolio-theme";

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export const useThemeStore = create((set, get) => ({
  theme: getInitialTheme(),
  toggleTheme: () => {
    const next = get().theme === "dark" ? "light" : "dark";
    window.localStorage.setItem(STORAGE_KEY, next);
    set({ theme: next });
  },
}));
