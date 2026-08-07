import { AnimatePresence, motion } from "framer-motion";
import { useThemeStore } from "../store/themeStore.js";
import { SunIcon, MoonIcon } from "./Icons.jsx";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9, rotate: 15 }}
      className={`relative grid place-items-center w-[38px] h-[38px] rounded-full bg-surface border border-border text-text-muted hover:text-accent hover:border-border-strong transition-colors overflow-hidden ${className}`}
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"}
      title={theme === "dark" ? "Modo claro" : "Modo oscuro"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -90, scale: 0.4 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.4 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <SunIcon width={18} height={18} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: 90, scale: 0.4 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.4 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <MoonIcon width={18} height={18} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
