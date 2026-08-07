import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "framer-motion";
import { profile } from "../data/profile.js";
import { ArrowRightIcon, MapPinIcon, SparkleIcon } from "./Icons.jsx";
import { StaggerGroup, staggerItem, EASE } from "./Reveal.jsx";
import AnimatedNumber from "./AnimatedNumber.jsx";

const badges = ["React", "Node.js", "Express", "MongoDB"];

const headline = ["Hola,", "soy"];

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const mxPercent = useTransform(mx, (v) => `${v * 100}%`);
  const myPercent = useTransform(my, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(480px circle at ${mxPercent} ${myPercent}, var(--accent-soft), transparent 70%)`;

  function handlePointerMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="relative pt-[140px] overflow-hidden"
    >
      <motion.div
        aria-hidden="true"
        style={{ y: glowY, opacity: fade }}
        className="pointer-events-none absolute -top-56 left-1/2 -translate-x-1/2 w-[900px] h-[700px] -z-10"
      >
        <div
          className="absolute inset-0 animate-blob"
          style={{
            background:
              "radial-gradient(closest-side, rgba(99,102,241,0.22), transparent 70%), radial-gradient(closest-side at 70% 30%, rgba(34,211,238,0.16), transparent 70%)",
          }}
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: spotlight }}
      />

      <div className="container mx-auto max-w-[1160px] px-6 grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-12 items-center pb-14 md:pb-20 text-center md:text-left">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            className="pill mb-5"
          >
            <span className="w-2 h-2 rounded-full bg-accent-3 shadow-[0_0_0_4px_rgba(52,211,153,0.18)] animate-pulse-ring" />
            Disponible para nuevos proyectos
          </motion.span>

          <h1 className="text-[clamp(36px,5.4vw,60px)] mb-4 flex flex-wrap gap-x-4 justify-center md:justify-start">
            {headline.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: EASE }}
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              className="grad-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
            >
              {profile.name}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-display text-[clamp(17px,2vw,20px)] text-text-muted font-medium mb-5"
          >
            {profile.role} <span className="text-accent">·</span> {profile.stack}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.48, ease: EASE }}
            className="text-text-muted text-[16.5px] max-w-[560px] mx-auto md:mx-0 mb-9"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.56, ease: EASE }}
            className="flex gap-3.5 flex-wrap justify-center md:justify-start mb-10"
          >
            <motion.a
              href="#projects"
              whileHover={{ y: -2, boxShadow: "0 0 0 1px rgba(99,102,241,0.35), 0 26px 70px -18px rgba(99,102,241,0.5)" }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-primary"
            >
              Ver proyectos <ArrowRightIcon width={17} height={17} />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-ghost"
            >
              Contactarme
            </motion.a>
          </motion.div>

          <div className="flex items-center gap-6 flex-wrap justify-center md:justify-start">
            <span className="inline-flex items-center gap-1.5 text-text-muted text-sm">
              <MapPinIcon width={16} height={16} /> {profile.location}
            </span>
            <StaggerGroup className="flex gap-2 flex-wrap" stagger={0.08} delay={0.7}>
              {badges.map((b) => (
                <motion.span key={b} variants={staggerItem} className="tag">
                  {b}
                </motion.span>
              ))}
            </StaggerGroup>
          </div>
        </motion.div>

        <motion.div style={{ y: visualY }} className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="relative w-[260px] h-[260px] md:w-[340px] md:h-[340px] grid place-items-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-[3] w-[116px] h-[116px] md:w-[148px] md:h-[148px] rounded-full grad-bg grid place-items-center font-display text-[32px] md:text-[40px] font-bold text-white shadow-glow"
            >
              <SparkleIcon width={22} height={22} className="absolute top-2.5 right-3.5 opacity-85" />
              ML
            </motion.div>

            <div className="absolute inset-[22px] rounded-full border border-dashed border-border-strong animate-spin-slow" />
            <div className="absolute inset-0 rounded-full border border-dashed border-border-strong animate-spin-slow-rev" />

            {[
              { label: "React", cls: "top-1 left-[-6px] md:top-1 md:left-[-6px]", d: 0.2 },
              { label: "Node.js", cls: "top-9 right-[-18px]", d: 0.9 },
              { label: "MongoDB", cls: "bottom-7 left-[-22px]", d: 1.5 },
              { label: "Express", cls: "bottom-0 right-0", d: 0.5 },
            ].map((chip) => (
              <motion.span
                key={chip.label}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: chip.d }}
                className={`absolute z-[4] px-3.5 py-2 rounded-full bg-surface border border-border shadow-xs text-[12.5px] font-semibold text-text ${chip.cls}`}
              >
                {chip.label}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="border-t border-border bg-bg-soft">
        <div className="container mx-auto max-w-[1160px] px-6">
          <StaggerGroup
            as="div"
            className="grid grid-cols-3 gap-6 py-8"
            stagger={0.12}
          >
            {profile.stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                className="flex flex-col items-center text-center gap-1"
              >
                <span className="font-display text-2xl md:text-[26px] font-bold grad-text">
                  <AnimatedNumber value={stat.value} />
                </span>
                <span className="text-[13px] text-text-muted">{stat.label}</span>
              </motion.div>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
