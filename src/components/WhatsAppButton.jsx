import { motion } from "framer-motion";
import { profile } from "../data/profile.js";
import { WhatsAppIcon } from "./Icons.jsx";

export default function WhatsAppButton() {
  const message = "Hola Marisol! Vi tu portfolio y quería contactarte.";
  const href = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribime por WhatsApp"
      initial={{ opacity: 0, scale: 0.4, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.94 }}
      className="group fixed bottom-7 left-7 z-[90] flex items-center rounded-full grad-bg text-white shadow-glow"
    >
      <span className="relative grid place-items-center w-14 h-14 flex-shrink-0">
        <span className="absolute inset-0 rounded-full animate-pulse-ring" />
        <WhatsAppIcon width={26} height={26} />
      </span>
      <span className="max-w-0 group-hover:max-w-[140px] overflow-hidden whitespace-nowrap text-sm font-semibold transition-[max-width] duration-300 ease-swift">
        <span className="block pr-5">Escribime</span>
      </span>
    </motion.a>
  );
}
