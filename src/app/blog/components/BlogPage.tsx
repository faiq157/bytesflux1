import React, { useState } from 'react';
import BlogList from './BlogList';
import AdminBlog from './AdminBlog';
import { Settings, Users, BarChart3, Sparkles, BookOpen, PenTool } from 'lucide-react';

const BlogPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'public' | 'admin'>('public');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Enhanced Tab Navigation */}
      <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center py-8 mb-4">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              BytesFlux Blog Platform
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Content Management & Discovery
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our blog content or manage posts through the admin panel
            </p>
          </div>

          {/* Enhanced Tab Navigation */}
          <div className="flex justify-center space-x-1 bg-gray-100/80 dark:bg-gray-700/80 rounded-2xl p-2 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab('public')}
              className={`relative flex items-center gap-3 py-4 px-8 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeTab === 'public'
                  ? 'text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 shadow-lg transform scale-105'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-700/50'
              }`}
            >
              <Users className={`h-5 w-5 transition-colors duration-300 ${
                activeTab === 'public' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
              }`} />
              <span>Public Blog</span>
              {activeTab === 'public' && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl"></div>
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('admin')}
              className={`relative flex items-center gap-3 py-4 px-8 rounded-xl font-semibold text-sm transition-all duration-300 ${
                activeTab === 'admin'
                  ? 'text-purple-600 dark:text-purple-400 bg-white dark:bg-gray-800 shadow-lg transform scale-105'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-700/50'
              }`}
            >
              <Settings className={`h-5 w-5 transition-colors duration-300 ${
                activeTab === 'admin' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'
              }`} />
              <span>Admin Panel</span>
              {activeTab === 'admin' && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-xl"></div>
              )}
            </button>
          </div>

          {/* Tab Indicators */}
          <div className="flex justify-center mt-4 mb-6">
            <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              {activeTab === 'public' ? (
                <>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    <span>Reading Mode</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-green-500" />
                    <span>Public Access</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <PenTool className="h-4 w-4 text-purple-500" />
                    <span>Content Creation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-orange-500" />
                    <span>Management Tools</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Content with Enhanced Transitions */}
      <div className="relative">
        {activeTab === 'public' ? (
          <div className="animate-fadeIn">
            <BlogList />
          </div>
        ) : (
          <div className="animate-fadeIn">
            <AdminBlog />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;