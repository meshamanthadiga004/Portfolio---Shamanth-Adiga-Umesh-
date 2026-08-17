import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Dock from "@/components/Dock";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LiveBackdrop from "@/components/LiveBackdrop";
import Nav from "@/components/Nav";
import SoundSystem from "@/components/SoundSystem";
import Toolkit from "@/components/Toolkit";
import Work from "@/components/Work";
import { theme } from "@/content/theme";

export default function Home() {
  const s = theme.sections;

  return (
    <>
      {/* Fixed stencil-icon field + gradient wash spanning the whole page. */}
      <LiveBackdrop />
      <SoundSystem />

      <div className="above">
        <Nav />
        {/* Each section is switched on or off in theme.ts -> sections. */}
        <main>
          <Hero />
          {s.about && <About />}
          {s.work && <Work />}
          {s.experience && <Experience />}
          {s.toolkit && <Toolkit />}
          {s.contact && <Contact />}
        </main>
        <Footer />
        <Dock />
      </div>
    </>
  );
}
