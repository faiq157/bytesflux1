"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Play, Zap, Code, Palette, Share2 } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import AnimatedBackground from './AnimatedBackground';
import LightningBackground from './LightningBackground';
import SVGLightning from './SVGLightning';
import ElectricParticles from './ElectricParticles';

const Hero = () => {
    const [showBackgrounds, setShowBackgrounds] = useState(false);
    
    useEffect(() => {
        // Delay loading heavy background components
        const timer = setTimeout(() => {
            setShowBackgrounds(true);
        }, 100);
        
        return () => clearTimeout(timer);
    }, []);

    const handleClick = () => {
        window.open("https://calendly.com/faiqa5325/demo-bytesflux", "_blank");
    }
    
    const scrollToContact = () => {
        const element = document.getElementById('contact');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="relative pt-16 bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen flex items-center overflow-hidden transition-colors duration-300">
            {/* Lazy load background components */}
            {showBackgrounds && (
                <>
                    <AnimatedBackground />
                    <ParticleBackground />
                    <LightningBackground />
                    <ElectricParticles />
                    
                    {/* SVG Lightning positioned around the content */}
                    <SVGLightning className="top-20 left-10 opacity-20" />
                    <SVGLightning className="bottom-20 right-10 opacity-15 transform rotate-180" />
                </>
            )}
            
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Logo Animation */}
                    <div className="flex justify-center mb-8">
                        <div className="relative group">
                            <div className="relative w-20 h-20 bg-gradient-to-r from-blue-600 to-teal-600 p-2 rounded-2xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-2xl">
                                <Image
                                    src="/logo.png"
                                    alt="BytesFlux Logo"
                                    width={64}
                                    height={64}
                                    className="w-full h-full object-contain"
                                    priority
                                />
                            </div>
                            {/* Electric sparks for performance */}
                            {showBackgrounds && (
                                <div className="absolute -inset-4">
                                    {[...Array(3)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping"
                                            style={{
                                                top: `${20 + Math.sin(i * Math.PI / 3) * 30}%`,
                                                left: `${50 + Math.cos(i * Math.PI / 3) * 40}%`,
                                                animationDelay: `${i * 0.3}s`,
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Optimized Main Headline */}
                    <div className="relative">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                            Powering Your Digital{' '}
                            <span className="relative inline-block">
                                <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                                    Transformation
                                </span>
                                {showBackgrounds && (
                                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-teal-600/20 blur-2xl -z-10"></div>
                                )}
                                {/* Simplified lightning accent */}
                                {showBackgrounds && (
                                    <svg 
                                        className="absolute -top-2 -right-8 w-8 h-8 text-blue-500 opacity-60" 
                                        fill="currentColor" 
                                        viewBox="0 0 20 20"
                                    >
                                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </span>
                        </h1>
                    </div>

                    {/* Optimized Subtext */}
                    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                        BytesFlux delivers cutting-edge software development, stunning graphic design, and strategic social media management. 
                        As Pakistan's premier digital solutions provider, BytesFlux transforms your ideas into powerful digital solutions that drive growth and engagement.
                    </p>

                    {/* Optimized Service Highlights */}
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        {[
                            { icon: Code, text: 'Custom Software' },
                            { icon: Palette, text: 'Graphic Design' },
                            { icon: Share2, text: 'Social Media' }
                        ].map((service, index) => {
                            const IconComponent = service.icon;
                            return (
                                <div 
                                    key={index}
                                    className="flex items-center space-x-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                                >
                                    <IconComponent className="h-5 w-5 text-blue-600" />
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">{service.text}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Optimized CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                        <button
                            onClick={scrollToContact}
                            className="group relative bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 flex items-center space-x-2 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative z-10">Start Your Project</span>
                            <Zap className="h-5 w-5 group-hover:animate-pulse relative z-10" />
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform relative z-10" />
                        </button>
                        
                        <button onClick={handleClick} className="group flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-lg transition-colors duration-200">
                            <div className="relative bg-white dark:bg-gray-800 shadow-lg rounded-full p-3 group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                                <Play className="h-5 w-5 ml-1" />
                            </div>
                            <span>Book a Meet</span>
                        </button>
                    </div>

                    {/* Optimized Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-20 border-t border-gray-200 dark:border-gray-700">
                        {[
                            { label: 'Projects Completed', value: '50+', icon: '' },
                            { label: 'Happy Clients', value: '80+', icon: '' },
                            { label: 'Years Experience', value: '5+', icon: '' },
                            { label: 'Team Experts', value: '12+', icon: '' }
                        ].map((stat, index) => (
                            <div 
                                key={index} 
                                className="text-center group cursor-pointer transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 relative"
                            >
                                <div className="relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden">
                                    <div className="text-3xl mb-2">
                                        {stat.icon}
                                    </div>
                                    <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300 relative z-10">
                                        {stat.value}
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-400 text-sm sm:text-base relative z-10">
                                        {stat.label}
                                    </div>
                                    
                                    {showBackgrounds && (
                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-60 transition-opacity duration-300">
                                            <Zap className="h-4 w-4 text-blue-500" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Simplified parallax layers */}
            {showBackgrounds && (
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500/50 rounded-full animate-ping"></div>
                    <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-teal-500/50 rounded-full animate-ping delay-1000"></div>
                    <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-purple-500/50 rounded-full animate-ping delay-2000"></div>
                </div>
            )}
        </section>
    );
};

export default Hero;