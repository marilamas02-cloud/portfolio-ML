import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "../data/profile.js";
import { ArrowUpIcon } from "./Icons.jsx";

const links = [
  ["about", "Sobre mí"],
  ["experience", "Experiencia"],
  ["projects", "Proyectos"],
  ["skills", "Habilidades"],
  ["contact", "Contacto"],
];

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="border-t border-border py-12 bg-bg-soft">
      <div className="container mx-auto max-w-[1160px] px-6 flex flex-wrap items-center justify-between gap-6 text-center md:text-left">
        <div className="flex items-center gap-3">
          <span className="grid place-items-center w-[34px] h-[34px] rounded-[10px] grad-bg text-white text-[13px] font-bold font-display">
            ML
          </span>
          <div className="flex flex-col text-left">
            <strong className="font-display text-[14.5px]">{profile.name}</strong>
            <span className="text-[12.5px] text-text-muted">Desarrolladora Web Full Stack · MERN Stack</span>
          </div>
        </div>

        <nav className="flex gap-5 flex-wrap justify-center" aria-label="Navegación de pie de página">
          {links.map(([id, label]) => (
            <motion.a
              key={id}
              href={`#${id}`}
              whileHover={{ y: -2 }}
              className="text-[13.5px] text-text-muted hover:text-text transition-colors"
            >
              {label}
            </motion.a>
          ))}
        </nav>

        <p className="text-[12.5px] text-text-faint w-full md:w-auto text-center md:text-right">
          © {new Date().getFullYear()} {profile.name}.
        </p>
      </div>

      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 16, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.8 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 26 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Volver arriba"
            className="fixed bottom-7 right-7 w-11 h-11 rounded-full grid place-items-center grad-bg text-white shadow-glow z-[90]"
          >
            <ArrowUpIcon width={18} height={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
