import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal, { StaggerGroup, staggerItem } from "./Reveal.jsx";
import { experience } from "../data/profile.js";

export default function Experience() {
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.8", "end 0.6"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience">
      <div className="container mx-auto max-w-[1160px] px-6">
        <Reveal className="max-w-[620px] mb-14">
          <span className="eyebrow">Experiencia</span>
          <h2 className="section-title text-[clamp(28px,4vw,40px)] mb-3.5">Trayectoria profesional</h2>
          <p className="text-text-muted text-[17px] max-w-[560px]">
            Desde abril de 2025 trabajo como freelance, llevando proyectos completos de principio a fin para
            clientes reales.
          </p>
        </Reveal>

        <div className="max-w-[760px]">
          <Reveal className="flex items-center gap-4 mb-2">
            <span className="w-3.5 h-3.5 rounded-full grad-bg shadow-[0_0_0_5px_var(--accent-soft)] flex-shrink-0" />
            <div>
              <h3 className="text-xl">{experience.title}</h3>
              <span className="text-[13.5px] text-accent font-semibold">{experience.period}</span>
            </div>
          </Reveal>

          <div ref={listRef} className="relative ml-1.5 pl-[34px] pt-3 pb-1">
            <div className="absolute left-1.5 top-3 bottom-1 w-0.5 bg-border" />
            <motion.div
              className="absolute left-1.5 top-3 bottom-1 w-0.5 grad-bg origin-top"
              style={{ scaleY: lineScale }}
            />

            <StaggerGroup className="flex flex-col gap-8" stagger={0.12}>
              {experience.highlights.map((item) => {
                const [label, ...rest] = item.split(":");
                return (
                  <motion.div key={label} variants={staggerItem} className="relative">
                    <span className="absolute -left-[41px] top-[5px] w-2.5 h-2.5 rounded-full bg-surface border-2 border-accent" />
                    <h4 className="text-[16.5px] mb-1.5">{label}</h4>
                    <p className="text-text-muted text-[15px]">{rest.join(":").trim()}</p>
                  </motion.div>
                );
              })}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
