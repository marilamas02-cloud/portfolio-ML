import { motion } from "framer-motion";
import Reveal, { StaggerGroup, staggerItem } from "./Reveal.jsx";
import { languages } from "../data/profile.js";

export default function Languages() {
  return (
    <section id="languages">
      <div className="container mx-auto max-w-[1160px] px-6">
        <Reveal className="mb-14">
          <span className="eyebrow">Idiomas</span>
          <h2 className="section-title text-[clamp(28px,4vw,40px)]">Comunicación</h2>
        </Reveal>

        <StaggerGroup as="div" className="max-w-[620px] flex flex-col gap-7" stagger={0.12}>
          {languages.map((lang) => (
            <motion.div key={lang.name} variants={staggerItem}>
              <div className="flex justify-between items-baseline mb-2.5">
                <span className="font-display font-semibold text-base">{lang.name}</span>
                <span className="text-[13.5px] text-text-muted">{lang.level}</span>
              </div>
              <div className="h-2 rounded-full bg-surface-2 border border-border overflow-hidden">
                <motion.div
                  className="h-full rounded-full grad-bg"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lang.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                />
              </div>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
