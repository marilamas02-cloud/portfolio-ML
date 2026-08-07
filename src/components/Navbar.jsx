import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle.jsx";
import { MenuIcon, XIcon } from "./Icons.jsx";

const LINKS = [
  { id: "about", label: "Sobre mí" },
  { id: "experience", label: "Experiencia" },
  { id: "projects", label: "Proyectos" },
  { id: "skills", label: "Habilidades" },
  { id: "contact", label: "Contacto" },
];

const EASE = [0.16, 1, 0.3, 1];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("about");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[100] h-[76px] flex items-center border-b transition-colors duration-300 ${
        scrolled ? "border-border shadow-xs" : "border-transparent"
      }`}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 transition-all duration-300 ${
          scrolled ? "bg-bg/80 backdrop-blur-xl backdrop-saturate-150" : "bg-transparent"
        }`}
      />
      <div className="container mx-auto max-w-[1160px] px-6 flex items-center justify-between gap-6">
        <motion.a
          href="#top"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2.5 font-display font-semibold text-[15px]"
          onClick={() => setOpen(false)}
        >
          <span className="grid place-items-center w-[34px] h-[34px] rounded-[10px] grad-bg text-white text-[13px] font-bold tracking-tight">
            ML
          </span>
          <span className="text-text hidden min-[560px]:inline">Marisol&nbsp;Lamas</span>
        </motion.a>

        <nav
          className="hidden md:flex items-center gap-1 bg-surface border border-border p-[5px] rounded-full"
          aria-label="Navegación principal"
        >
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                active === link.id ? "text-text" : "text-text-muted hover:text-text"
              }`}
            >
              {active === link.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-surface-2"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <motion.a
            href="#contact"
            whileHover={{ y: -2, boxShadow: "0 0 0 1px rgba(99,102,241,0.35), 0 26px 70px -18px rgba(99,102,241,0.5)" }}
            whileTap={{ scale: 0.97 }}
            className="btn btn-primary !px-[18px] !py-[9px] !text-[13.5px] hidden min-[560px]:inline-flex"
          >
            Contactarme
          </motion.a>
          <button
            type="button"
            className="grid md:hidden place-items-center w-[38px] h-[38px] rounded-full bg-surface border border-border text-text"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <XIcon width={22} height={22} /> : <MenuIcon width={22} height={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-x-0 top-[76px] h-[calc(100dvh-76px)] bg-bg border-t border-border md:hidden overflow-y-auto"
          >
            <motion.nav
              aria-label="Navegación móvil"
              className="flex flex-col gap-1.5 p-6"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
            >
              {LINKS.map((link) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="py-4 px-1.5 text-[19px] font-medium text-text border-b border-border"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.35, ease: EASE }}
                className="btn btn-primary mt-4 text-center"
              >
                Contactarme
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
