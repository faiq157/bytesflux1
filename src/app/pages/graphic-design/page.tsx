import React from 'react';
import { Palette, Brush, Camera, PenTool, CheckCircle, Zap, Shield, Users } from 'lucide-react';
import SEOHead from '@/app/components/SEOHead';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const page = () => {
  const services = [
    'Logo Design & Brand Identity',
    'Business Cards & Stationery',
    'Marketing Materials & Brochures',
    'Social Media Graphics',
    'Website Graphics & UI Design',
    'Print & Digital Advertising',
    'Packaging Design',
    'Illustrations & Icons',
    'Photo Editing & Retouching',
    'Infographics & Presentations'
  ];

  const affordableFeatures = [
    'Competitive pricing for all design services',
    'Flexible packages for different budgets',
    'Quick turnaround times',
    'Unlimited revisions included',
    'High-quality deliverables',
    'Professional design standards'
  ];

  const designProcess = [
    'Discovery & Briefing',
    'Concept Development',
    'Design Creation',
    'Client Feedback',
    'Revisions & Refinement',
    'Final Delivery'
  ];

  const tools = [
    'Adobe Creative Suite',
    'Figma & Sketch',
    'Canva Pro',
    'Affinity Designer',
    'Procreate',
    'CorelDRAW'
  ];

  return (
    <>
      <SEOHead
        title="Affordable Graphic Design Services - Logo Design & Brand Identity | Bytesflux"
        description="Professional graphic design services at affordable prices. Logo design, brand identity, marketing materials, and digital graphics. Quality design without breaking the bank."
        keywords="affordable graphic design services, logo design, brand identity, marketing materials"
        canonical="https://bytesflux.com/graphic-design"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Graphic Design",
          "description": "Brand identity and visual design services",
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
      <section className="relative py-20 bg-gradient-to-br from-green-50 to-teal-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Affordable Graphic Design Services
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Professional graphic design services at competitive prices. We create stunning visual 
              content that elevates your brand and drives business growth without breaking the bank.
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
              <Palette className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Brand Identity Design</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Complete brand identity packages including logos, color schemes, and style guides.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <Brush className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Marketing Materials</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Brochures, flyers, banners, and promotional materials that convert.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <Camera className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Digital Graphics</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Social media graphics, website visuals, and digital advertising assets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Affordable Services */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our Affordable Graphic Design Services?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Professional quality design at prices that work for your budget. No compromise on creativity or quality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Turnaround</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Quick delivery without sacrificing quality or attention to detail
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Professional standards maintained across all design projects
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Direct Communication</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Work directly with designers for better understanding and results
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Unlimited Revisions</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Free revisions until you're completely satisfied with the design
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Palette className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Creative Excellence</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Innovative designs that stand out and capture attention
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <PenTool className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Custom Solutions</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Tailored designs that perfectly match your brand and requirements
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Graphic Design Process
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              A streamlined process that ensures quality results and client satisfaction
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {designProcess.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {index === 0 && "Understanding your needs and project requirements"}
                  {index === 1 && "Creating initial concepts and design directions"}
                  {index === 2 && "Developing the chosen concept into final designs"}
                  {index === 3 && "Gathering your feedback and suggestions"}
                  {index === 4 && "Making adjustments and improvements based on feedback"}
                  {index === 5 && "Delivering final files in all required formats"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Comprehensive Graphic Design Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              From logos to complete brand packages, we offer all the graphic design services you need
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                Brand Identity Design
              </h3>
              <div className="space-y-4">
                {services.slice(0, 5).map((service, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                Marketing & Digital Design
              </h3>
              <div className="space-y-4">
                {services.slice(5).map((service, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools & Technologies */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Professional Design Tools
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We use industry-standard tools to create high-quality designs
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {tools.map((tool, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{tool}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Affordable Features */}
      <section className="py-20 bg-green-50 dark:bg-green-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Makes Our Services Affordable?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Quality design doesn't have to be expensive. Here's how we keep costs low while maintaining excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {affordableFeatures.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Clear, upfront pricing with no hidden costs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-4">Basic Package</h3>
              <p className="text-3xl font-bold text-green-600 mb-6">$99</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Logo Design</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Business Card</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">2 Revisions</span>
                </li>
              </ul>
            
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-2 border-green-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold mb-4">Professional Package</h3>
              <p className="text-3xl font-bold text-green-600 mb-6">$299</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Complete Brand Identity</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Marketing Materials</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Unlimited Revisions</span>
                </li>
              </ul>
           
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-4">Premium Package</h3>
              <p className="text-3xl font-bold text-green-600 mb-6">$599</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Full Brand Package</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Digital & Print Assets</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Priority Support</span>
                </li>
              </ul>
           
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Brand?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Get professional graphic design services at affordable prices. Let's create something amazing together.
          </p>
        
        </div>
      </section>
        <Footer />
      </div>
    </>
  );
};

export default page; 