import { useEffect } from "react";
import { useThemeStore } from "./store/themeStore.js";
import ScrollProgress from "./components/ScrollProgress.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import Education from "./components/Education.jsx";
import SoftSkills from "./components/SoftSkills.jsx";
import Languages from "./components/Languages.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";

export default function App() {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <SoftSkills />
        <Languages />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
