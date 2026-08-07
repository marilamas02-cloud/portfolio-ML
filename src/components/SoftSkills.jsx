import { motion } from "framer-motion";
import Reveal, { StaggerGroup, staggerItemScale } from "./Reveal.jsx";
import { Icon } from "./Icons.jsx";
import { softSkills } from "../data/profile.js";

export default function SoftSkills() {
  return (
    <section id="leadership">
      <div className="container mx-auto max-w-[1160px] px-6">
        <Reveal className="max-w-[620px] mx-auto mb-14 text-center">
          <span className="eyebrow">Liderazgo &amp; soft skills</span>
          <h2 className="section-title text-[clamp(28px,4vw,40px)]">Cómo trabajo con equipos y clientes</h2>
        </Reveal>

        <StaggerGroup
          as="div"
          className="grid grid-cols-1 min-[560px]:grid-cols-2 lg:grid-cols-4 gap-5"
          stagger={0.08}
        >
          {softSkills.map((item) => (
            <motion.div key={item.title} variants={staggerItemScale} whileHover={{ y: -5 }} className="card p-7">
              <motion.div
                whileHover={{ rotate: -8, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="grid place-items-center w-11 h-11 rounded-[10px] mb-[18px] text-accent"
                style={{ background: "var(--accent-soft)" }}
              >
                <Icon name={item.icon} width={20} height={20} />
              </motion.div>
              <h3 className="text-base mb-2">{item.title}</h3>
              <p className="text-text-muted text-sm">{item.description}</p>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
