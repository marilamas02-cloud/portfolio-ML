import { motion } from "framer-motion";
import Reveal, { StaggerGroup, staggerItem } from "./Reveal.jsx";
import { profile } from "../data/profile.js";

const focusAreas = [
  { title: "E-commerce", desc: "Catálogos de producto pensados para convertir visitas en clientes." },
  { title: "Plataformas SaaS", desc: "Sistemas de reservas y gestión con autenticación y pagos integrados." },
  { title: "Sitios a medida", desc: "Presencia web para negocios, con foco en performance y mantenimiento." },
];

const infoRows = [
  ["Ubicación", profile.location],
  ["Modalidad", "Freelance"],
  ["Stack", "MongoDB · Express · React · Node"],
  ["Idiomas", "Español · Inglés B1–B2"],
  ["Liderazgo", "Scrum Master"],
];

export default function About() {
  return (
    <section id="about">
      <div className="container mx-auto max-w-[1160px] px-6 grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-14 items-start">
        <Reveal>
          <span className="eyebrow">Sobre mí</span>
          <h2 className="section-title text-[clamp(28px,4vw,40px)] mb-3.5">
            Construyo productos <span className="grad-text">MERN</span> de punta a punta
          </h2>
          <p className="text-text-muted text-[16.5px] max-w-[560px] my-4 mb-10">{profile.summary}</p>

          <StaggerGroup className="flex flex-col gap-5" stagger={0.1}>
            {focusAreas.map((item) => (
              <motion.div key={item.title} variants={staggerItem} className="flex gap-4">
                <span className="flex-shrink-0 w-2.5 h-2.5 mt-[7px] rounded-full grad-bg" />
                <div>
                  <h4 className="text-base mb-1">{item.title}</h4>
                  <p className="text-text-muted text-[14.5px] max-w-[440px]">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </StaggerGroup>
        </Reveal>

        <Reveal delay={0.1}>
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="card shadow-card p-8"
          >
            <div className="flex items-center gap-3.5 pb-5 mb-5 border-b border-border">
              <span className="w-12 h-12 rounded-full grid place-items-center grad-bg text-white font-display font-bold flex-shrink-0">
                ML
              </span>
              <div className="flex flex-col">
                <strong className="text-[15.5px]">{profile.name}</strong>
                <span className="text-[13.5px] text-text-muted">{profile.role}</span>
              </div>
            </div>
            <ul className="flex flex-col gap-4">
              {infoRows.map(([label, value]) => (
                <li key={label} className="flex justify-between gap-3 text-sm">
                  <span className="text-text-faint">{label}</span>
                  <strong className="font-semibold text-right">{value}</strong>
                </li>
              ))}
            </ul>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
