"use client";
import React, { useState, useEffect } from 'react';

interface LazyComponentProps {
  children: React.ReactNode;
  delay?: number;
  fallback?: React.ReactNode;
}

const LazyComponent: React.FC<LazyComponentProps> = ({ 
  children, 
  delay = 100, 
  fallback = null 
}) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!shouldRender) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default LazyComponent; 