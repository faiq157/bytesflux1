
"use client";
import React from 'react';
import { User, GraduationCap, Briefcase, Linkedin, Code, Zap, Award, Target, Lightbulb, Users } from 'lucide-react';
import SVGLightning from './SVGLightning';

const CEOStory = () => {
  const journeySteps = [
    {
      year: '2023',
      title: 'LinkedIn Journey Begins',
      description: 'Started building a strong LinkedIn profile to establish professional presence in the tech industry.',
      icon: Linkedin,
      accent: ''
    },
    {
      year: '2023',
      title: 'First Upwork Success',
      description: 'Completed first WordPress website project for $10, marking the beginning of freelance career.',
      icon: Briefcase,
      accent: ''
    },
    {
      year: '2024',
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
      year: '2025',
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
    <section id="ceo-story" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Lightning SVG Accents */}
      <SVGLightning className="top-10 right-20 opacity-10" />
      <SVGLightning className="bottom-10 left-20 opacity-10 transform rotate-45" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-3 rounded-xl transform hover:scale-110 hover:rotate-3 transition-all duration-300 shadow-lg">
              <User className="h-8 w-8 text-white animate-pulse" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 transform hover:scale-105 transition-transform duration-300 relative">
            CEO Story
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/10 to-teal-600/10 blur-lg -z-10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            From university student to tech entrepreneur - the inspiring journey of Faiq Ahmad
          </p>
        </div>

        {/* CEO Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
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

        {/* Journey Timeline */}
        <div className="mb-20">
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
                        <IconComponent className="h-6 w-6 text-white" />
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

        {/* Current Achievement */}
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

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-1 rounded-2xl inline-block">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl">
                Whether you're just starting out or looking to scale your business, 
                our team at BytesFlux is here to help you achieve your goals.
              </p>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="relative bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 rounded-full border border-white/30 opacity-0 group-hover:opacity-100 animate-pulse"></div>
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Let's Build Together</span>
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

export default CEOStory; 