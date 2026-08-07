import { motion } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1];

export const staggerContainer = (stagger = 0.08, delay = 0.05) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const staggerItemScale = {
  hidden: { opacity: 0, y: 20, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE } },
};

export default function Reveal({ as = "div", delay = 0, className = "", children, ...rest }) {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerGroup({ as = "div", className = "", stagger, delay, children, ...rest }) {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
