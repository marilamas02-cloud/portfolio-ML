import { motion } from "framer-motion";
import Reveal, { StaggerGroup, staggerItem } from "./Reveal.jsx";
import { education } from "../data/profile.js";

export default function Education() {
  return (
    <section id="education">
      <div className="container mx-auto max-w-[1160px] px-6">
        <Reveal className="mb-14">
          <span className="eyebrow">Formación</span>
          <h2 className="section-title text-[clamp(28px,4vw,40px)]">Formación académica</h2>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -3 }}
          className="card p-9"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {education.map((school, i) => (
              <motion.div
                key={school.school}
                initial={{ opacity: 0, x: i === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.15 }}
                className={`${
                  i === 0
                    ? ""
                    : "md:pl-8 md:border-l md:border-border pt-7 md:pt-0 border-t md:border-t-0 border-border"
                }`}
              >
                <h3 className="text-lg mb-[22px] pb-4 border-b border-border">{school.school}</h3>
                <StaggerGroup className="flex flex-col gap-5" stagger={0.12} delay={0.3 + i * 0.15}>
                  {school.items.map((item) => (
                    <motion.div
                      key={item.title}
                      variants={staggerItem}
                      whileHover={{ x: 4 }}
                      className="relative pl-[18px] group cursor-default"
                    >
                      <span className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full bg-border-strong overflow-hidden">
                        <motion.span
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                          className="absolute inset-0 origin-top grad-bg"
                        />
                      </span>
                      <h4 className="text-[15px] mb-1 transition-colors group-hover:text-accent">{item.title}</h4>
                      <p className="text-text-muted text-sm">{item.description}</p>
                    </motion.div>
                  ))}
                </StaggerGroup>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
