import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { BlogPagination } from '../types';

interface PaginationProps {
  pagination: BlogPagination;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({ pagination, onPageChange, className = '' }) => {
  const { currentPage, totalPages, hasNextPage, hasPrevPage } = pagination;

  if (totalPages <= 1) {
    return null;
  }

  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={`flex items-center justify-center space-x-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 ${className}`}>
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevPage}
        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
          hasPrevPage
            ? 'text-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 shadow-sm'
            : 'text-gray-400 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 cursor-not-allowed'
        }`}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {visiblePages.map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-gray-500">
                <MoreHorizontal className="h-4 w-4" />
              </span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  page === currentPage
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:from-blue-700 hover:to-purple-700'
                    : 'text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 shadow-sm'
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
          hasNextPage
            ? 'text-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 shadow-sm'
            : 'text-gray-400 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 cursor-not-allowed'
        }`}
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </button>
    </div>
  );
};

export default Pagination; 