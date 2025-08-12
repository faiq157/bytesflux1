"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Code, Palette, Share2, Smartphone, Zap, Search } from 'lucide-react';
import SVGLightning from './SVGLightning';
import Link from 'next/link';

const Services = () => {
  const [showAnimations, setShowAnimations] = useState(false);
  
  useEffect(() => {
    // Delay loading animations for better performance
    const timer = setTimeout(() => {
      setShowAnimations(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Custom web applications, enterprise software, and scalable solutions built with modern technologies and best practices.',
      features: ['Full-Stack Development', 'API Integration', 'Database Design', 'Cloud Deployment'],
      accent: '',
      link: '/web-development'
    },
    {
      icon: Palette,
      title: 'Graphic Design',
      description: 'Stunning visual identities, marketing materials, and digital assets that capture your brand essence and engage your audience.',
      features: ['Brand Identity', 'Marketing Materials', 'UI/UX Design', 'Print & Digital'],
      accent: '',
      link: '/graphic-design'
    },
    {
      icon: Search,
      title: 'SEO Services',
      description: 'Comprehensive search engine optimization services to boost your website visibility and drive organic traffic.',
      features: ['Technical SEO', 'On-Page Optimization', 'Local SEO', 'Content Strategy'],
      accent: '',
      link: '/seo-services'
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications that deliver exceptional user experiences across iOS and Android devices.',
      features: ['iOS & Android', 'Cross-Platform', 'App Store Optimization', 'Maintenance & Support'],
      accent: '',
      link: '/mobile-app-development'
    }
  ];

  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
      {/* Simplified Background Elements */}
      {showAnimations && (
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-3xl"></div>
        </div>
      )}

      {/* Lightning SVG Accents - only show on desktop */}
      {showAnimations && (
        <>
          <SVGLightning className="top-10 right-20 opacity-10 hidden md:block" />
          <SVGLightning className="bottom-10 left-20 opacity-10 transform rotate-45 hidden md:block" />
        </>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Optimized Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="relative w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 p-2 rounded-xl transform hover:scale-110 hover:rotate-3 transition-all duration-300 shadow-lg">
              <Image
                src="/logo.png"
                alt="BytesFlux Logo"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Core Services
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            From concept to deployment, we deliver comprehensive digital solutions that power your business growth
          </p>
        </div>

        {/* Optimized Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Link
                key={index}
                href={service.link}
                className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm hover:shadow-2xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 overflow-hidden cursor-pointer"
              >
                {/* Simplified gradient overlay */}
                {showAnimations && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-teal-600/5 dark:from-blue-600/10 dark:to-teal-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
                
                {/* Icon with simplified effect */}
                <div className="relative bg-gradient-to-r from-blue-600 to-teal-600 p-3 rounded-xl w-fit mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-2xl">
                  <IconComponent className="h-8 w-8 text-white" />
                  {showAnimations && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-teal-700 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  )}
                </div>

                {/* Service accent emoji */}
                {showAnimations && (
                  <div className="absolute top-4 right-4 text-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    {service.accent}
                  </div>
                )}

                {/* Title */}
                <h3 className="relative text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="relative text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="relative space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300 relative">
                        {showAnimations && (
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full animate-ping opacity-0 group-hover:opacity-75"></div>
                        )}
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Lightning bolt accent */}
                {showAnimations && (
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-40 transition-opacity duration-300">
                    <Zap className="h-5 w-5 text-blue-500" />
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Optimized CTA Section */}
        <div className="text-center mt-16">
          <div className="relative bg-gradient-to-r from-blue-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden">
            {showAnimations && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-teal-600/10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            )}
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Power Up Your Business?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Let's discuss how BytesFlux can transform your digital presence and accelerate your growth
              </p>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="relative bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Get Started Today</span>
                  <Zap className="h-4 w-4 group-hover:animate-pulse" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;