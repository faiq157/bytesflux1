import Image from "next/image";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Team from "./components/Team";
import CEOStory from "./components/CEOStory";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
     <div className="min-h-screen transition-colors duration-300">
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Team />
        <CEOStory />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
