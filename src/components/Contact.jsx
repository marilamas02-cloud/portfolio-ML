import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal, { StaggerGroup, staggerItem } from "./Reveal.jsx";
import { profile } from "../data/profile.js";
import { MailIcon, PhoneIcon, MapPinIcon, CheckCircleIcon } from "./Icons.jsx";

const initialForm = { name: "", message: "" };

const contactItems = [
  { icon: MailIcon, label: "Email", value: (p) => p.email, href: (p) => `mailto:${p.email}` },
  { icon: PhoneIcon, label: "Teléfono", value: (p) => p.phone, href: (p) => `tel:${p.phoneHref}` },
  { icon: MapPinIcon, label: "Ubicación", value: (p) => p.location, href: null },
];

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const text = `Hola Marisol, soy ${form.name}. ${form.message}`;
    window.open(`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setSent(true);
    setForm(initialForm);
  }

  const inputClass =
    "px-[15px] py-[13px] rounded-[10px] bg-surface-2 border border-border text-text text-[14.5px] resize-y transition-all duration-200 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-soft)]";

  return (
    <section id="contact">
      <div className="container mx-auto max-w-[1160px] px-6 grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-14 items-start">
        <Reveal>
          <span className="eyebrow">Contacto</span>
          <h2 className="section-title text-[clamp(28px,4vw,40px)] mb-3.5">
            Hablemos de tu <span className="grad-text">próximo proyecto</span>
          </h2>
          <p className="text-text-muted text-[17px] max-w-[560px]">
            Contame qué necesitás y te respondo a la brevedad. También podés escribirme o llamarme directamente.
          </p>

          <StaggerGroup className="flex flex-col gap-3.5 mt-8" stagger={0.1}>
            {contactItems.map((item) => {
              const Icon = item.icon;
              const content = (
                <>
                  <span className="grid place-items-center w-[38px] h-[38px] rounded-[10px] flex-shrink-0 text-accent" style={{ background: "var(--accent-soft)" }}>
                    <Icon width={18} height={18} />
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[12.5px] text-text-faint">{item.label}</span>
                    <strong className="text-[14.5px] font-semibold">{item.value(profile)}</strong>
                  </div>
                </>
              );
              const className =
                "flex items-center gap-4 px-[18px] py-4 bg-surface border border-border rounded-2xl transition-colors";

              return item.href ? (
                <motion.a
                  key={item.label}
                  variants={staggerItem}
                  whileHover={{ x: 4, borderColor: "var(--border-strong)" }}
                  href={item.href(profile)}
                  className={className}
                >
                  {content}
                </motion.a>
              ) : (
                <motion.div key={item.label} variants={staggerItem} className={className}>
                  {content}
                </motion.div>
              );
            })}
          </StaggerGroup>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="eyebrow invisible hidden md:inline-flex" aria-hidden="true">
            Contacto
          </span>
          <form className="card p-8 flex flex-col gap-5" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-2 text-[13.5px] font-semibold text-text-muted">
              Nombre
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Tu nombre"
                className={inputClass}
              />
            </label>
            <label className="flex flex-col gap-2 text-[13.5px] font-semibold text-text-muted">
              Mensaje
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Contame sobre tu proyecto..."
                className={inputClass}
              />
            </label>

            <motion.button
              type="submit"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-primary w-full mt-1.5"
            >
              Enviar por WhatsApp
            </motion.button>

            <AnimatePresence mode="wait">
              {sent && (
                <motion.p
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 text-[13.5px] px-3.5 py-3 rounded-[10px] overflow-hidden"
                  style={{ background: "rgba(52,211,153,0.12)", color: "#34d399" }}
                >
                  <CheckCircleIcon width={16} height={16} /> ¡Listo! Se abrió WhatsApp para que envíes tu mensaje.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
