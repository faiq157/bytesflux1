"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const AnimatedBackground: React.FC = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent mismatch on SSR
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div className="absolute inset-0 overflow-hidden -z-20">
      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-teal-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      
      {/* Animated Grid */}
      <div className={`absolute inset-0 opacity-10 ${isDark ? 'opacity-5' : ''}`}>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={isDark ? "#60a5fa" : "#3b82f6"} strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Morphing SVG Shapes */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 opacity-20">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path 
            fill={isDark ? "#60a5fa" : "#3b82f6"}
            d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,89.8,-0.2C89.6,15.9,86.6,31.8,78.9,45.2C71.2,58.6,58.8,69.5,44.7,76.4C30.6,83.3,15.3,86.2,0.1,86.1C-15.1,86,-30.2,82.9,-44.7,76.4C-59.2,69.9,-73.1,60,-81.9,-46.8C-90.7,-33.6,-94.4,-16.8,-94.2,-0.1C-94,16.6,-89.9,33.2,-81.9,46.8C-73.9,60.4,-62,71,-47.2,77.8C-32.4,84.6,-16.2,87.6,-0.1,87.7C16,87.8,32,84.9,44.7,76.4Z"
            transform="translate(100 100)"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 100 100"
              to="360 100 100"
              dur="20s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-blue-500/30 rounded-full animate-bounce delay-500"></div>
      <div className="absolute top-2/3 right-1/3 w-3 h-3 bg-teal-500/30 rounded-full animate-bounce delay-1000"></div>
      <div className="absolute bottom-1/3 left-1/2 w-5 h-5 bg-purple-500/30 rounded-full animate-bounce delay-1500"></div>
    </div>
  );
};

export default AnimatedBackground;