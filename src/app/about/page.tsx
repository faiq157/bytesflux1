import React from 'react';
import { Users, Award, Globe, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutPage = () => {
  const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '5+', label: 'Years Experience' },
    { number: '100%', label: 'Client Satisfaction' },
    { number: '24/7', label: 'Support Available' }
  ];

  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every project, ensuring the highest quality standards.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We work closely with our clients to understand their needs and deliver solutions.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We stay updated with the latest technologies and industry best practices.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'We serve clients worldwide while maintaining local expertise and understanding.'
    }
  ];

  const team = [
    {
      name: 'Ahmed Khan',
      role: 'Lead Developer',
      expertise: 'Full-Stack Development, React, Node.js'
    },
    {
      name: 'Fatima Ali',
      role: 'UI/UX Designer',
      expertise: 'User Experience, Graphic Design, Branding'
    },
    {
      name: 'Usman Hassan',
      role: 'Mobile Developer',
      expertise: 'iOS, Android, Cross-Platform Development'
    },
    {
      name: 'Ayesha Malik',
      role: 'SEO Specialist',
      expertise: 'Search Engine Optimization, Digital Marketing'
    }
  ];

  return (
    <>
      <SEOHead
        title="About Us - BytesFlux Team & Company Story | Digital Solutions Pakistan"
        description="Discover the story behind BytesFlux, Pakistan's trusted digital solutions partner since 2019. Our passionate team of digital innovators combines technical expertise with creative vision to deliver exceptional web development, mobile app development, graphic design, and SEO services. With over 5 years of experience serving businesses across Pakistan, we've built a reputation for quality, innovation, and customer satisfaction. Our diverse team includes skilled developers, creative designers, SEO specialists, and project managers who work collaboratively to transform your business ideas into powerful digital solutions. We believe in building long-term partnerships with our clients, understanding their unique challenges, and providing tailored solutions that drive measurable results. From startups to established enterprises, we've helped hundreds of businesses establish their digital presence and achieve sustainable growth in the competitive online marketplace."
        keywords="about BytesFlux, digital solutions company Pakistan, web development team, mobile app developers, graphic designers, SEO experts, IT company Pakistan"
        canonical="/about"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "BytesFlux",
          "description": "Leading digital solutions company in Pakistan providing web development, mobile app development, graphic design, and SEO services",
          "url": "https://bytesflux.com",
          "foundingDate": "2019",
          "numberOfEmployees": "10-50",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "Pakistan"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "availableLanguage": "English"
          },
          "employee": team.map(member => ({
            "@type": "Person",
            "name": member.name,
            "jobTitle": member.role
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
                About BytesFlux
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                We are a passionate team of digital innovators dedicated to transforming businesses 
                through cutting-edge technology and creative solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Story
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Founded in 2019, BytesFlux started with a simple mission: to make professional 
                  digital solutions accessible to businesses of all sizes in Pakistan and beyond.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  What began as a small team of passionate developers has grown into a comprehensive 
                  digital agency, serving clients across various industries with innovative solutions 
                  that drive real business results.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Today, we continue to push boundaries, embrace new technologies, and deliver 
                  exceptional value to our clients while maintaining the personal touch that sets us apart.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-teal-600 p-8 rounded-2xl text-white">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-blue-100 mb-6">
                  To empower businesses with innovative digital solutions that drive growth, 
                  enhance efficiency, and create lasting competitive advantages.
                </p>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-blue-100">
                  To be the leading digital transformation partner for businesses in Pakistan 
                  and the region, known for innovation, quality, and customer success.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our Core Values
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                The principles that guide everything we do and every decision we make
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {value.description}
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
              Ready to Work With Us?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and see how our team can help bring your vision to life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center"
              >
                Start Your Project
                <ArrowRight className="h-4 w-4 ml-2" />
              </a>
              <a
                href="/services"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
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

export default AboutPage; 