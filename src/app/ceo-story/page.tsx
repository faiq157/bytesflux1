"use client";
import React from 'react';
import { User, GraduationCap, Briefcase, Code, Zap, Award, Target, Lightbulb, Users, History } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CEOStoryPage = () => {
  const journeySteps = [
    {
      year: '2023',
      title: 'First Upwork Success',
      description: 'Completed first WordPress website project for $10, marking the beginning of freelance career.',
      icon: Briefcase,
      accent: ''
    },
    {
      year: '2023',
      title: 'React.js Challenge',
      description: 'Faced difficulties learning React.js but persevered through the struggle to advance career.',
      icon: Code,
      accent: ''
    },
    {
      year: '2024',
      title: 'First Internship',
      description: 'Secured first internship opportunity while managing university studies and work responsibilities.',
      icon: GraduationCap,
      accent: ''
    },
    {
      year: '2024',
      title: 'Backend Development',
      description: 'Transitioned to backend development role, expanding technical expertise.',
      icon: Code,
      accent: ''
    },
    {
      year: '2025',
      title: 'E-Notesheet System',
      description: 'Developed comprehensive FYP project using MERN stack, gaining valuable experience.',
      icon: Target,
      accent: ''
    },
    {
      year: '2025',
      title: 'BytesFlux Founded',
      description: 'Launched BytesFlux.com, providing comprehensive software development services to the market.',
      icon: Zap,
      accent: ''
    }
  ];

  const achievements = [
    {
      icon: Users,
      title: 'Team Growth',
      description: 'Built a team of skilled engineers to deliver quality services'
    },
    {
      icon: Award,
      title: 'Service Excellence',
      description: 'Providing comprehensive software development solutions'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Creating cutting-edge solutions for modern businesses'
    }
  ];

  return (
    <>
      <SEOHead
        title="CEO Story - Faiq Ahmad's Journey from Student to Tech Entrepreneur | BytesFlux"
        description="Discover the inspiring journey of Faiq Ahmad, founder and CEO of BytesFlux. From a struggling React.js student to successful tech entrepreneur, follow his path from a $10 WordPress project to building a comprehensive software development company. Learn how perseverance through technical challenges, completing a MERN stack FYP project, and gaining real-world experience led to the creation of BytesFlux. This is a story of determination, continuous learning, and turning obstacles into opportunities in Pakistan's growing tech industry."
        keywords="Faiq Ahmad CEO story, BytesFlux founder, tech entrepreneur Pakistan, software development journey, student to entrepreneur, React.js learning journey"
        canonical="/ceo-story"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Faiq Ahmad",
          "jobTitle": "Founder & CEO",
          "worksFor": {
            "@type": "Organization",
            "name": "BytesFlux"
          },
          "description": "Computer Science graduate and tech entrepreneur who founded BytesFlux",
          "alumniOf": {
            "@type": "EducationalOrganization",
            "name": "University"
          }
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
                  <User className="h-8 w-8 text-white animate-pulse" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                CEO Story
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                From university student to tech entrepreneur - the inspiring journey of Faiq Ahmad
              </p>
            </div>
          </div>
        </section>

        {/* CEO Introduction */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="transform hover:translate-x-2 transition-transform duration-300">
                <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-1 rounded-2xl mb-6">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Faiq Ahmad
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4">
                      Founder & CEO, BytesFlux
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      Computer Science graduate (2025) with a passion for software development and entrepreneurship. 
                      Started from humble beginnings with a $10 WordPress project to building a comprehensive 
                      software development company serving the global market.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border-l-4 border-blue-600 transform hover:scale-105 hover:shadow-lg transition-all duration-300">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">The Challenge</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    "Learning React.js was incredibly difficult for me. I seriously considered leaving the field, 
                    but my determination to build a career and support my university expenses kept me going."
                  </p>
                </div>
                <div className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border-l-4 border-teal-600 transform hover:scale-105 hover:shadow-lg transition-all duration-300">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">The Breakthrough</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    "My FYP project - the E-Notesheet System using MERN stack - was a turning point. 
                    Working individually on this project gave me the confidence to start my own venture."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              The Journey
            </h3>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-teal-600"></div>
              
              <div className="space-y-12">
                {journeySteps.map((step, index) => {
                  const IconComponent = step.icon;
                  const isEven = index % 2 === 0;
                  
                  return (
                    <div key={index} className={`flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                      {/* Timeline Node */}
                      <div className="relative z-10">
                        <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300">
                          <History className="h-6 w-6 text-white" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full animate-ping opacity-0 hover:opacity-75 transition-opacity duration-300"></div>
                      </div>

                      {/* Content Card */}
                      <div className={`w-1/2 ${isEven ? 'pr-8' : 'pl-8'}`}>
                        <div className="group bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                              {step.year}
                            </span>
                            <span className="text-2xl animate-bounce opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                              {step.accent}
                            </span>
                          </div>
                          <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                            {step.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Current Achievement */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="relative bg-gradient-to-r from-blue-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-teal-600/10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Electric border */}
                <div className="absolute inset-0 rounded-2xl border border-blue-400/30 opacity-0 hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-center mb-4">
                    <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-3 rounded-xl transform hover:scale-110 hover:rotate-3 transition-all duration-300 shadow-lg">
                      <Zap className="h-8 w-8 text-white animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    BytesFlux Today
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
                    After completing my FYP and gaining valuable experience, I founded BytesFlux.com. 
                    Today, we have a team of skilled engineers providing comprehensive software development 
                    services to clients worldwide, from custom web applications to mobile development and beyond.
                  </p>
                  
                  {/* Achievement Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    {achievements.map((achievement, index) => {
                      const IconComponent = achievement.icon;
                      return (
                        <div key={index} className="text-center group">
                          <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-3 rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                            {achievement.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            {achievement.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl inline-block">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl">
                Whether you're just starting out or looking to scale your business, 
                our team at BytesFlux is here to help you achieve your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 inline-flex items-center"
                >
                  <span>Let's Build Together</span>
                  <Zap className="h-4 w-4 ml-2 group-hover:animate-pulse" />
                </a>
                <a
                  href="/about"
                  className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200"
                >
                  Learn More About Us
                </a>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
};

export default CEOStoryPage; 