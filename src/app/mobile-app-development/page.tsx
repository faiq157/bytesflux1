import React from 'react';
import { Smartphone, Zap, Shield, Users, TrendingUp, CheckCircle, Code, Database } from 'lucide-react';
import SEOHead from '@/app/components/SEOHead';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
const MobileAppDevelopment = () => {
  const features = [
    'Native iOS & Android Development',
    'Cross-Platform Solutions (React Native, Flutter)',
    'UI/UX Design & Prototyping',
    'App Store Optimization (ASO)',
    'Backend API Development',
    'Push Notification Integration',
    'Payment Gateway Integration',
    'Analytics & Performance Monitoring',
    'App Maintenance & Updates',
    'Cloud Infrastructure Setup'
  ];

  const startupBenefits = [
    'Cost-effective development solutions',
    'Rapid prototyping and MVP development',
    'Scalable architecture for growth',
    'Expert guidance for startup success',
    'Post-launch support and maintenance',
    'Marketing and ASO optimization'
  ];

  const platforms = [
    'iOS Development (Swift, Objective-C)',
    'Android Development (Kotlin, Java)',
    'React Native (Cross-platform)',
    'Flutter (Cross-platform)',
    'Xamarin (Cross-platform)',
    'Progressive Web Apps (PWA)'
  ];

  return (
    <>
      <SEOHead
        title="Mobile App Development for Startups - iOS & Android Apps | Bytesflux"
        description="Transform your startup vision into reality with BytesFlux's expert mobile app development services in Pakistan. Our specialized team delivers native iOS and Android applications, cross-platform solutions using React Native and Flutter, and rapid MVP development to accelerate your time-to-market. We understand the unique challenges startups face and provide cost-effective, scalable mobile solutions that drive user engagement and business growth. From concept validation and user experience design to backend development and app store optimization, our comprehensive approach ensures your mobile application stands out in the competitive marketplace. We leverage modern development frameworks, implement best practices for performance and security, and provide ongoing support to help your startup scale successfully in the digital landscape."
        keywords="mobile app development for startups, iOS app development, Android app development, cross-platform development"
        canonical="https://bytesflux.com/mobile-app-development"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Mobile App Development",
          "description": "iOS and Android mobile applications",
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
      <section className="relative py-20 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Mobile App Development for Startups
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Turn your startup vision into reality with our expert mobile app development services. 
              We specialize in creating innovative, scalable mobile solutions that drive business growth.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
            
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <Smartphone className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Native App Development</h3>
              <p className="text-gray-600 dark:text-gray-300">
                High-performance native apps for iOS and Android with platform-specific optimizations.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <Code className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Cross-Platform Development</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Cost-effective solutions using React Native and Flutter for multiple platforms.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <Database className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Backend Development</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Robust backend APIs and cloud infrastructure to support your mobile applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us for Startups */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Startups Choose Bytesflux for Mobile App Development?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We understand the unique challenges startups face and provide tailored solutions for rapid growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Rapid MVP Development</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Quick turnaround times to get your app to market faster
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Scalable Architecture</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Built to grow with your business and user base
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Cost-Effective Solutions</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Optimized development processes to reduce costs
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Guidance</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Strategic advice to maximize your app's success
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Post-Launch Support</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ongoing maintenance and feature updates
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Smartphone className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">ASO Optimization</h3>
              <p className="text-gray-600 dark:text-gray-300">
                App Store optimization for better visibility
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Mobile App Development Process
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              A proven methodology that ensures successful app delivery for startups
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-purple-600 text-white rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Discovery & Planning</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Understanding your requirements and creating a detailed roadmap
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 text-white rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Design & Prototyping</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Creating intuitive UI/UX designs and interactive prototypes
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 text-white rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Development & Testing</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Building your app with rigorous testing at every stage
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 text-white rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center font-bold text-lg">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2">Deployment & Launch</h3>
              <p className="text-gray-600 dark:text-gray-300">
                App store submission and successful market launch
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Mobile Development Technologies
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We use cutting-edge technologies to build high-performance mobile applications
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map((platform, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-gray-900 dark:text-white">{platform}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive Mobile App Development Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              From concept to app store, we handle every aspect of mobile app development
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                Core Development Services
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

      {/* Startup Benefits */}
      <section className="py-20 bg-purple-50 dark:bg-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Startups Love Working With Us
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We're not just developers - we're your partners in startup success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {startupBenefits.map((benefit, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Your Startup's Mobile App?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Let's turn your startup vision into a successful mobile application that drives growth.
          </p>
       
        </div>
      </section>
        <Footer />
      </div>
    </>
  );
};

export default MobileAppDevelopment; 