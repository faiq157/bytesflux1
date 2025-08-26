"use client";
import React from 'react';
import { Check, Star, Zap, Code, Palette, Smartphone, Search, Crown } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PricingPage = () => {
  const webDevelopmentPackages = [
    {
      name: 'Basic Website',
      price: 'PKR 25,000',
      duration: '2-3 weeks',
      description: 'Perfect for small businesses and startups looking to establish their online presence.',
      features: [
        'Responsive Design',
        'Up to 5 Pages',
        'Contact Form',
        'Basic SEO Setup',
        'Mobile Optimized',
        '1 Month Support'
      ],
      icon: Code,
      popular: false
    },
    {
      name: 'Business Website',
      price: 'PKR 50,000',
      duration: '3-4 weeks',
      description: 'Comprehensive website solution for growing businesses with advanced features.',
      features: [
        'Responsive Design',
        'Up to 10 Pages',
        'Contact Forms',
        'Advanced SEO Setup',
        'Blog Integration',
        'Social Media Integration',
        'Analytics Setup',
        '3 Months Support'
      ],
      icon: Code,
      popular: true
    },
    {
      name: 'E-commerce Website',
      price: 'PKR 100,000',
      duration: '4-6 weeks',
      description: 'Full-featured online store with payment integration and inventory management.',
      features: [
        'Responsive Design',
        'Unlimited Pages',
        'Product Catalog',
        'Payment Gateway',
        'Inventory Management',
        'Order Management',
        'Advanced SEO',
        '6 Months Support'
      ],
      icon: Code,
      popular: false
    }
  ];

  const mobileAppPackages = [
    {
      name: 'Basic App',
      price: 'PKR 75,000',
      duration: '6-8 weeks',
      description: 'Simple mobile application with core functionality for iOS and Android.',
      features: [
        'Cross-platform (iOS & Android)',
        'Basic UI/UX Design',
        'User Authentication',
        'Basic Features',
        'App Store Submission',
        '3 Months Support'
      ],
      icon: Smartphone,
      popular: false
    },
    {
      name: 'Advanced App',
      price: 'PKR 150,000',
      duration: '8-12 weeks',
      description: 'Feature-rich mobile application with advanced functionality and integrations.',
      features: [
        'Cross-platform (iOS & Android)',
        'Advanced UI/UX Design',
        'User Authentication',
        'Push Notifications',
        'API Integration',
        'Analytics Dashboard',
        'App Store Optimization',
        '6 Months Support'
      ],
      icon: Smartphone,
      popular: true
    }
  ];

  const graphicDesignPackages = [
    {
      name: 'Logo Package',
      price: 'PKR 15,000',
      duration: '1 week',
      description: 'Professional logo design with multiple variations and file formats.',
      features: [
        '3 Logo Concepts',
        'Unlimited Revisions',
        'Multiple File Formats',
        'Logo Guidelines',
        'Source Files',
        '1 Month Support'
      ],
      icon: Palette,
      popular: false
    },
    {
      name: 'Brand Identity',
      price: 'PKR 35,000',
      duration: '2-3 weeks',
      description: 'Complete brand identity package including logo, business cards, and marketing materials.',
      features: [
        'Logo Design',
        'Business Cards',
        'Letterhead Design',
        'Social Media Templates',
        'Brand Guidelines',
        'Source Files',
        '3 Months Support'
      ],
      icon: Palette,
      popular: true
    }
  ];

  const seoPackages = [
    {
      name: 'Basic SEO',
      price: 'PKR 20,000',
      duration: 'Monthly',
      description: 'Essential SEO services to improve your website visibility and rankings.',
      features: [
        'Keyword Research',
        'On-page Optimization',
        'Technical SEO Audit',
        'Monthly Reports',
        'Basic Content Optimization',
        'Google Analytics Setup'
      ],
      icon: Search,
      popular: false
    },
    {
      name: 'Advanced SEO',
      price: 'PKR 40,000',
      duration: 'Monthly',
      description: 'Comprehensive SEO strategy with content marketing and link building.',
      features: [
        'Keyword Research',
        'On-page Optimization',
        'Technical SEO Audit',
        'Content Strategy',
        'Link Building',
        'Monthly Reports',
        'Competitor Analysis',
        'Performance Monitoring'
      ],
      icon: Search,
      popular: true
    }
  ];

  const renderPackage = (pkg: any, index: number) => {
    const IconComponent = pkg.icon;
    return (
      <div
        key={index}
        className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border-2 ${
          pkg.popular 
            ? 'border-blue-500 dark:border-blue-400' 
            : 'border-gray-100 dark:border-gray-700'
        }`}
      >
        {pkg.popular && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
              <Star className="h-4 w-4 mr-2" />
              Most Popular
            </div>
          </div>
        )}

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-3 rounded-xl">
                <IconComponent className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {pkg.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {pkg.description}
            </p>
          </div>

          {/* Price */}
          <div className="text-center mb-8">
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {pkg.price}
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              {pkg.duration}
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4 mb-8">
            {pkg.features.map((feature: string, featureIndex: number) => (
              <div key={featureIndex} className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
              pkg.popular
                ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:from-blue-700 hover:to-teal-700'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Get Started
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <SEOHead
        title="Pricing & Packages - BytesFlux Digital Services | Competitive Rates Pakistan"
        description="Explore BytesFlux's transparent pricing structure for professional digital services in Pakistan. Our competitive packages include web development starting from PKR 25,000, mobile app development from PKR 75,000, graphic design from PKR 15,000, and SEO services from PKR 20,000 monthly. Each package is designed to meet different business needs and budgets, with clear deliverables, timelines, and support periods. We offer flexible solutions for startups, growing businesses, and enterprise clients, ensuring quality digital solutions at affordable rates. Get detailed quotes and start your digital transformation journey with BytesFlux today."
        keywords="BytesFlux pricing, web development cost Pakistan, mobile app development price, graphic design packages, SEO services cost, digital services pricing"
        canonical="/pricing"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Service Packages",
          "description": "Pricing packages for digital services",
          "itemListElement": [
            ...webDevelopmentPackages,
            ...mobileAppPackages,
            ...graphicDesignPackages,
            ...seoPackages
          ].map((pkg, index) => ({
            "@type": "Service",
            "position": index + 1,
            "name": pkg.name,
            "description": pkg.description,
            "offers": {
              "@type": "Offer",
              "price": pkg.price,
              "priceCurrency": "PKR"
            }
          }))
        }}
      />
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header />
        
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-3 rounded-xl transform hover:scale-110 hover:rotate-3 transition-all duration-300 shadow-lg">
                  <Crown className="h-8 w-8 text-white animate-pulse" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Pricing & Packages
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Transparent pricing for professional digital services. Choose the package that best fits 
                your business needs and budget.
              </p>
            </div>
          </div>
        </section>

        {/* Web Development Packages */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Web Development Packages
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Professional website solutions for businesses of all sizes
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {webDevelopmentPackages.map((pkg, index) => renderPackage(pkg, index))}
            </div>
          </div>
        </section>

        {/* Mobile App Development Packages */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Mobile App Development
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Cross-platform mobile applications for iOS and Android
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {mobileAppPackages.map((pkg, index) => renderPackage(pkg, index))}
            </div>
          </div>
        </section>

        {/* Graphic Design Packages */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Graphic Design Services
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Creative design solutions for your brand identity
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {graphicDesignPackages.map((pkg, index) => renderPackage(pkg, index))}
            </div>
          </div>
        </section>

        {/* SEO Packages */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                SEO Services
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Search engine optimization to improve your online visibility
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {seoPackages.map((pkg, index) => renderPackage(pkg, index))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Why Choose BytesFlux?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                We provide exceptional value for your investment
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: 'Competitive Pricing',
                  description: 'Best-in-class services at Pakistan market rates, ensuring affordability without compromising quality.'
                },
                {
                  icon: Crown,
                  title: 'Quality Guaranteed',
                  description: 'Every project undergoes rigorous testing and quality checks to meet international standards.'
                },
                {
                  icon: Star,
                  title: 'Ongoing Support',
                  description: 'Comprehensive support and maintenance packages to keep your digital solutions running smoothly.'
                }
              ].map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="text-center group">
                    <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
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
              Contact us for a free consultation and detailed quote for your project
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Get Free Quote
              </a>
              <a
                href="/services"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                View Our Services
              </a>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
};

export default PricingPage; 