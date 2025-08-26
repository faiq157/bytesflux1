import React from 'react';
import { Code, Palette, Smartphone, Search, Globe, Zap, ExternalLink, Github, Eye } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PortfolioPage = () => {
  const projects = [
    {
      title: 'E-Notesheet System',
      description: 'Comprehensive Final Year Project using MERN stack for educational institution management.',
      category: 'Web Development',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      image: '/logo.png',
      icon: Code,
      link: '#',
      github: '#',
      features: ['Student Management', 'Course Tracking', 'Grade Management', 'Admin Dashboard']
    },
    {
      title: 'BytesFlux Website',
      description: 'Modern, responsive corporate website with advanced animations and SEO optimization.',
      category: 'Web Development',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      image: '/logo.png',
      icon: Globe,
      link: 'https://bytesflux.com',
      github: '#',
      features: ['Responsive Design', 'SEO Optimized', 'Performance Optimized', 'Modern UI/UX']
    },
    {
      title: 'Mobile E-commerce App',
      description: 'Cross-platform mobile application for online shopping with payment integration.',
      category: 'Mobile Development',
      technologies: ['React Native', 'Node.js', 'MongoDB', 'Stripe'],
      image: '/logo.png',
      icon: Smartphone,
      link: '#',
      github: '#',
      features: ['User Authentication', 'Product Catalog', 'Shopping Cart', 'Payment Gateway']
    },
    {
      title: 'Brand Identity Package',
      description: 'Complete brand identity design including logo, business cards, and marketing materials.',
      category: 'Graphic Design',
      technologies: ['Adobe Illustrator', 'Photoshop', 'InDesign'],
      image: '/logo.png',
      icon: Palette,
      link: '#',
      github: '#',
      features: ['Logo Design', 'Business Cards', 'Marketing Materials', 'Brand Guidelines']
    },
    {
      title: 'SEO Optimization Project',
      description: 'Comprehensive SEO overhaul for e-commerce website resulting in 200% traffic increase.',
      category: 'SEO Services',
      technologies: ['Google Analytics', 'Search Console', 'Keyword Research', 'Content Strategy'],
      image: '/logo.png',
      icon: Search,
      link: '#',
      github: '#',
      features: ['Technical SEO', 'Content Optimization', 'Link Building', 'Performance Monitoring']
    },
    {
      title: 'Custom CRM System',
      description: 'Enterprise-level customer relationship management system for business automation.',
      category: 'Web Development',
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'Redis'],
      image: '/logo.png',
      icon: Code,
      link: '#',
      github: '#',
      features: ['Lead Management', 'Sales Pipeline', 'Customer Database', 'Analytics Dashboard']
    }
  ];

  const categories = [
    { name: 'All', icon: Zap, count: projects.length },
    { name: 'Web Development', icon: Code, count: projects.filter(p => p.category === 'Web Development').length },
    { name: 'Mobile Development', icon: Smartphone, count: projects.filter(p => p.category === 'Mobile Development').length },
    { name: 'Graphic Design', icon: Palette, count: projects.filter(p => p.category === 'Graphic Design').length },
    { name: 'SEO Services', icon: Search, count: projects.filter(p => p.category === 'SEO Services').length }
  ];

  const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '25+', label: 'Happy Clients' },
    { number: '5+', label: 'Years Experience' },
    { number: '100%', label: 'Client Satisfaction' }
  ];

  return (
    <>
      <SEOHead
        title="Portfolio - BytesFlux Projects & Case Studies | Web Development & Design Work"
        description="Explore BytesFlux's impressive portfolio of successful digital projects. Our portfolio showcases our expertise in web development, mobile app development, graphic design, and SEO services. View detailed case studies of projects including the E-Notesheet System, corporate websites, mobile applications, and brand identity designs. Each project demonstrates our commitment to quality, innovation, and client satisfaction. From MERN stack applications to React Native mobile apps, our portfolio reflects our technical capabilities and creative vision. Discover how we've helped businesses transform their digital presence and achieve measurable results through our comprehensive digital solutions."
        keywords="BytesFlux portfolio, web development projects, mobile app development, graphic design portfolio, SEO case studies, project examples"
        canonical="/portfolio"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "BytesFlux Portfolio",
          "description": "Collection of digital projects and case studies",
          "itemListElement": projects.map((project, index) => ({
            "@type": "CreativeWork",
            "position": index + 1,
            "name": project.title,
            "description": project.description,
            "url": project.link
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
                  <Code className="h-8 w-8 text-white animate-pulse" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Our Portfolio
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Showcasing our best work and successful projects that demonstrate our expertise 
                in digital solutions and creative innovation
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

        {/* Portfolio Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Projects
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                A selection of our most impactful and innovative work across different digital domains
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => {
                const IconComponent = project.icon;
                return (
                  <div
                    key={index}
                    className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 overflow-hidden border border-gray-100 dark:border-gray-700"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Project Image */}
                    <div className="relative h-48 bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900 to-teal-900 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <IconComponent className="h-16 w-16 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
                          {project.category}
                        </span>
                        <div className="flex space-x-2">
                          {project.github !== '#' && (
                            <a
                              href={project.github}
                              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                              title="View Code"
                            >
                              <Github className="h-4 w-4" />
                            </a>
                          )}
                          {project.link !== '#' && (
                            <a
                              href={project.link}
                              className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                              title="Live Demo"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {project.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Technologies:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Key Features:</h4>
                        <ul className="space-y-1">
                          {project.features.slice(0, 3).map((feature, featureIndex) => (
                            <li key={featureIndex} className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* View Project Button */}
                      <div className="flex space-x-2">
                        <a
                          href={project.link}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-teal-700 transition-all duration-200 flex items-center justify-center group"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Project
                        </a>
                      </div>
                    </div>
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
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss your project requirements and create something amazing together
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

export default PortfolioPage; 