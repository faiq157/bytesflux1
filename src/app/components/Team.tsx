"use client";
import React from 'react';
import { User, Code, Palette, Share2, Zap, Award, Lightbulb, Target, Users } from 'lucide-react';
import SVGLightning from './SVGLightning';

const Team = () => {
  const teamMembers = [
    {
      name: 'Faiq Ahmad',
      role: 'Lead Software Engineer',
      department: 'Software Development',
      description: 'Full-stack developer with 2+ years of experience in modern web technologies and cloud architecture.',
      skills: ['React', 'Node.js', 'AWS', 'TypeScript'],
      icon: Code,
      accent: ''
    },
    {
      name: 'Maria Mushtaq',
      role: 'Next.js Developer',
      department: 'Software Development',
      description: 'Next.js developer with  1 year of experience in modern web technologies.',
      skills: ['Next.js', 'Node.js', 'TypeScript'],
      icon: Palette,
      accent: ''
    },
    {
      name: 'Maryam Shahzad',
      role: 'React Developer',
      department: 'Software Development',
      description: 'Frontend developer with 1 year of experience in modern web technologies.',
      skills: ['React', 'HTML', 'JavaScript'],
      icon: Share2,
      accent: ''
    },
    {
      name: 'Shabeer Ahmad',
      role: 'Mobile App Developer',
      department: 'Software Development',
      description: 'Specialized in native and cross-platform mobile development with focus on user experience.',
      skills: ['React Native', 'iOS', 'Android', 'App Store Optimization'],
      icon: Code,
      accent: ''
    },
    {
      name: 'Muhammad Hassan',
      role: 'SEO Expert',
      department: 'Digital Marketing',
      description: 'SEO expert with 3+ years of experience in modern web technologies and cloud architecture.',
      skills: ['SEO', 'Google Analytics', 'Google Search Console', 'Google Ads'],
      icon: Share2,
      accent: ''
    },
    {
      name :"Naveed Ahmad",
      role :"Digital Marketing",
      department :"Digital Marketing",
      description :"Digital Marketing with 4+ years of experience in modern web technologies and cloud architecture.",
      skills :["SEO", "Google Analytics", "Google Search Console", "Google Ads"],
      icon :Share2,
      accent :""
    }
  ];

  const departments = [
    {
      name: 'Software Development',
      count: '8+',
      description: 'Full-stack developers, mobile specialists, and DevOps engineers',
      icon: Code,
      color: 'from-blue-600 to-teal-600'
    },
    {
      name: 'Creative Design',
      count: '3+',
      description: 'Graphic designers, UI/UX specialists, and brand strategists',
      icon: Palette,
      color: 'from-purple-600 to-pink-600'
    },
    {
      name: 'Digital Marketing',
      count: '2+',
      description: 'Social media managers, content strategists, and analytics experts',
      icon: Share2,
      color: 'from-green-600 to-emerald-600'
    },
    {
      name: 'Project Management',
      count: '2+',
      description: 'Project managers, client relations, and quality assurance specialists',
      icon: Target,
      color: 'from-orange-600 to-red-600'
    }
  ];

  return (
    <section id="team" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300 relative overflow-hidden">
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
            Meet Our Team
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/10 to-teal-600/10 blur-lg -z-10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our diverse team of experts combines technical excellence with creative vision to deliver exceptional results
          </p>
        </div>

        {/* Department Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {departments.map((dept, index) => {
            const IconComponent = dept.icon;
            return (
              <div
                key={index}
                className="group bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`bg-gradient-to-r ${dept.color} p-3 rounded-lg w-fit mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-2 group-hover:scale-125 transition-transform duration-300">
                  {dept.count}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {dept.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {dept.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => {
            const IconComponent = member.icon;
            return (
              <div
                key={index}
                className="group relative bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm hover:shadow-2xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Electric gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-teal-600/5 dark:from-blue-600/10 dark:to-teal-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Electric border effect */}
                <div className="absolute inset-0 rounded-2xl border border-blue-400/30 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
                
                {/* Member accent emoji */}
                <div className="absolute top-4 right-4 text-2xl animate-bounce opacity-60 group-hover:opacity-100 transition-opacity duration-300" style={{ animationDelay: `${index * 0.3}s` }}>
                  {member.accent}
                </div>

                {/* Icon with enhanced 3D effect */}
                <div className="relative bg-gradient-to-r from-blue-600 to-teal-600 p-3 rounded-xl w-fit mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-2xl">
                  <IconComponent className="h-6 w-6 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-teal-700 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  {/* Electric sparks */}
                  <div className="absolute -inset-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"
                        style={{
                          top: `${25 + Math.sin(i * Math.PI / 2) * 20}%`,
                          left: `${50 + Math.cos(i * Math.PI / 2) * 30}%`,
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Member info */}
                <h3 className="relative text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {member.name}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-teal-600/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </h3>
                
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">
                  {member.role}
                </p>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {member.description}
                </p>

                {/* Skills */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Key Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-900/30 dark:to-teal-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full font-medium group-hover:scale-105 transition-transform duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Lightning bolt accent */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-40 transition-opacity duration-300">
                  <Zap className="h-5 w-5 text-blue-500 animate-pulse" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Team Culture Section */}
        <div className="mt-16 text-center">
          <div className="relative bg-gradient-to-r from-blue-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-teal-600/10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Electric border */}
            <div className="absolute inset-0 rounded-2xl border border-blue-400/30 opacity-0 hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
            
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-3 rounded-xl transform hover:scale-110 hover:rotate-3 transition-all duration-300 shadow-lg">
                  <Award className="h-8 w-8 text-white animate-pulse" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Team Culture
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
                We foster a collaborative environment where innovation thrives, creativity flourishes, and every team member's contribution is valued. 
                Our diverse backgrounds and expertise create a dynamic team that delivers exceptional results for our clients.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {[
                  { icon: Lightbulb, title: 'Innovation First', desc: 'Constantly exploring new technologies and creative solutions' },
                  { icon: Users, title: 'Collaboration', desc: 'Working together to achieve exceptional results' },
                  { icon: Target, title: 'Excellence', desc: 'Committed to delivering the highest quality in everything we do' }
                ].map((value, index) => {
                  const IconComponent = value.icon;
                  return (
                    <div key={index} className="text-center group">
                      <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-3 rounded-xl w-fit mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {value.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {value.desc}
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
  );
};

export default Team; 
