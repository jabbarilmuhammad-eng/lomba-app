import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";
import Backendtest from "@/components/Backendtest";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Timeline />
        <Backendtest />
      </main>

      <Footer />
    </>
  );
}