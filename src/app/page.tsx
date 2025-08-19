import Image from "next/image";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Team from "./components/Team";
import CEOStory from "./components/CEOStory";
import ClientTestimonials from "./components/ClientTestimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SEOHead from "./components/SEOHead";

export default function Home() {
  return (
    <>
      <SEOHead
        title="BytesFlux - Professional Web Development & Digital Solutions in Pakistan"
        description="BytesFlux is Pakistan's premier digital solutions company, specializing in comprehensive web development, mobile app development, graphic design, and SEO services. With over 5 years of experience, we deliver custom digital solutions that drive business growth and digital transformation. Our expert team creates responsive websites, native mobile applications, stunning visual designs, and implements search engine optimization strategies that boost online visibility. We serve businesses of all sizes across Pakistan, offering competitive pricing without compromising on quality. From e-commerce platforms to corporate websites, iOS and Android apps to brand identity design, our services are tailored to meet your specific business needs. Trust BytesFlux to be your digital partner in achieving online success and market leadership."
        keywords="web development Pakistan, mobile app development, graphic design services, SEO services Pakistan, digital solutions, custom websites, e-commerce development, software development, IT services Pakistan"
        canonical="/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "BytesFlux",
          "alternateName": "BytesFlux Digital Solutions",
          "description": "Pakistan's leading web development, mobile app development, graphic design, and SEO services company",
          "url": "https://bytesflux.com",
          "logo": "https://bytesflux.com/logo.png",
          "image": "https://bytesflux.com/logo.png",
          "sameAs": [
            "https://facebook.com/bytesflux",
            "https://twitter.com/bytesflux",
        
            "https://instagram.com/bytesflux"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "availableLanguage": "English",
            "areaServed": "Pakistan",
            "serviceArea": {
              "@type": "Country",
              "name": "Pakistan"
            }
          },
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "Pakistan"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Digital Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Web Development",
                  "description": "Custom website development services"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Mobile App Development",
                  "description": "iOS and Android app development"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Graphic Design",
                  "description": "Professional graphic design services"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "SEO Services",
                  "description": "Search engine optimization services"
                }
              }
            ]
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
          <ClientTestimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
