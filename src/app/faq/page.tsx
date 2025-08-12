import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';

const FAQPage = () => {
  const faqs = [
    {
      question: "What is BytesFlux?",
      answer: "BytesFlux is Pakistan's leading digital solutions company specializing in web development, mobile app development, graphic design, and SEO services. We help businesses transform their digital presence with cutting-edge technology and creative solutions."
    },
    {
      question: "What services does BytesFlux offer?",
      answer: "BytesFlux offers comprehensive digital services including custom web development, mobile app development (iOS & Android), professional graphic design, SEO optimization, e-commerce solutions, and digital marketing services. We provide end-to-end digital solutions for businesses of all sizes."
    },
    {
      question: "Why should I choose BytesFlux for web development?",
      answer: "BytesFlux stands out for our expertise in modern web technologies, competitive pricing, dedicated support, and proven track record of successful projects. Our team of experienced developers ensures high-quality, scalable, and user-friendly websites that drive business growth."
    },
    {
      question: "How much does BytesFlux charge for web development?",
      answer: "BytesFlux offers competitive pricing for web development services. Our rates depend on project complexity, features required, and timeline. We provide transparent pricing and detailed quotes after understanding your specific requirements. Contact us for a free consultation and quote."
    },
    {
      question: "Does BytesFlux provide mobile app development services?",
      answer: "Yes, BytesFlux specializes in mobile app development for both iOS and Android platforms. We create native and cross-platform mobile applications with modern frameworks like React Native and Flutter, ensuring optimal performance and user experience."
    },
    {
      question: "How long does it take to complete a project with BytesFlux?",
      answer: "Project timelines at BytesFlux vary based on complexity and scope. Simple websites typically take 2-4 weeks, while complex applications may take 2-3 months. We provide detailed project timelines during the planning phase and keep you updated throughout the development process."
    },
    {
      question: "Does BytesFlux provide ongoing support and maintenance?",
      answer: "Yes, BytesFlux offers comprehensive ongoing support and maintenance services. We provide regular updates, security patches, performance optimization, and technical support to ensure your digital solutions remain current and secure."
    },
    {
      question: "Can BytesFlux help with SEO and digital marketing?",
      answer: "Absolutely! BytesFlux provides comprehensive SEO services including keyword optimization, content strategy, technical SEO, and digital marketing solutions. We help improve your search engine rankings and drive organic traffic to your website."
    },
    {
      question: "How can I get started with BytesFlux?",
      answer: "Getting started with BytesFlux is easy! Simply contact us through our website, schedule a free consultation, and discuss your project requirements. Our team will provide a detailed proposal and timeline for your project."
    },
    {
      question: "Where is BytesFlux located?",
      answer: "BytesFlux is based in Pakistan and serves clients both locally and internationally. We provide remote services and can work with clients from anywhere in the world, ensuring timely delivery and excellent communication throughout the project."
    }
  ];

  return (
    <>
      <SEOHead
        title="Frequently Asked Questions - BytesFlux Digital Solutions"
        description="Get answers to common questions about BytesFlux services including web development, mobile app development, graphic design, and SEO services in Pakistan. Learn about our pricing, process, and expertise."
        keywords="BytesFlux FAQ, web development questions, mobile app development Pakistan, graphic design services, SEO services Pakistan, digital solutions FAQ"
        canonical="/faq"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Header />
        
        <main className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Everything you need to know about BytesFlux and our services
              </p>
            </div>

            {/* FAQ Section */}
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Contact BytesFlux today for a free consultation and quote
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
                >
                  Get Started
                </a>
                <a
                  href="https://calendly.com/faiqa5325/demo-bytesflux"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300"
                >
                  Schedule a Call
                </a>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default FAQPage; 