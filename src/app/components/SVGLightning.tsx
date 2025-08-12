"use client";
import React from 'react';
import { useTheme } from 'next-themes';
const SVGLightning: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const lightningColor = isDark ? '#60a5fa' : '#3b82f6';

  return (
    <div className={`absolute pointer-events-none ${className}`}>
      {/* Main Lightning Bolt */}
      <svg 
        width="200" 
        height="300" 
        viewBox="0 0 200 300" 
        className="absolute top-0 left-0 opacity-60"
      >
        <defs>
          <linearGradient id="lightningGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDark ? "#60a5fa" : "#3b82f6"} stopOpacity="1" />
            <stop offset="50%" stopColor={isDark ? "#06b6d4" : "#0891b2"} stopOpacity="0.8" />
            <stop offset="100%" stopColor={isDark ? "#8b5cf6" : "#7c3aed"} stopOpacity="0.6" />
          </linearGradient>
          
          <filter id="glow1">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <path
          d="M100 10 L80 80 L120 75 L90 150 L110 145 L85 220 L105 215 L75 290"
          stroke="url(#lightningGradient1)"
          strokeWidth="3"
          fill="none"
          filter="url(#glow1)"
          className="animate-pulse"
        >
          <animate
            attributeName="opacity"
            values="0.3;1;0.3;1;0.3"
            dur="2s"
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            type="scale"
            values="1;1.1;1;1.05;1"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>
        
        {/* Branch bolts */}
        <path
          d="M80 80 L60 100 L70 120"
          stroke="url(#lightningGradient1)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow1)"
          opacity="0.7"
        >
          <animate
            attributeName="opacity"
            values="0;0.7;0;0.7;0"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </path>
        
        <path
          d="M120 75 L140 95 L130 115"
          stroke="url(#lightningGradient1)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow1)"
          opacity="0.7"
        >
          <animate
            attributeName="opacity"
            values="0;0.7;0;0.7;0"
            dur="1.8s"
            repeatCount="indefinite"
          />
        </path>
      </svg>

      {/* Secondary Lightning */}
      <svg 
        width="150" 
        height="200" 
        viewBox="0 0 150 200" 
        className="absolute top-20 right-10 opacity-40"
      >
        <defs>
          <linearGradient id="lightningGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isDark ? "#06b6d4" : "#0891b2"} stopOpacity="1" />
            <stop offset="100%" stopColor={isDark ? "#8b5cf6" : "#7c3aed"} stopOpacity="0.8" />
          </linearGradient>
          
          <filter id="glow2">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <path
          d="M75 5 L65 50 L85 45 L70 90 L80 85 L60 130 L75 125 L55 170"
          stroke="url(#lightningGradient2)"
          strokeWidth="2"
          fill="none"
          filter="url(#glow2)"
        >
          <animate
            attributeName="opacity"
            values="0.2;0.8;0.2;0.8;0.2"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </path>
      </svg>

      {/* Electric Sparks */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              isDark ? 'bg-blue-400' : 'bg-blue-600'
            } animate-ping`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random()}s`
            }}
          />
        ))}
      </div>

      {/* Animated Electric Arcs */}
      <svg 
        width="300" 
        height="200" 
        viewBox="0 0 300 200" 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 opacity-30"
      >
        <defs>
          <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isDark ? "#60a5fa" : "#3b82f6"} stopOpacity="0" />
            <stop offset="50%" stopColor={isDark ? "#06b6d4" : "#0891b2"} stopOpacity="1" />
            <stop offset="100%" stopColor={isDark ? "#8b5cf6" : "#7c3aed"} stopOpacity="0" />
          </linearGradient>
        </defs>
        
        <path
          d="M50 150 Q150 50 250 150"
          stroke="url(#arcGradient)"
          strokeWidth="2"
          fill="none"
        >
          <animate
            attributeName="stroke-dasharray"
            values="0 400;200 200;400 0"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>
        
        <path
          d="M30 170 Q150 70 270 170"
          stroke="url(#arcGradient)"
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        >
          <animate
            attributeName="stroke-dasharray"
            values="0 400;200 200;400 0"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
};

export default SVGLightning;