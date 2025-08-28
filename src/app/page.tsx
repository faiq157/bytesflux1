import Image from "next/image";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "BytesFlux - Professional Web Development & Digital Solutions in Pakistan",
  description: "BytesFlux delivers cutting-edge software development, stunning graphic design, and strategic social media management. We transform your ideas into powerful digital solutions.",
  keywords: "web development Pakistan, mobile app development, graphic design services, SEO services Pakistan, digital solutions, custom websites, e-commerce development, software development, IT services Pakistan",
  openGraph: {
    title: "BytesFlux - Professional Web Development & Digital Solutions in Pakistan",
    description: "BytesFlux delivers cutting-edge software development, stunning graphic design, and strategic social media management. We transform your ideas into powerful digital solutions.",
    url: "https://bytesflux.com",
    siteName: "BytesFlux",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "BytesFlux Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BytesFlux - Professional Web Development & Digital Solutions in Pakistan",
    description: "BytesFlux delivers cutting-edge software development, stunning graphic design, and strategic social media management. We transform your ideas into powerful digital solutions.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://bytesflux.com",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen transition-colors duration-300">
      <Header />
      <main>
        <Hero />
        <Services />
      </main>
      <Footer />
    </div>
  );
}
