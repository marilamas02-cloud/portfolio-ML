import { motion } from "framer-motion";
import Reveal, { StaggerGroup, staggerItemScale } from "./Reveal.jsx";
import { Icon } from "./Icons.jsx";
import { skillGroups } from "../data/profile.js";

export default function Skills() {
  return (
    <section id="skills">
      <div className="container mx-auto max-w-[1160px] px-6">
        <Reveal className="max-w-[620px] mx-auto mb-14 text-center">
          <span className="eyebrow">Habilidades técnicas</span>
          <h2 className="section-title text-[clamp(28px,4vw,40px)]">Herramientas que uso todos los días</h2>
        </Reveal>

        <StaggerGroup
          as="div"
          className="grid grid-cols-1 min-[560px]:grid-cols-2 lg:grid-cols-4 gap-5"
          stagger={0.08}
        >
          {skillGroups.map((group) => (
            <motion.div
              key={group.title}
              variants={staggerItemScale}
              whileHover={{ y: -5 }}
              className="card p-[26px]"
            >
              <motion.div
                whileHover={{ rotate: 8, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="grid place-items-center w-11 h-11 rounded-[10px] mb-[18px] text-accent"
                style={{ background: "var(--accent-soft)" }}
              >
                <Icon name={group.icon} width={20} height={20} />
              </motion.div>
              <h3 className="text-base mb-3.5">{group.title}</h3>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((s) => (
                  <span key={s} className="tag">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
