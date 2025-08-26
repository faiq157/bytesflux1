"use client";
import React from 'react';
import { Star, Quote, User, Award, ThumbsUp, Heart, Zap } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TestimonialsPage = () => {
  const testimonials = [
    {
      name: 'Ahmed Khan',
      company: 'TechStart Pakistan',
      role: 'CEO',
      rating: 5,
      content: 'BytesFlux transformed our outdated website into a modern, responsive platform that increased our online conversions by 300%. Their team was professional, communicative, and delivered beyond our expectations.',
      project: 'E-commerce Website Redesign',
      image: '/logo.png',
      category: 'Web Development'
    },
    {
      name: 'Fatima Ali',
      company: 'Creative Studios',
      role: 'Marketing Director',
      rating: 5,
      content: 'The brand identity package designed by BytesFlux perfectly captured our company\'s vision. The logo, business cards, and marketing materials have received countless compliments from our clients and partners.',
      project: 'Brand Identity Design',
      image: '/logo.png',
      category: 'Graphic Design'
    },
    {
      name: 'Usman Hassan',
      company: 'MobileTech Solutions',
      role: 'Founder',
      rating: 5,
      content: 'BytesFlux developed our mobile app with exceptional attention to detail. The user experience is intuitive, the performance is outstanding, and the app has helped us acquire 500+ new customers in just 3 months.',
      project: 'Mobile E-commerce App',
      image: '/logo.png',
      category: 'Mobile Development'
    },
    {
      name: 'Ayesha Malik',
      company: 'Digital Marketing Pro',
      role: 'Owner',
      rating: 5,
      content: 'After implementing BytesFlux\'s SEO strategies, our website traffic increased by 200% and we started ranking on the first page of Google for our target keywords. The results exceeded our expectations.',
      project: 'SEO Optimization',
      image: '/logo.png',
      category: 'SEO Services'
    },
    {
      name: 'Muhammad Bilal',
      company: 'StartupHub',
      role: 'CTO',
      rating: 5,
      content: 'BytesFlux built our custom CRM system from scratch. The development process was smooth, the team was highly skilled, and the final product has streamlined our entire business operations.',
      project: 'Custom CRM System',
      image: '/logo.png',
      category: 'Web Development'
    },
    {
      name: 'Sara Ahmed',
      company: 'EduTech Pakistan',
      role: 'Operations Manager',
      rating: 5,
      content: 'Working with BytesFlux on our educational platform was a game-changer. Their technical expertise and understanding of our requirements resulted in a system that serves thousands of students effectively.',
      project: 'Educational Platform',
      image: '/logo.png',
      category: 'Web Development'
    }
  ];

  const stats = [
    { number: '100%', label: 'Client Satisfaction', icon: Heart },
    { number: '5.0', label: 'Average Rating', icon: Star },
    { number: '50+', label: 'Happy Clients', icon: User },
    { number: '25+', label: 'Projects Completed', icon: Award }
  ];

  const categories = [
    { name: 'All', count: testimonials.length },
    { name: 'Web Development', count: testimonials.filter(t => t.category === 'Web Development').length },
    { name: 'Mobile Development', count: testimonials.filter(t => t.category === 'Mobile Development').length },
    { name: 'Graphic Design', count: testimonials.filter(t => t.category === 'Graphic Design').length },
    { name: 'SEO Services', count: testimonials.filter(t => t.category === 'SEO Services').length }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <>
      <SEOHead
        title="Client Testimonials - BytesFlux Reviews & Success Stories | Digital Solutions Pakistan"
        description="Read authentic client testimonials and success stories from businesses that have worked with BytesFlux. Our satisfied clients share their experiences with our web development, mobile app development, graphic design, and SEO services. Discover how we've helped companies increase conversions, improve user experience, and achieve measurable business results. From e-commerce websites to mobile applications, our portfolio of client feedback demonstrates our commitment to excellence, communication, and delivering solutions that exceed expectations. Join the growing list of happy clients who trust BytesFlux for their digital transformation needs."
        keywords="BytesFlux testimonials, client reviews, customer feedback, success stories, web development reviews, mobile app development feedback"
        canonical="/testimonials"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Client Testimonials",
          "description": "Client feedback and reviews for BytesFlux services",
          "itemListElement": testimonials.map((testimonial, index) => ({
            "@type": "Review",
            "position": index + 1,
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": testimonial.rating
            },
            "author": {
              "@type": "Person",
              "name": testimonial.name
            },
            "reviewBody": testimonial.content
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
                  <Quote className="h-8 w-8 text-white animate-pulse" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Client Testimonials
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Hear from our satisfied clients about their experience working with BytesFlux 
                and the results we've delivered for their businesses
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-3">
                      <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-3 rounded-full">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                What Our Clients Say
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Real feedback from real clients who have experienced the BytesFlux difference
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border border-gray-100 dark:border-gray-700 overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Quote Icon */}
                  <div className="relative bg-gradient-to-r from-blue-600 to-teal-600 p-6">
                    <Quote className="h-8 w-8 text-white opacity-80" />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full">
                        {testimonial.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      {renderStars(testimonial.rating)}
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.rating}.0
                      </span>
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed italic">
                      "{testimonial.content}"
                    </blockquote>

                    {/* Project Info */}
                    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Project: {testimonial.project}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.category}
                      </p>
                    </div>

                    {/* Client Info */}
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center mr-4">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Why Clients Choose BytesFlux
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                The qualities that make us the preferred choice for digital solutions
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: 'Fast Delivery',
                  description: 'We deliver projects on time without compromising quality, ensuring your business moves forward quickly.'
                },
                {
                  icon: Heart,
                  title: 'Client Focused',
                  description: 'Your success is our priority. We work closely with you to understand your needs and exceed expectations.'
                },
                {
                  icon: Award,
                  title: 'Quality Assured',
                  description: 'Every project undergoes rigorous testing and quality checks to ensure the highest standards.'
                }
              ].map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="text-center group">
                    <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
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
              Ready to Join Our Happy Clients?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and add your success story to our testimonials
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Start Your Project
              </a>
              <a
                href="/portfolio"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
              >
                View Our Work
              </a>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
};

export default TestimonialsPage; 