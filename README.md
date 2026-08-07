# Marisol Lamas — Portfolio

Portfolio personal construido con **React (Vite), Tailwind CSS y Framer Motion**.

## Correr en desarrollo

```bash
npm install
npm run dev
```

Abre en http://localhost:5173

## Build de producción

```bash
npm run build
```

Genera `dist/`, listo para desplegar en Vercel/Netlify o cualquier hosting estático.

## Estructura

```
src/
  components/   Componentes de cada sección (Navbar, Hero, About, Experience,
                 Projects, Skills, Education, SoftSkills, Languages, Contact, Footer)
                 + set de íconos SVG propios
  data/          Contenido del portfolio: perfil, experiencia, skills, proyectos
  store/         Estado del tema claro/oscuro (Zustand)
  styles/        Sistema de diseño (Tailwind + variables CSS para los temas)
```

## Editar contenido

- **Proyectos**: `src/data/projects.js` — título, descripción, tags, link y captura de cada sitio.
- **Perfil, experiencia, skills, educación, idiomas**: `src/data/profile.js`.

## Contacto

El formulario de contacto abre WhatsApp directo con el mensaje precargado (no depende de ningún backend). El número se configura en `src/data/profile.js` (`whatsapp`).
# portfolio-ML
