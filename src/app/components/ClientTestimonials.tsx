"use client";
import React, { useState } from 'react';
import { Star, Quote, ArrowLeft, ArrowRight, ExternalLink, Github, Globe } from 'lucide-react';

const ClientTestimonials: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeProject, setActiveProject] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Ahmed Khan",
      company: "TechStart Pakistan",
      position: "CEO & Founder",
      rating: 5,
      text: "BytesFlux transformed our startup's digital presence completely. Their web development team delivered a stunning e-commerce platform that increased our sales by 300%.",
      project: "E-commerce Platform",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Fatima Ali",
      company: "DesignHub Studio",
      position: "Creative Director",
      rating: 5,
      text: "Working with BytesFlux was a game-changer for our design agency. They developed a custom project management system that streamlined our workflow significantly.",
      project: "Project Management System",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Usman Hassan",
      company: "FoodExpress",
      position: "Operations Manager",
      rating: 5,
      text: "BytesFlux built our food delivery app from scratch. The app is not only beautiful but also highly functional. Our customers love the user experience.",
      project: "Food Delivery Mobile App",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-featured e-commerce solution with advanced inventory management, payment processing, and customer analytics.",
      category: "Web Development",
      technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
      features: ["Responsive Design", "Payment Integration", "Admin Dashboard", "Inventory Management"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Food Delivery Mobile App",
      description: "Cross-platform mobile application for food delivery with real-time tracking, payment processing, and restaurant management.",
      category: "Mobile Development",
      technologies: ["React Native", "Firebase", "Google Maps API", "Stripe", "Redux"],
      features: ["Real-time Tracking", "Push Notifications", "Payment Integration", "Restaurant Dashboard"],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Project Management System",
      description: "Comprehensive project management solution with task tracking, team collaboration, and project analytics.",
      category: "Web Development",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Material-UI"],
      features: ["Task Management", "Team Collaboration", "Time Tracking", "Project Analytics"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
    }
  ];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Quote className="h-4 w-4" />
            Client Success Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Trusted by <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">500+</span> Clients
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover why businesses across Pakistan choose BytesFlux for their digital transformation. 
            Our proven track record speaks for itself.
          </p>
        </div>

        {/* Testimonials Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            What Our Clients Say
          </h3>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
              {/* Navigation Arrows */}
              <button
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-600 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
              
              <button
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-600 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
              >
                <ArrowRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>

              {/* Testimonial Content */}
              <div className="text-center">
                {/* Avatar */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded-full">
                    <img
                      src={testimonials[activeTestimonial].avatar}
                      alt={`${testimonials[activeTestimonial].name} - ${testimonials[activeTestimonial].company}`}
                      className="w-full h-full rounded-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hidden">
                      <span className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                        {testimonials[activeTestimonial].name.charAt(0)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed italic">
                  "{testimonials[activeTestimonial].text}"
                </blockquote>

                {/* Client Info */}
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">
                    {testimonials[activeTestimonial].position}
                  </p>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    {testimonials[activeTestimonial].company}
                  </p>
                </div>

                {/* Project */}
                <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium">
                  <span>Project:</span>
                  <span className="font-semibold">{testimonials[activeTestimonial].project}</span>
                </div>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === activeTestimonial
                        ? 'bg-blue-600 scale-125'
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Projects Showcase Section */}
        <div>
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Featured Projects
          </h3>
          
          <div className="relative max-w-6xl mx-auto">
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
              {/* Navigation Arrows */}
              <button
                onClick={prevProject}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-600 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
              
              <button
                onClick={nextProject}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-600 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
              >
                <ArrowRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>

              {/* Project Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Project Image */}
                <div className="relative">
                  <div className="w-full h-64 lg:h-80 rounded-2xl overflow-hidden">
                    <img
                      src={projects[activeProject].image}
                      alt={`${projects[activeProject].title} - ${projects[activeProject].category}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        if (target.parentElement) {
                          target.parentElement.classList.add('bg-gradient-to-br', 'from-blue-600/20', 'to-purple-600/20');
                          target.parentElement.innerHTML = `
                            <div class="flex items-center justify-center h-full">
                              <div class="text-center text-gray-600 dark:text-gray-400">
                                <svg class="h-16 w-16 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                                  <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                                </svg>
                                <p class="text-lg font-medium">Project Preview</p>
                                <p class="text-sm">${projects[activeProject].title}</p>
                              </div>
                            </div>
                          `;
                        }
                      }}
                    />
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-full text-sm font-medium">
                      {projects[activeProject].category}
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {projects[activeProject].title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {projects[activeProject].description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Technologies Used
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {projects[activeProject].technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-lg text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Key Features
                    </h5>
                    <ul className="space-y-2">
                      {projects[activeProject].features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-8">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveProject(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === activeProject
                        ? 'bg-blue-600 scale-125'
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">500+</div>
              <div className="text-gray-600 dark:text-gray-400">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">200+</div>
              <div className="text-gray-600 dark:text-gray-400">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">5+</div>
              <div className="text-gray-600 dark:text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">98%</div>
              <div className="text-gray-600 dark:text-gray-400">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonials; 