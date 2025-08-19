
import React from 'react';
import { Filter, ChevronDown, Search } from 'lucide-react';

interface BlogFilterProps {
  categories: any[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  loading?: boolean;
}

export const BlogFilter: React.FC<BlogFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  searchTerm,
  onSearchChange,
  loading = false,
}) => {
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            disabled={loading}
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              disabled={loading}
              className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.name}
                  className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                >
                  {cat.name}
                </option>
              ))}
            </select>
            <ChevronDown className="h-4 w-4 text-gray-500 absolute right-3 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
