import React, { useState } from 'react';
import { Search, Filter, Calendar, TrendingUp, Sparkles, ArrowRight, Clock, Eye, MessageCircle } from 'lucide-react';
import BlogCard from './BlogCard';
import BlogPost from './BlogPost';
import { usePosts } from '@/app/hooks/usePosts';
import { useCategories } from '@/app/hooks/useCategories';
import { BlogFilter } from './BlogFilter';
import { BlogPost as BlogPostType } from '../types';
import { generateBlogListSchema, generateOrganizationSchema } from '../../lib/seo';

const BlogList: React.FC = () => {
  const { posts, loading: postsLoading, error: postsError } = usePosts();
  const [selectedPost, setSelectedPost] = useState<BlogPostType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [sortBy, setSortBy] = useState('latest');
  const { categories, loading: categoriesLoading } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Generate SEO schema markup
  const blogListSchema = generateBlogListSchema();
  const organizationSchema = generateOrganizationSchema();

  console.log('Posts:', posts);
  console.log('Categories:', categories);
  console.log('Posts loading:', postsLoading);
  console.log('Posts error:', postsError);
  
  // Ensure posts is always an array
  const safePosts = Array.isArray(posts) ? posts : [];
  
  // Filter and sort posts
  const filteredPosts = safePosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Show loading state
  if (postsLoading) {
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

  // Show empty state when no posts
  if (!postsLoading && safePosts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-6xl mb-6">📝</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No Blog Posts Yet</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We're working hard to bring you amazing content. Check back soon for insightful articles, tutorials, and industry insights!
          </p>
          <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">What's Coming Soon:</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Technology insights and trends</li>
              <li>• Development tutorials and guides</li>
              <li>• Design principles and best practices</li>
              <li>• Industry analysis and case studies</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogListSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300">
      {/* Show individual blog post if selected */}
      {selectedPost ? (
        <div className="relative">
          {/* Back button */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <button
                onClick={() => setSelectedPost(null)}
                className="inline-flex items-center px-6 py-3 border border-gray-300/50 dark:border-gray-600/50 shadow-sm text-sm font-medium rounded-xl text-gray-700 dark:text-gray-300 bg-white/90 dark:bg-gray-800/90 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 backdrop-blur-sm"
              >
                ← Back to Blog
              </button>
            </div>
          </div>
          
          {/* Render the full blog post */}
          <BlogPost post={selectedPost} />
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <div className="relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-indigo-600/10"></div>
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              }}
            ></div>
            
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                    <Sparkles className="h-4 w-4" />
                    Latest Insights & Tutorials
                  </div>
                  <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                    BytesFlux{' '}
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      Blog
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    Discover cutting-edge insights, expert tutorials, and industry trends from our team of technology professionals.
                  </p>
                </div>

                {/* Search and Filters */}
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                      {/* Search */}
                      <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search articles, tutorials, insights..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700/50 dark:text-white transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                        />
                      </div>

                      {/* Category Filter */}
                      <div className="flex items-center gap-4">
                        <BlogFilter
                          categories={categories}
                          selectedCategory={selectedCategory}
                          onSelectCategory={setSelectedCategory}
                        />
                      </div>

                      {/* Sort */}
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-5 w-5 text-gray-500" />
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="px-4 py-3 border border-gray-300/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700/50 dark:text-white transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm cursor-pointer"
                        >
                          <option value="latest">Latest</option>
                          <option value="popular">Most Popular</option>
                          <option value="comments">Most Discussed</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
                    {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
                  </span>
                </div>
              </div>
              
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="inline-flex items-center gap-2 px-4 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  <span>Clear search</span>
                  <div className="w-1 h-1 bg-current rounded-full"></div>
                </button>
              )}
            </div>

            {filteredPosts.length === 0 ? (
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
                      onClick={() => setSelectedCategory(cat.name)}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredPosts.map((post) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    onClick={setSelectedPost}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Load More Section */}
          {filteredPosts.length > 0 && (
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
                      Discover More
                    </div>
                    
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      Want More Great Content?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
                      Explore our extensive collection of insights, tutorials, and industry trends from our expert team of technology professionals.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                      <button className="group/btn relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-3">
                        <span>Load More Articles</span>
                        <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </button>
                      
                      <button className="px-6 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-2xl hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:shadow-lg">
                        Browse Categories
                      </button>
                    </div>
                    
                    {/* Stats */}
                    <div className="mt-8 pt-8 border-t border-gray-200/50 dark:border-gray-600/50">
                      <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>100+ Articles</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span>15+ Categories</span>
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
        </>
      )}
    </div>
    </>
  );
};

export default BlogList;