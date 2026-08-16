import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import InteractiveGradient from "@/components/InteractiveGradient";
import Nav from "@/components/Nav";
import Toolkit from "@/components/Toolkit";
import Work from "@/components/Work";

export default function Home() {
  return (
    <>
      {/* Fixed gradient wash spanning the whole page, behind everything. */}
      <InteractiveGradient />

      <div className="above">
        <Nav />
        <main>
          <Hero />
          <About />
          <Work />
          <Experience />
          <Toolkit />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
