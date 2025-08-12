'use client';

import React from 'react';
import { Eye } from 'lucide-react';
import { useViewTracking } from '../../hooks/useViewTracking';

interface RealTimeViewCounterProps {
  postId: string;
  initialViews?: number;
  showIcon?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const RealTimeViewCounter: React.FC<RealTimeViewCounterProps> = ({
  postId,
  initialViews = 0,
  showIcon = true,
  className = '',
  size = 'md'
}) => {
  const { views, isLoading } = useViewTracking({
    postId,
    initialViews
  });

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showIcon && (
        <Eye className={`${iconSizes[size]} text-blue-600 dark:text-blue-400`} />
      )}
      <span 
        className={`font-medium text-blue-700 dark:text-blue-300 transition-all duration-300 ${
          isLoading ? 'opacity-50' : 'opacity-100'
        } ${sizeClasses[size]}`}
      >
        {isLoading ? '...' : views.toLocaleString()}
      </span>
    </div>
  );
};

export default RealTimeViewCounter; 