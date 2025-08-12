import React from 'react';
import Link from 'next/link';
import { Code, Palette, Search, Smartphone, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ServicesPage = () => {
  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Custom web applications, enterprise software, and scalable solutions built with modern technologies.',
      features: ['Full-Stack Development', 'E-commerce Solutions', 'API Integration', 'Cloud Deployment'],
      link: '/web-development',
      priority: 'High'
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android with exceptional user experiences.',
      features: ['iOS & Android Apps', 'Cross-Platform Development', 'App Store Optimization', 'Maintenance & Support'],
      link: '/mobile-app-development',
      priority: 'High'
    },
    {
      icon: Palette,
      title: 'Graphic Design',
      description: 'Stunning visual identities, marketing materials, and digital assets that capture your brand essence.',
      features: ['Brand Identity', 'Marketing Materials', 'UI/UX Design', 'Print & Digital Assets'],
      link: '/graphic-design',
      priority: 'Medium'
    },
    {
      icon: Search,
      title: 'SEO Services',
      description: 'Comprehensive search engine optimization to boost your website visibility and drive organic traffic.',
      features: ['Technical SEO', 'On-Page Optimization', 'Local SEO', 'Content Strategy'],
      link: '/seo-services',
      priority: 'Medium'
    }
  ];

  const whyChooseUs = [
    'Expert team with 5+ years experience',
    'Competitive pricing for Pakistan market',
    'Fast delivery without compromising quality',
    'Ongoing support and maintenance',
    'Modern technology stack',
    'SEO-friendly development practices'
  ];

  return (
    <>
      <SEOHead
        title="Our Services - Web Development, Mobile Apps, Graphic Design & SEO | BytesFlux"
        description="Comprehensive digital services including web development, mobile app development, graphic design, and SEO services in Pakistan. Expert solutions for your business growth."
        keywords="web development services, mobile app development, graphic design services, SEO services, digital solutions Pakistan, IT services, software development"
        canonical="/services"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Digital Services",
          "description": "Comprehensive digital services including web development, mobile app development, graphic design, and SEO",
          "itemListElement": services.map((service, index) => ({
            "@type": "Service",
            "position": index + 1,
            "name": service.title,
            "description": service.description,
            "url": `https://bytesflux.com${service.link}`
          }))
        }}
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Our Digital Services
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Comprehensive digital solutions to transform your business. From web development to mobile apps, 
                graphic design to SEO - we've got you covered with expert services at competitive prices.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium">
                  Web Development
                </span>
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-full text-sm font-medium">
                  Mobile Apps
                </span>
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-4 py-2 rounded-full text-sm font-medium">
                  Graphic Design
                </span>
                <span className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-4 py-2 rounded-full text-sm font-medium">
                  SEO Services
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                What We Offer
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Professional digital services tailored to your business needs and budget
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-start justify-between mb-6">
                      <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-3 rounded-xl">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        service.priority === 'High' 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {service.priority} Priority
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Link 
                      href={service.link}
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold group"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Why Choose BytesFlux?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                We combine technical expertise with creative innovation to deliver solutions that exceed expectations
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChooseUs.map((reason, index) => (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Zap className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    {reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss your project requirements and create something amazing together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Get Free Quote
              </Link>
              <Link
                href="/about"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
};

export default ServicesPage; 