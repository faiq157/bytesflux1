import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, TrendingUp, Sparkles, ArrowRight, Clock, Eye, MessageCircle } from 'lucide-react';
import BlogCard from './BlogCard';
import { usePosts } from '@/app/hooks/usePosts';
import { useCategories } from '@/app/hooks/useCategories';
import { BlogFilter } from './BlogFilter';
import { BlogPost as BlogPostType } from '../types';
import { generateBlogListSchema, generateOrganizationSchema } from '../../lib/seo';
import Pagination from './Pagination';

const BlogList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const { posts, loading: postsLoading, error: postsError, pagination, fetchPosts } = usePosts();
  const { categories, loading: categoriesLoading } = useCategories();

  // Generate SEO schema markup
  const blogListSchema = generateBlogListSchema();
  const organizationSchema = generateOrganizationSchema();

  // Fetch posts when page, search, or category changes
  useEffect(() => {
    fetchPosts(currentPage, 9, searchTerm, selectedCategory);
  }, [currentPage, searchTerm, selectedCategory]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when changing category
  };

  // Show loading state only on initial load
  if (postsLoading && posts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full border-2 border-blue-200 animate-pulse"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Loading Amazing Content</h3>
          <p className="text-gray-600 dark:text-gray-300">Preparing your reading experience...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (postsError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-red-900/20 dark:to-pink-900/20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-6xl mb-6">⚠️</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Oops! Something went wrong</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{postsError}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Ensure posts is always an array
  const safePosts = Array.isArray(posts) ? posts : [];

  return (
    <>
      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
            <div className="text-center">
              {/* Decorative Elements */}
              <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl"></div>
              <div className="absolute top-40 right-10 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-indigo-400/10 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Sparkles className="h-4 w-4" />
                  Latest Insights
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  Discover Amazing
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Content</span>
                </h1>
                
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Explore our collection of insightful articles, tutorials, and industry trends from our expert team of technology professionals.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {/* Filters Section */}
          <BlogFilter
            searchTerm={searchTerm}
            onSearchChange={handleSearch}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            categories={categories}
            loading={categoriesLoading}
          />

          {/* Results Section */}
          <div className="mt-16">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-sm opacity-30"></div>
                  <h2 className="relative text-3xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {searchTerm ? 'Search Results' : 'Latest Articles'}
                  </h2>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-sm"></div>
                  <span className="relative bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-semibold border border-blue-200/50 dark:border-blue-700/50">
                    {pagination?.totalPosts || 0} {pagination?.totalPosts === 1 ? 'post' : 'posts'}
                  </span>
                </div>
              </div>
              
              {searchTerm && (
                <button
                  onClick={() => handleSearch('')}
                  className="inline-flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  <span>Clear search</span>
                  <div className="w-1 h-1 bg-current rounded-full"></div>
                </button>
              )}
            </div>

            {/* Loading indicator for subsequent loads */}
            {postsLoading && posts.length > 0 && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-600 dark:text-gray-300 mt-2">Loading...</p>
              </div>
            )}

            {/* Posts Grid */}
            {!postsLoading && safePosts.length === 0 ? (
              <div className="text-center py-20">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl opacity-20 w-32 h-32 mx-auto"></div>
                  <div className="relative text-8xl mb-6">🔍</div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">No articles found</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto text-lg">
                  {searchTerm 
                    ? `No articles match "${searchTerm}". Try adjusting your search terms or browse all categories.`
                    : 'Try adjusting your filter criteria or browse all categories.'
                  }
                </p>
                <div className="flex flex-wrap gap-3 justify-center mb-8">
                  {categories.slice(0, 6).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.name)}
                      className="px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-lg"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/50">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Popular Categories:</h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {categories.slice(0, 4).map((cat) => (
                      <span key={cat.id} className="px-3 py-1 bg-white/80 dark:bg-gray-800/80 rounded-lg text-sm text-gray-600 dark:text-gray-300">
                        {cat.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {safePosts.map((post) => (
                    <BlogCard
                      key={post.id}
                      post={post}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                  <div className="mt-16">
                    <Pagination
                      pagination={pagination}
                      onPageChange={handlePageChange}
                      className="mb-8"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Load More Section - Only show if there are posts and no pagination */}
          {safePosts.length > 0 && pagination && !pagination.hasNextPage && (
            <div className="text-center pb-24">
              <div className="relative max-w-3xl mx-auto">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20 rounded-3xl blur-3xl"></div>
                
                {/* Main Container */}
                <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
                  {/* Decorative Elements */}
                  <div className="absolute top-6 left-6 w-3 h-3 bg-blue-400 rounded-full opacity-60"></div>
                  <div className="absolute top-8 right-8 w-2 h-2 bg-purple-400 rounded-full opacity-60"></div>
                  <div className="absolute bottom-8 left-8 w-2 h-2 bg-indigo-400 rounded-full opacity-60"></div>
                  <div className="absolute bottom-6 right-6 w-3 h-3 bg-blue-500 rounded-full opacity-60"></div>
                  
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                      <TrendingUp className="h-4 w-4" />
                      You've Reached the End
                    </div>
                    
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      Thanks for Exploring!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
                      You've reached the end of our current articles. Check back soon for more amazing content!
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <button 
                        onClick={() => handlePageChange(1)}
                        className="group/btn relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-3"
                      >
                        <span>Back to First Page</span>
                        <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </button>
                      
                      <button 
                        onClick={() => handleCategoryChange('All')}
                        className="px-6 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-2xl hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:shadow-lg"
                      >
                        Browse All Categories
                      </button>
                    </div>
                    
                    {/* Stats */}
                    <div className="mt-8 pt-8 border-t border-gray-200/50 dark:border-gray-600/50">
                      <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>{pagination.totalPosts}+ Articles</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>{categories.length}+ Categories</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                          <span>Expert Authors</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )}
          </div>
        </div>
      </>
    );
  }


export default BlogList;