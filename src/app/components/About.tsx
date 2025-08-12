"use client";
import React from 'react';
import { Target, Users, Award, Lightbulb } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'Every project is focused on delivering measurable results that drive your business forward.'
    },
    {
      icon: Users,
      title: 'Client Partnership',
      description: 'We build lasting relationships by treating your success as our own success.'
    },
    {
      icon: Award,
      title: 'Quality Excellence',
      description: 'We maintain the highest standards in code quality, design aesthetics, and user experience.'
    },
    {
      icon: Lightbulb,
      title: 'Creative Innovation',
      description: 'Staying ahead of trends to deliver cutting-edge solutions that set you apart.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-40 right-40 w-80 h-80 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-40 left-40 w-60 h-60 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-3xl animate-pulse delay-1500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="transform hover:translate-x-2 transition-transform duration-300">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 hover:scale-105 transition-transform duration-300">
              About BytesFlux
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed transform hover:translate-x-1 transition-transform duration-300">
                BytesFlux is a dynamic software development company specializing in custom applications, 
                stunning graphic design, and strategic social media management. We combine technical 
                expertise with creative vision to deliver solutions that truly make a difference.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed transform hover:translate-x-1 transition-transform duration-300 delay-100">
                Since our founding, we've helped over 80 businesses transform their digital presence, 
                streamline their operations, and achieve sustainable growth through innovative technology 
                and compelling design.
              </p>
              <div className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border-l-4 border-blue-600 transform hover:scale-105 hover:shadow-lg transition-all duration-300">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Our Mission</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  To empower businesses with innovative software solutions, captivating designs, and strategic 
                  digital marketing that drives growth, enhances user experiences, and creates lasting impact 
                  in the digital landscape.
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className="group bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-3 rounded-lg w-fit mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 transform hover:scale-105 transition-transform duration-300">
            Our Expert Team
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { role: 'Software Developers', count: '8+' },
              { role: 'Graphic Designers', count: '3+' },
              { role: 'Social Media Specialists', count: '2+' },
              { role: 'Project Managers', count: '2+' }
            ].map((team, index) => (
              <div 
                key={index} 
                className="text-center group cursor-pointer transform hover:-translate-y-2 hover:scale-110 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-2 group-hover:scale-125 transition-transform duration-300">
                    {team.count}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">
                    {team.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;