import React from 'react';
import { Code, Database, Globe, Shield, Zap, CheckCircle } from 'lucide-react';
import SEOHead from '@/app/components/SEOHead';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
const WebDevelopment = () => {
  const features = [
    'Custom Web Applications',
    'E-commerce Solutions',
    'Content Management Systems',
    'API Development & Integration',
    'Database Design & Optimization',
    'Cloud Deployment & Hosting',
    'Progressive Web Apps (PWA)',
    'Performance Optimization',
    'Security Implementation',
    'SEO-Friendly Development'
  ];

  const technologies = [
    'React.js & Next.js',
    'Node.js & Express',
    'Python & Django',
    'PHP & Laravel',
    'MongoDB & PostgreSQL',
    'AWS & Azure',
    'Docker & Kubernetes',
    'GraphQL & REST APIs'
  ];

  return (
    <>
      <SEOHead
        title="Web Development in Pakistan - Custom Websites & Web Applications | Bytesflux"
        description="Transform your business with BytesFlux's professional web development services in Pakistan. Our expert team specializes in creating custom websites, responsive web applications, and comprehensive e-commerce solutions that drive business growth and user engagement. We leverage cutting-edge technologies including React, Next.js, Node.js, and modern CSS frameworks to build scalable, high-performance web solutions tailored to your specific business requirements. From corporate websites and portfolio sites to complex web applications and online stores, our development process ensures seamless user experiences across all devices. We implement SEO best practices, optimize for performance and security, and provide ongoing maintenance support. Get expert web development at competitive Pakistani prices without compromising on quality, innovation, or customer satisfaction."
        keywords="web development Pakistan, custom websites, web applications, e-commerce development"
        canonical="https://bytesflux.com/web-development"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Web Development",
          "description": "Custom web applications and websites",
          "provider": {
            "@type": "Organization",
            "name": "Bytesflux"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Pakistan"
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
              Web Development in Pakistan
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Transform your business with cutting-edge web solutions. Our expert team delivers scalable, 
              high-performance websites and web applications that drive growth and success.
            </p>
         
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <Globe className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Custom Websites</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Professional, responsive websites tailored to your brand and business requirements.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <Code className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Web Applications</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Scalable web applications built with modern technologies and best practices.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <Database className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">E-commerce Solutions</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Complete online store solutions with payment integration and inventory management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Bytesflux for Web Development in Pakistan?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We combine technical expertise with creative innovation to deliver web solutions that exceed expectations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Quick turnaround times without compromising quality
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Industry-standard security practices and reliable hosting
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Code className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Modern Tech Stack</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Latest technologies for optimal performance and scalability
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Ongoing Support</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Continuous maintenance and support after launch
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Technologies We Use
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We leverage cutting-edge technologies to build robust and scalable web solutions
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-gray-900 dark:text-white">{tech}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive Web Development Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              From concept to deployment, we handle every aspect of your web development project
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                What We Deliver
              </h3>
              <div className="space-y-4">
                {features.slice(0, 5).map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                Additional Services
              </h3>
              <div className="space-y-4">
                {features.slice(5).map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss your web development project and create something amazing together.
          </p>
        
        </div>
      </section>
        <Footer />
      </div>
    </>
  );
};

export default WebDevelopment; 