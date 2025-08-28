"use client";
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';
import emailjs from 'emailjs-com';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+92 3275734699',
      description: 'Call us for immediate assistance'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'hello@bytesflux.com',
      description: 'Send us a detailed message'
    },
    {
      icon: MapPin,
      title: 'Location',
      details: 'Islamabad, Pakistan',
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Prepare email template parameters
      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        phone: formData.phone,
        service: formData.service,
        budget: formData.budget,
        message: formData.message,
        to_name: 'BytesFlux Team',
        reply_to: formData.email
      };

      // Send email using EmailJS
      const result = await emailjs.send(
        'service_floz7dm', // Your EmailJS service ID
        'template_y9gnb25', // Your EmailJS template ID
        templateParams,
        'mtUUp7XG7Hie8btGe' // Your EmailJS public key
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you for your message! We\'ll get back to you within 24 hours.');
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          service: '',
          budget: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Email submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage('Sorry, there was an error sending your message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitStatus('idle');
    setSubmitMessage('');
  };

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
            "telephone": "+92 3275734699",
            "email": "hello@bytesflux.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Islamabad",
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

                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <p className="text-green-800 dark:text-green-200">{submitMessage}</p>
                    </div>
                    <button
                      onClick={resetForm}
                      className="mt-2 text-sm text-green-600 dark:text-green-400 hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
                      <p className="text-red-800 dark:text-red-200">{submitMessage}</p>
                    </div>
                    <button
                      onClick={resetForm}
                      className="mt-2 text-sm text-red-600 dark:text-red-400 hover:underline"
                    >
                      Try again
                    </button>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        value={formData.firstName}
                        onChange={handleInputChange}
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
                        value={formData.lastName}
                        onChange={handleInputChange}
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
                      value={formData.email}
                      onChange={handleInputChange}
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
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="+92 3275734699"
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
                      value={formData.service}
                      onChange={handleInputChange}
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
                      value={formData.budget}
                      onChange={handleInputChange}
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
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Tell us about your project, requirements, timeline, and any specific features you need..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center ${
                      isSubmitting
                        ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700'
                    } text-white`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
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