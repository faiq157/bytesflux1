import React from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ContactPage = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+92 300 1234567',
      description: 'Call us for immediate assistance'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'info@bytesflux.com',
      description: 'Send us a detailed message'
    },
    {
      icon: MapPin,
      title: 'Location',
      details: 'Karachi, Pakistan',
      description: 'Serving clients worldwide'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon - Fri: 9AM - 6PM',
      description: 'Available for urgent projects 24/7'
    }
  ];

  const services = [
    'Web Development',
    'Mobile App Development',
    'Graphic Design',
    'SEO Services',
    'Digital Marketing',
    'Consultation'
  ];

  return (
    <>
      <SEOHead
        title="Contact Us - Get Free Quote for Web Development & Digital Services | BytesFlux"
        description="Ready to transform your business with professional digital solutions? Contact BytesFlux today for expert web development, mobile app development, graphic design, and SEO services in Pakistan. Our dedicated team is here to provide free consultation, detailed project quotes, and personalized recommendations for your digital transformation journey. Whether you need a new website, mobile application, brand redesign, or search engine optimization, we offer comprehensive support from initial concept to final deployment. Reach out through our convenient contact form, direct phone calls, or email communication, and we'll respond within 24 hours. Our experienced consultants will discuss your project requirements, budget considerations, and timeline expectations to ensure we deliver solutions that exceed your expectations and drive measurable business results."
        keywords="contact BytesFlux, web development quote, mobile app development Pakistan, graphic design services, SEO consultation, digital services contact"
        canonical="/contact"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact BytesFlux",
          "description": "Contact us for web development, mobile app development, graphic design, and SEO services",
          "url": "https://bytesflux.com/contact",
          "mainEntity": {
            "@type": "Organization",
            "name": "BytesFlux",
            "telephone": "+92 300 1234567",
            "email": "info@bytesflux.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Karachi",
              "addressCountry": "Pakistan"
            }
          }
        }}
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Get In Touch
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Ready to start your digital transformation journey? Let's discuss your project 
                and create something amazing together. We're here to help bring your vision to life.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {info.title}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                      {info.details}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {info.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form and Services */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Fill out the form below and we'll get back to you within 24 hours. 
                  For urgent projects, feel free to call us directly.
                </p>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="+92 300 1234567"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Service Interested In *
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select a service</option>
                      <option value="web-development">Web Development</option>
                      <option value="mobile-app-development">Mobile App Development</option>
                      <option value="graphic-design">Graphic Design</option>
                      <option value="seo-services">SEO Services</option>
                      <option value="digital-marketing">Digital Marketing</option>
                      <option value="consultation">Consultation</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Project Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-50k">Under PKR 50,000</option>
                      <option value="50k-100k">PKR 50,000 - 100,000</option>
                      <option value="100k-250k">PKR 100,000 - 250,000</option>
                      <option value="250k-500k">PKR 250,000 - 500,000</option>
                      <option value="over-500k">Over PKR 500,000</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Tell us about your project, requirements, timeline, and any specific features you need..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-200 flex items-center justify-center"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </button>
                </form>
              </div>
              
              {/* Services and Info */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Services
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  We offer comprehensive digital solutions to help your business grow and succeed in the digital world.
                </p>
                
                <div className="space-y-4 mb-8">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">{service}</span>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-8 rounded-2xl text-white">
                  <h3 className="text-2xl font-bold mb-4">Why Choose BytesFlux?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <MessageCircle className="h-5 w-5 mr-3 text-blue-200" />
                      Free consultation and project planning
                    </li>
                    <li className="flex items-center">
                      <MessageCircle className="h-5 w-5 mr-3 text-blue-200" />
                      Competitive pricing for Pakistan market
                    </li>
                    <li className="flex items-center">
                      <MessageCircle className="h-5 w-5 mr-3 text-blue-200" />
                      Fast delivery without compromising quality
                    </li>
                    <li className="flex items-center">
                      <MessageCircle className="h-5 w-5 mr-3 text-blue-200" />
                      Ongoing support and maintenance
                    </li>
                    <li className="flex items-center">
                      <MessageCircle className="h-5 w-5 mr-3 text-blue-200" />
                      SEO-friendly development practices
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Common questions about our services and process
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  How long does a typical project take?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Project timelines vary based on complexity. Simple websites take 2-4 weeks, 
                  while complex applications can take 2-3 months. We'll provide a detailed timeline during consultation.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  What is your pricing structure?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We offer competitive pricing tailored to Pakistan market. Pricing depends on project scope, 
                  features, and timeline. Contact us for a detailed quote.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Do you provide ongoing support?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Yes, we offer ongoing support and maintenance packages. We also provide training 
                  for your team to manage the solution effectively.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
};

export default ContactPage; 