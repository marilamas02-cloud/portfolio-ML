import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import Reveal, { StaggerGroup, staggerItemScale } from "./Reveal.jsx";
import { projects } from "../data/projects.js";
import { ExternalLinkIcon } from "./Icons.jsx";

const categoryLabel = {
  ecommerce: "E-commerce",
  saas: "SaaS",
  web: "Sitio web",
  other: "Proyectos varios",
};

const coverGradient = {
  ecommerce: "linear-gradient(135deg, #6366f1, #a855f7)",
  saas: "linear-gradient(135deg, #0ea5e9, #22d3ee)",
  web: "linear-gradient(135deg, #34d399, #22d3ee)",
  other: "linear-gradient(135deg, #f97316, #f43f5e)",
};

function ProjectCard({ project }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateXRaw = useTransform(my, [0, 1], [7, -7]);
  const rotateYRaw = useTransform(mx, [0, 1], [-7, 7]);
  const rotateX = useSpring(rotateXRaw, { stiffness: 300, damping: 24 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 300, damping: 24 });
  const mxPercent = useTransform(mx, (v) => `${v * 100}%`);
  const myPercent = useTransform(my, (v) => `${v * 100}%`);
  const glow = useMotionTemplate`radial-gradient(220px circle at ${mxPercent} ${myPercent}, rgba(255,255,255,0.08), transparent 70%)`;

  function handleMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }
  function handleLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  const Tag = project.link ? motion.a : motion.article;

  return (
    <motion.div variants={staggerItemScale} style={{ perspective: 900 }} className="h-full">
      <Tag
        {...(project.link ? { href: project.link, target: "_blank", rel: "noopener noreferrer" } : {})}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{ rotateX, rotateY }}
        whileHover={{ y: -6 }}
        className="card overflow-hidden flex flex-col relative cursor-pointer group h-full"
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10"
          style={{ background: glow }}
        />
        <div className="flex gap-1.5 px-4 py-3.5 bg-surface-2 border-b border-border">
          <span className="w-2.5 h-2.5 rounded-full bg-border-strong" />
          <span className="w-2.5 h-2.5 rounded-full bg-border-strong" />
          <span className="w-2.5 h-2.5 rounded-full bg-border-strong" />
        </div>

        <div
          className="h-[190px] relative overflow-hidden"
          style={!project.image ? { background: coverGradient[project.category] ?? coverGradient.other } : undefined}
        >
          {project.image && (
            <img
              src={project.image}
              alt={`Captura del sitio de ${project.title}`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 ease-swift group-hover:scale-[1.08]"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
          <span className="absolute left-4 bottom-4 z-[1] px-3 py-1.5 rounded-full bg-black/35 text-white text-xs font-semibold backdrop-blur-sm">
            {categoryLabel[project.category] ?? "Proyecto"}
          </span>
        </div>

        <div className="p-[22px] flex flex-col gap-3 flex-1">
          <div className="flex items-baseline justify-between gap-2.5">
            <h3 className="text-[17.5px]">{project.title}</h3>
            {project.period && <span className="text-xs text-text-faint whitespace-nowrap">{project.period}</span>}
          </div>
          <p className="text-text-muted text-[14.5px] flex-1">{project.description}</p>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {project.tags?.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          {project.link && (
            <span className="group inline-flex items-center gap-1.5 mt-1.5 text-[13.5px] font-semibold text-accent">
              Ver sitio
              <ExternalLinkIcon width={14} height={14} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          )}
        </div>
      </Tag>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects">
      <div className="container mx-auto max-w-[1160px] px-6">
        <Reveal className="max-w-[620px] mx-auto mb-14 text-center">
          <span className="eyebrow">Proyectos</span>
          <h2 className="section-title text-[clamp(28px,4vw,40px)] mb-3.5">Trabajo con clientes reales</h2>
          <p className="text-text-muted text-[17px] mx-auto">
            Una muestra de los proyectos freelance desarrollados con el stack MERN.
          </p>
        </Reveal>

        <StaggerGroup
          as="div"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          stagger={0.08}
        >
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
