import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Toolkit from "@/components/Toolkit";
import Work from "@/components/Work";

export default function Home() {
  return (
    <>
      <Nav />
      {/* Mobile clears the fixed top bar; the desktop rail overlays the left
          margin, so the content column stays centred on the page itself. */}
      <main className="pt-14 lg:pt-0">
        <Hero />
        <About />
        <Work />
        <Experience />
        <Toolkit />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
