import Image from "next/image";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Team from "./components/Team";
import CEOStory from "./components/CEOStory";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SEOHead from "./components/SEOHead";

export default function Home() {
  return (
    <>
      <SEOHead
        title="BytesFlux - Professional Web Development & Digital Solutions in Pakistan"
        description="Leading web development, mobile app development, graphic design, and SEO services in Pakistan. Custom digital solutions that drive business growth. Get expert development at competitive prices."
        keywords="web development Pakistan, mobile app development, graphic design services, SEO services Pakistan, digital solutions, custom websites, e-commerce development, software development, IT services Pakistan"
        canonical="/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "BytesFlux",
          "description": "Professional web development, mobile app development, graphic design, and SEO services in Pakistan",
          "url": "https://bytesflux.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://bytesflux.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }}
      />
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
    </>
  );
}
