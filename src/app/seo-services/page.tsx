import React from 'react';
import { Search, TrendingUp, BarChart3, Target, CheckCircle, Zap, Shield, Users } from 'lucide-react';
import SEOHead from '@/app/components/SEOHead';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
const SEOServices = () => {
  const services = [
    'Technical SEO Optimization',
    'On-Page SEO Enhancement',
    'Off-Page SEO & Link Building',
    'Local SEO Services',
    'Content Strategy & Optimization',
    'Keyword Research & Analysis',
    'SEO Audits & Reporting',
    'E-commerce SEO',
    'Mobile SEO Optimization',
    'Voice Search Optimization'
  ];

  const benefits = [
    'Higher search engine rankings',
    'Increased organic traffic',
    'Better user experience',
    'Improved conversion rates',
    'Long-term sustainable results',
    'Competitive advantage'
  ];

  const seoProcess = [
    'SEO Audit & Analysis',
    'Keyword Research',
    'Technical Optimization',
    'Content Strategy',
    'Link Building',
    'Monitoring & Reporting'
  ];

  const tools = [
    'Google Analytics',
    'Google Search Console',
    'SEMrush',
    'Ahrefs',
    'Moz Pro',
    'Screaming Frog'
  ];

  return (
    <>
      <SEOHead
        title="Professional SEO Services - Search Engine Optimization | Bytesflux"
        description="Boost your website's visibility and drive sustainable organic traffic with BytesFlux's comprehensive SEO services in Pakistan. Our expert team delivers technical SEO optimization, on-page content optimization, local search engine optimization, and strategic content marketing that significantly improves your search engine rankings. We implement white-hat SEO techniques including keyword research, meta tag optimization, internal linking strategies, and technical improvements that enhance your website's search engine performance. Our local SEO services help businesses dominate regional search results and attract customers in their target geographic areas. We provide detailed analytics and reporting to track your progress, ensuring transparency and measurable results. From small businesses to large enterprises, our data-driven SEO strategies deliver long-term success and help you achieve sustainable growth in the competitive digital marketplace."
        keywords="SEO services, search engine optimization, technical SEO, local SEO"
        canonical="https://bytesflux.com/seo-services"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "SEO Services",
          "description": "Search engine optimization and digital marketing",
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
      <section className="relative py-20 bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Professional SEO Services
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Boost your website's visibility and drive organic traffic with our comprehensive SEO services. 
              We help businesses rank higher on search engines and achieve sustainable growth.
            </p>
           
            
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <Search className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Technical SEO</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Optimize your website's technical foundation for better search engine performance.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <TrendingUp className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">On-Page SEO</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Optimize content, meta tags, and internal structure for maximum visibility.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <Target className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Local SEO</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Dominate local search results and attract customers in your area.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our SEO Services */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Bytesflux for SEO Services?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We use data-driven strategies and proven techniques to improve your search rankings.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Results</h3>
              <p className="text-gray-600 dark:text-gray-300">
                See improvements in search rankings within weeks, not months
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">White Hat SEO</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ethical, sustainable SEO practices that comply with search engine guidelines
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Team</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Certified SEO professionals with years of experience
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Detailed Reporting</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Monthly reports showing progress and ROI of SEO efforts
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Long-term Success</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sustainable strategies that provide lasting results
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Target className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Custom Strategies</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Tailored SEO plans for your specific industry and goals
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our SEO Process
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              A systematic approach to improving your search engine rankings
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {seoProcess.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-orange-600 text-white rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {index === 0 && "Comprehensive analysis of your website's current SEO performance"}
                  {index === 1 && "Identifying high-value keywords with strong search volume and low competition"}
                  {index === 2 && "Fixing technical issues and optimizing website structure for search engines"}
                  {index === 3 && "Creating high-quality, keyword-optimized content that engages users"}
                  {index === 4 && "Building quality backlinks from authoritative websites in your industry"}
                  {index === 5 && "Tracking progress and providing detailed monthly reports"}
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
              Comprehensive SEO Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              From technical optimization to content strategy, we cover all aspects of SEO
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                Technical & On-Page SEO
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
                Advanced SEO Services
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
              Professional SEO Tools
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We use industry-leading tools to analyze, optimize, and track your SEO performance
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

      {/* SEO Benefits */}
      <section className="py-20 bg-orange-50 dark:bg-orange-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Benefits of Professional SEO Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Invest in SEO and watch your business grow with sustainable, organic traffic
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-orange-600 mr-3" />
                  <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
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
              SEO Service Packages
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Choose the perfect SEO package for your business needs and budget
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-4">Starter SEO</h3>
              <p className="text-3xl font-bold text-orange-600 mb-6">$299/mo</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Technical SEO Audit</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Keyword Research</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Monthly Reports</span>
                </li>
              </ul>
        
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-2 border-orange-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold mb-4">Professional SEO</h3>
              <p className="text-3xl font-bold text-orange-600 mb-6">$599/mo</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Complete SEO Strategy</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Content Optimization</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Link Building</span>
                </li>
              </ul>
      
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-4">Enterprise SEO</h3>
              <p className="text-3xl font-bold text-orange-600 mb-6">$999/mo</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Full-Service SEO</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Priority Support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                  <span className="text-gray-700 dark:text-gray-300">Custom Strategy</span>
                </li>
              </ul>
            
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Dominate Search Results?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Get your free SEO audit and discover how we can improve your search rankings.
          </p>
       
        </div>
      </section>
        <Footer />
      </div>
    </>
  );
};

export default SEOServices; 