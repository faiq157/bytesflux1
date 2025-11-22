"use client";
import React from 'react';
import Image from 'next/image';
import { Zap, Github, Twitter, Instagram, Mail } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  const socialLinks = [
  
    { icon: Instagram, href: 'https://www.instagram.com/bytesflux', label: 'Instagram' },
    { icon: Mail, href: 'mailto:hello@bytesflux.com', label: 'Email' }
  ];

  const quickLinks = [
    { name: 'Home', href: '/', isInternal: true },
    { name: 'Services', href: '/services', isInternal: true },
    { name: 'About', href: '/about', isInternal: true },
    { name: 'Privacy Policy', href: '/privacy-policy', isInternal: true },
    { name: 'Terms of Service', href: '/terms', isInternal: true },
    { name: 'Contact', href: '#contact', isInternal: false }
  ];

  const services = [
    { name: 'Software Development', href: '/web-development' },
    { name: 'Graphic Design', href: '/graphic-design' },
    { name: 'Social Media Management', href: '/seo-services' },
    { name: 'Mobile App Development', href: '/mobile-app-development' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 dark:bg-black text-white transition-colors duration-300 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-60 h-60 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 transform hover:translate-y-1 transition-transform duration-300">
            <Link href="/" className="flex items-center space-x-2 mb-6 group">
              <div className="relative w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-600 p-1 rounded-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                <Image
                  src="/logo.png"
                  alt="BytesFlux Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-2xl font-bold group-hover:text-blue-400 transition-colors duration-300">BytesFlux</span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed transform hover:translate-x-1 transition-transform duration-300">
              Empowering businesses through innovative software development, stunning graphic design, 
              and strategic social media management. Your digital transformation partner.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="bg-gray-800 dark:bg-gray-900 p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-600 transition-all duration-300 transform hover:-translate-y-2 hover:scale-110 hover:rotate-3 shadow-lg hover:shadow-2xl"
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="transform hover:translate-y-1 transition-transform duration-300">
            <h3 className="text-lg font-semibold mb-6 hover:text-blue-400 transition-colors duration-300">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  {link.isInternal ? (
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white hover:translate-x-1 transform transition-all duration-200 block"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-300 hover:text-white hover:translate-x-1 transform transition-all duration-200 block"
                    >
                      {link.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="transform hover:translate-y-1 transition-transform duration-300">
            <h3 className="text-lg font-semibold mb-6 hover:text-blue-400 transition-colors duration-300">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="text-gray-300 hover:text-white hover:translate-x-1 transform transition-all duration-200 block cursor-pointer"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 dark:border-gray-700 mt-12 pt-12">
          <div className="max-w-md mx-auto text-center transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold mb-4 hover:text-blue-400 transition-colors duration-300">Stay Connected</h3>
            <p className="text-gray-300 mb-6">
              Get the latest updates on our services and industry insights
            </p>
            <div className="flex group">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 dark:bg-gray-900 border border-gray-700 dark:border-gray-600 rounded-l-lg focus:outline-none focus:border-blue-500 text-white transition-all duration-300 focus:scale-105"
              />
              <button className="bg-gradient-to-r from-blue-600 to-teal-600 px-6 py-3 rounded-r-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 group-hover:from-blue-700 group-hover:to-teal-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 dark:border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400 hover:text-gray-300 transition-colors duration-300">
            © {new Date().getFullYear()} BytesFlux. All rights reserved. 
            Crafting digital excellence, one project at a time.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
