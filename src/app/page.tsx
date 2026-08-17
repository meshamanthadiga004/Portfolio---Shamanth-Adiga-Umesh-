import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import LiveBackdrop from "@/components/LiveBackdrop";
import Nav from "@/components/Nav";
import Toolkit from "@/components/Toolkit";
import Work from "@/components/Work";

export default function Home() {
  return (
    <>
      {/* Fixed dot grid + gradient wash spanning the whole page. */}
      <LiveBackdrop />

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
