import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal, { StaggerGroup, staggerItem } from "./Reveal.jsx";
import { profile } from "../data/profile.js";
import { MailIcon, PhoneIcon, MapPinIcon, CheckCircleIcon, AlertIcon } from "./Icons.jsx";

const initialForm = { name: "", message: "" };

const NAME_MIN = 2;
const NAME_MAX = 60;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 500;
const NAME_RE = /^[a-zà-öø-ÿñÑ\s'-]+$/i;

function validate(form) {
  const errors = {};
  const name = form.name.trim();
  const message = form.message.trim();

  if (!name) errors.name = "Contame tu nombre.";
  else if (name.length < NAME_MIN) errors.name = `Mínimo ${NAME_MIN} caracteres.`;
  else if (name.length > NAME_MAX) errors.name = `Máximo ${NAME_MAX} caracteres.`;
  else if (!NAME_RE.test(name)) errors.name = "Usá solo letras.";

  if (!message) errors.message = "Escribí un mensaje.";
  else if (message.length < MESSAGE_MIN) errors.message = `Contame un poco más (mínimo ${MESSAGE_MIN} caracteres).`;
  else if (message.length > MESSAGE_MAX) errors.message = `Máximo ${MESSAGE_MAX} caracteres.`;

  return errors;
}

const contactItems = [
  { icon: MailIcon, label: "Email", value: (p) => p.email, href: (p) => `mailto:${p.email}` },
  { icon: PhoneIcon, label: "Teléfono", value: (p) => p.phone, href: (p) => `tel:${p.phoneHref}` },
  { icon: MapPinIcon, label: "Ubicación", value: (p) => p.location, href: null },
];

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((err) => (err[name] ? { ...err, [name]: undefined } : err));
    if (sent) setSent(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const text = `Hola Marisol, soy ${form.name.trim()}. ${form.message.trim()}`;
    window.open(`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setSent(true);
    setForm(initialForm);
  }

  function fieldClass(hasError) {
    return `px-[15px] py-[13px] rounded-[10px] bg-surface-2 border text-text text-[14.5px] resize-y transition-all duration-200 focus:outline-none ${
      hasError
        ? "border-danger focus:border-danger focus:shadow-[0_0_0_3px_rgba(248,113,113,0.15)]"
        : "border-border focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-soft)]"
    }`;
  }

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
          <form className="card p-8 flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
            <label className="flex flex-col gap-2 text-[13.5px] font-semibold text-text-muted">
              Nombre
              <input
                type="text"
                name="name"
                required
                minLength={NAME_MIN}
                maxLength={NAME_MAX}
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Tu nombre"
                aria-invalid={Boolean(errors.name)}
                className={fieldClass(Boolean(errors.name))}
              />
              <AnimatePresence>
                {errors.name && (
                  <motion.span
                    initial={{ opacity: 0, y: -4, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-1.5 text-[12.5px] font-normal text-danger overflow-hidden"
                  >
                    <AlertIcon width={13} height={13} /> {errors.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </label>
            <label className="flex flex-col gap-2 text-[13.5px] font-semibold text-text-muted">
              <span className="flex items-center justify-between">
                Mensaje
                <span className="text-[12px] font-normal text-text-faint">
                  {form.message.length}/{MESSAGE_MAX}
                </span>
              </span>
              <textarea
                name="message"
                required
                minLength={MESSAGE_MIN}
                maxLength={MESSAGE_MAX}
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Contame sobre tu proyecto..."
                aria-invalid={Boolean(errors.message)}
                className={fieldClass(Boolean(errors.message))}
              />
              <AnimatePresence>
                {errors.message && (
                  <motion.span
                    initial={{ opacity: 0, y: -4, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-1.5 text-[12.5px] font-normal text-danger overflow-hidden"
                  >
                    <AlertIcon width={13} height={13} /> {errors.message}
                  </motion.span>
                )}
              </AnimatePresence>
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
