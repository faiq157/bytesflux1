
import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';

interface BlogFilterProps {
  categories: any[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const BlogFilter: React.FC<BlogFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <Filter className="h-5 w-5 text-gray-500" />
        <select
          value={selectedCategory}
          onChange={(e) => onSelectCategory(e.target.value)}
          className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 cursor-pointer"
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
  );
};
